# NeuroChess (ChessOdyssey)

## Overview

**NeuroChess** is an AI-powered chess analysis platform built with React, TypeScript, and Vite. The project combines symbolic chess logic with conversational AI features to make chess analysis more interactive, beginner-friendly, and engaging.

The application provides:

* Real-time chess move analysis
* Dynamic move recommendations
* AI-generated explanations
* Historical match exploration
* Story-based chess learning
* Interactive visual overlays and heatmaps
* Socratic-style chess coaching

---
Live: https://neuro-chess-nine.vercel.app/
## Features

### ♟️ Interactive Chess Engine

* Built using `chess.js`
* Supports legal move validation
* Dynamic game state management
* Check/checkmate detection
* Heuristic move evaluation

### 🧠 AI-Powered Analysis

* Explains moves in natural language
* Generates strategic insights
* Beginner-friendly explanations
* Pragmatic vs aggressive move suggestions

### 📊 Dashboard Experience

* Visual chess board overlays
* Heatmap-based move visualization
* Piece activity indicators
* Evaluation and strategy cards

### 📚 Learning Tools

* Beginner guide mode
* Story mode for engaging learning
* Historical match analysis
* Socratic chat assistant

### 🎨 Modern Frontend Stack

* React 19
* TypeScript
* TailwindCSS
* Vite
* Lucide Icons

---

## Tech Stack

| Technology   | Purpose            |
| ------------ | ------------------ |
| React        | Frontend UI        |
| TypeScript   | Type Safety        |
| Vite         | Build Tool         |
| TailwindCSS  | Styling            |
| chess.js     | Chess Logic Engine |
| React Router | Routing            |
| Lucide React | Icons              |

---

## Project Structure

```bash
NeuroChess/
│
├── components/
│   ├── BeginnerGuide.tsx
│   ├── ChessBoardInput.tsx
│   ├── ChessBoardOverlay.tsx
│   ├── Dashboard.tsx
│   ├── HistoricalMatch.tsx
│   ├── MiniBoard.tsx
│   ├── MoveCard.tsx
│   ├── SocraticChat.tsx
│   ├── StoryMode.tsx
│   └── VibeMeter.tsx
│
├── services/
│   ├── geminiService.ts
│   └── grokService.ts
│
├── App.tsx
├── index.tsx
├── types.ts
├── vite.config.ts
└── package.json
```

---

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd NeuroChess
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Core Components

### Dashboard

Main application controller containing:

* Game state
* Analysis flow
* AI interaction
* Move generation
* Dynamic evaluation engine

### ChessBoardOverlay

Provides:

* Board visualization
* Heatmaps
* Piece overlays
* Tactical highlighting

### SocraticChat

Interactive AI assistant for:

* Chess questions
* Strategic guidance
* Move explanations

### HistoricalMatch

Allows users to:

* Explore famous matches
* Learn historical strategies
* Analyze move sequences

---

## AI Services

The project includes AI service integrations:

* `grokService.ts`

These services are used for:

* Conversational explanations
* Strategic analysis
* Dynamic storytelling
* Educational feedback

---

## Future Improvements

Potential enhancements:

* Stockfish integration
* Multiplayer mode
* User authentication
* Cloud save system
* Puzzle training
* Opening explorer
* Elo rating system
* Mobile optimization

---

## License

This project is for educational and development purposes.

---

Developed as an experimental AI-enhanced chess analysis platform using modern frontend technologies.

