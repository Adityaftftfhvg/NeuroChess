import { AnalysisResult, VibeLevel, HistoricalGame } from "../types";

const GROK_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROK_MODEL = "llama-3.2-90b-vision-preview";
const GROK_TEXT_MODEL = "openai/gpt-oss-120b";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.API_KEY}`,
});

const SOCRATIC_SYSTEM_INSTRUCTION = `
You are "Caissa's Shadow", a wise, slightly cryptic, but deeply supportive Grandmaster ghost. 
You hate rote memorization. You love 'flow' and 'intuition'.
When a user suggests a move, ask *why*. If they are wrong, guide them to the answer using board geometry, tension, and pawn structures, NOT engine evaluations (e.g., never say "+1.5").
Speak in metaphors of war, art, physics, and psychology.
Be concise but impactful.
`;

async function callGrok(
  model: string,
  messages: { role: string; content: string | object[] }[],
  jsonMode = false
): Promise<string> {
  const body: Record<string, unknown> = {
    model,
    messages,
    max_tokens: 2048,
  };

  if (jsonMode) {
    body.response_format = { type: "json_object" };
  }

  const res = await fetch(GROK_API_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Grok API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

export const grokService = {

  analyzeBoardImage: async (base64Image: string): Promise<AnalysisResult> => {
    const systemPrompt = `You are a top-tier Grandmaster analyst.
IMPORTANT: In the image, Black pieces may appear grey, metallic, or silver due to 3D lighting. You must classify these grey/silver pieces as BLACK, not white.
You must respond ONLY with a valid JSON object — no markdown fences, no extra text.

Return exactly this structure:
{
  "fen": "<FEN string>",
  "turn": "<w or b>",
  "openingName": "<opening name>",
  "vibeScore": <0-100>,
  "vibeLabel": "<Panic|Tension|Flow|Domination>",
  "efficiency": <0-100>,
  "roi": <0-100>,
  "pragmatism": { "san": "<move>", "translation": "<text>", "rationale": "<text>" },
  "artistry": { "san": "<move>", "translation": "<text>", "rationale": "<text>" },
  "performanceState": { "tunnelVision": <0-100>, "fear": <0-100>, "aggression": <0-100> },
  "strategy": { "theme": "<text>", "concept": "<text>", "ruleOfThumb": "<text>" },
  "summary": "<one sentence>"
}`;

    const userContent = [
      {
        type: "image_url",
        image_url: { url: `data:image/jpeg;base64,${base64Image}` },
      },
      {
        type: "text",
        text: "Analyze this chess position. Extract FEN. Identify the Opening Name (e.g. Ruy Lopez, King's Indian). Identify the Pragmatic move (safe) and the Artist move (bold). Provide translations and philosophical rationales.",
      },
    ];

    try {
      const rawText = await callGrok(
        GROK_MODEL,
        [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ]
      );

      const cleaned = rawText.replace(/```json|```/g, "").trim();
      const data = JSON.parse(cleaned);

      let vibeLabel = VibeLevel.Tension;
      if (data.vibeLabel === "Panic") vibeLabel = VibeLevel.Panic;
      if (data.vibeLabel === "Flow") vibeLabel = VibeLevel.Flow;
      if (data.vibeLabel === "Domination") vibeLabel = VibeLevel.Domination;

      return {
        fen: data.fen,
        turn: data.turn || "w",
        openingName: data.openingName || "Unknown Structure",
        vibeScore: data.vibeScore,
        vibeLabel,
        metrics: {
          efficiency: data.efficiency,
          roi: data.roi,
          pragmatism: data.pragmatism,
          artistry: data.artistry,
        },
        performanceState: {
          tunnelVision: data.performanceState?.tunnelVision ?? 20,
          fear: data.performanceState?.fear ?? 20,
          aggression: data.performanceState?.aggression ?? 50,
        },
        strategy: {
          theme: data.strategy?.theme || "Tactical Opportunity",
          concept: data.strategy?.concept || "Look for hanging pieces.",
          ruleOfThumb: data.strategy?.ruleOfThumb || "Checks, captures, and threats.",
        },
        summary: data.summary,
      };
    } catch (error) {
      console.error("Analysis failed:", error);
      throw error;
    }
  },

  generateMetaphor: async (fen: string): Promise<string> => {
    try {
      const text = await callGrok(GROK_TEXT_MODEL, [
        {
          role: "user",
          content: `Analyze this chess position (FEN: ${fen}). 
Create a vivid "Visual Metaphor" that encapsulates the strategy (e.g., "A Battering Ram breaking the Gate", "A Spider spinning a web", "A Sniper in a bell tower"). 
Return ONLY the metaphor phrase, nothing else.`,
        },
      ]);
      return text.trim() || "A Storm hitting a Fortress";
    } catch {
      return "A Clash of Titans";
    }
  },

  findHistoricalMatch: async (openingName: string): Promise<HistoricalGame | null> => {
    try {
      const text = await callGrok(
        GROK_TEXT_MODEL,
        [
          {
            role: "user",
            content: `Find a famous historical chess game that features the "${openingName}" or a very similar structure.
Identify the Players, the Year, and a brief 1-sentence description of why it is famous (e.g. a specific sacrifice or maneuver).
Return ONLY a valid JSON object with keys: players, year, opening, description. No markdown fences.`,
          },
        ],
        true
      );

      const cleaned = text.replace(/```json|```/g, "").trim();
      const data = JSON.parse(cleaned);

      return {
        players: data.players || "Unknown Grandmasters",
        year: data.year || "20th Century",
        opening: data.opening || openingName,
        description: data.description || "A classic struggle in this line.",
        sourceUrl: undefined,
        sourceTitle: undefined,
      };
    } catch (error) {
      console.error("Historical search failed:", error);
      return null;
    }
  },

  sendChatMessage: async (
    history: { role: string; parts: { text: string }[] }[],
    fen: string,
    userMessage: string
  ): Promise<string> => {
    try {
      const contextMessage = `[Current Board FEN: ${fen}] User says: ${userMessage}`;

      const messages: { role: string; content: string }[] = [
        { role: "system", content: SOCRATIC_SYSTEM_INSTRUCTION },
        ...history.map((h) => ({
          role: h.role === "model" ? "assistant" : h.role,
          content: h.parts.map((p) => p.text).join(""),
        })),
        { role: "user", content: contextMessage },
      ];

      const text = await callGrok(GROK_TEXT_MODEL, messages);
      return text || "...";
    } catch (error) {
      console.error(error);
      return "Live AI disabled due to API limits. Demo mode enabled.";
    }
  },

  getGameStateEvaluation: async (fen: string): Promise<string> => {
    try {
      const text = await callGrok(GROK_TEXT_MODEL, [
        {
          role: "system",
          content: "You are a concise, high-level chess coach. Be direct.",
        },
        {
          role: "user",
          content: `Analyze this final chess position (FEN: ${fen}). 
Provide a 2-sentence professional Grandmaster verdict. 
1. Who is winning (White, Black, or Draw)? 
2. What is the critical reason (Material, Space, King Safety)?
Speak directly to the player.`,
        },
      ]);
      return text || "The position is complex and requires further study.";
    } catch {
      return "Unable to retrieve final evaluation.";
    }
  },

};
