# 🎒 Pocket Classroom – Offline Learning Capsules

> **A lightweight, offline-first SPA for creating, studying, and sharing mini learning capsules — all in your browser.**

---

## 🌟 Overview

**Pocket Classroom** is a fully client-side, single-page web application built with **vanilla JavaScript**, **Bootstrap**, and **LocalStorage**. It empowers students and educators to:

- ✍️ **Author** structured learning capsules (notes, flashcards, quizzes)  
- 📚 **Study** them in a distraction-free Learn Mode with progress tracking  
- 🔄 **Export/Import** capsules as JSON for peer-to-peer sharing  
- 🌙 **Work offline** — no internet or backend required  

Designed with a **dark-first UI**, responsive layout, and accessibility in mind, Pocket Classroom delivers a polished, product-grade experience — all in under 100KB of frontend code.

---

## 🚀 Features

### 📦 Library (Home)
- Grid of saved capsules with **title, subject, level, last updated**
- Visual progress indicators: **Quiz Best Score** (progress bar) + **Known Flashcards**
- Actions per capsule: **Learn • Edit • Export • Delete**

### 🛠️ Author Mode
- **Meta form**: Title (required), Subject, Level (`Beginner`/`Intermediate`/`Advanced`), Description  
- **Notes editor**: Multi-line text (one note per line)  
- **Flashcards editor**: Dynamic front/back pairs with add/remove  
- **Quiz editor**: 4-choice questions with correct answer index (`0–3`)  
- **Auto-save** + **validation**: Title required; at least one content type must exist

### 🧠 Learn Mode
- **Three tabs** for focused study:
  - **Notes**: Clean list with in-page search  
  - **Flashcards**: Flip animation, Prev/Next, **Known/Unknown** tracking  
  - **Quiz**: Sequential questions, instant feedback, score calculation  
- **Progress persistence**: Best quiz score & known flashcards saved per capsule

### 📤 Export / Import
- **Export**: Download as `your-title.json` with schema `pocket-classroom/v1`  
- **Import**: Validate schema, title, and content before saving  
- **Peer sharing**: Share JSON files directly — no accounts needed!

### 🎨 UX & Polish
- **Light/Dark theme toggle** (persists in LocalStorage)  
- **Fully responsive**: Works on mobile, tablet, and desktop  
- **Empty states** with friendly guidance  
- **Keyboard shortcuts**:  
  - `Space` → Flip flashcard  
  - `[` / `]` → Cycle between Notes ↔ Flashcards ↔ Quiz  
- **Accessible**: Semantic HTML, ARIA labels, alt text

---

## 🛠️ Tech Stack

| Layer        | Technology                     |
|--------------|--------------------------------|
| **Core**     | HTML5, CSS3, Vanilla JavaScript (ES6 Modules) |
| **Styling**  | Bootstrap 5 (CDN) + Custom CSS |
| **Icons**    | Bootstrap Icons                |
| **Storage**  | `localStorage` (no backend)    |
| **Build**    | Zero dependencies — runs on Live Server |

> ✅ **No frameworks** • ✅ **No backend** • ✅ **100% offline capable**

---

## 📁 Project Structure

```
pocket-classroom/
├── index.html                 # Single-page app shell
├── style.css                  # Custom styles + theme
├── images/
│   ├── logo.png               # App logo
│   └── hero.png               # Hero illustration
├── js/
│   ├── main.js                # SPA section toggling
│   ├── storage.js             # LocalStorage helpers
│   ├── library.js             # Library view + actions
│   ├── author.js              # Authoring forms + validation
│   └── learn.js               # Learn Mode (Notes/Flashcards/Quiz)
└── my-first-capsule.json      # Sample exported capsule
```

---

## 🚦 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/FatemaAhm4di/pocket-classroom.git
   cd pocket-classroom
   ```

2. **Start learning!**  
   - Create your first capsule in **Author Mode**  
   - Study it in **Learn Mode**  
   - Export as JSON and share with peers!

---

## 📤 Exported Sample

Included: [`my-first-capsule.json`](simple-capsule.json)  
Schema: `pocket-classroom/v1`

```json
{
  "schema": "pocket-classroom/v1",
  "meta": {
    "title": "JavaScript Basics",
    "subject": "Computer Science",
    "level": "Beginner",
    "description": "Core concepts of JavaScript.",
    "updatedAt": "2025-10-19T10:00:00.000Z"
  },
  "notes": ["Variables store data values."],
  "flashcards": [
    {
      "front": "What is a variable?",
      "back": "A container for storing data values."
    }
  ],
  "quiz": [
    {
      "question": "Which keyword declares a variable?",
      "choices": ["var", "let", "const", "All of the above"],
      "correct": 3
    }
  ]
}
```

## 📜 DEVELOPER
Fatema Ahmadi
