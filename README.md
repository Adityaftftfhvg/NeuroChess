# ♟️ Chess AI Web App

An interactive chess-playing web application powered by an intelligent AI engine. Play against the computer in real-time with a smooth UI, legal move validation, and strategic decision-making.

---
Live : https://neuro-chess-nine.vercel.app/
## 🚀 Features

* ♟️ **Interactive Chessboard**

  * Drag-and-drop piece movement
  * Highlights valid moves
  * Real-time board updates

* 🧠 **AI Opponent**

  * Minimax algorithm with Alpha-Beta pruning
  * Adjustable difficulty levels
  * Smart evaluation function

* 📜 **Game Rules Enforcement**

  * Legal moves validation
  * Check, Checkmate, Stalemate detection
  * Castling, En passant, Pawn promotion

* 🎯 **User Experience**

  * Responsive UI (mobile + desktop)
  * Smooth animations
  * Restart / Undo functionality

---

## 🛠️ Tech Stack

**Frontend:**

* React.js (with Vite)
* Tailwind CSS / CSS Modules

**Backend (optional):**

* Node.js + Express

**AI Logic:**

* Minimax Algorithm
* Alpha-Beta Pruning
* Heuristic Evaluation Function

---

## 📂 Project Structure

```
chess-ai/
│
├── client/               # Frontend (React)
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── App.jsx
│
├── server/               # Backend (if used)
│   ├── routes/
│   └── index.js
│
├── ai/
│   ├── minimax.js
│   ├── evaluation.js
│   └── moveGenerator.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/chess-ai.git
cd chess-ai
```

### 2️⃣ Install dependencies

```bash
cd client
npm install
```

### 3️⃣ Run the app

```bash
npm run dev
```

---

## 🧠 How the AI Works

The AI uses the **Minimax algorithm** to simulate future moves and choose the optimal one.

### Key Concepts:

* **Minimax:** Maximizes AI score while minimizing opponent's score
* **Alpha-Beta Pruning:** Cuts unnecessary branches → faster decisions
* **Evaluation Function:**

  * Piece values (Pawn = 1, Knight = 3, etc.)
  * Board control
  * King safety

---

## 📸 Screenshots

*Add screenshots here*

---

## 🌟 Future Improvements

* ♞ Add multiplayer mode (WebSockets)
* 🤖 Improve AI using Machine Learning
* 📊 Add game analytics & move suggestions
* ⏱️ Add timers (Blitz, Rapid modes)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Commit your changes
4. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author


* GitHub: https://github.com/kaisen354


---

⭐ If you like this project, give it a star!
