//learn.js
import { getCapsule, getProgress, saveProgress } from './storage.js';

let currentCapsule = null;
let currentFlashcardIndex = 0;
let currentQuizIndex = 0;
let quizScore = 0;

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '<')
    .replace(/>/g, '>');
}

// Render Notes with search
function renderNotes() {
  const notes = currentCapsule.notes || [];
  const container = document.getElementById('notes-list');
  const searchInput = document.getElementById('notes-search');

  function updateNotes() {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = notes.filter(note => note.toLowerCase().includes(query));
    container.innerHTML = filtered.length
      ? `<ol class="text-light">${filtered.map(n => `<li>${escapeHtml(n)}</li>`).join('')}</ol>`
      : '<p class="text-muted">No matching notes.</p>';
  }

  searchInput.addEventListener('input', updateNotes);
  updateNotes();
}

// Render Flashcards with controls
function renderFlashcards() {
  const flashcards = currentCapsule.flashcards || [];
  const container = document.getElementById('flashcards-tab-content');
  const progress = getProgress(currentCapsule.id);
  const knownSet = new Set(progress.knownFlashcards || []);

  if (flashcards.length === 0) {
    container.innerHTML = '<p class="text-muted">No flashcards available.</p>';
    return;
  }

  currentFlashcardIndex = Math.max(0, Math.min(currentFlashcardIndex, flashcards.length - 1));
  const fc = flashcards[currentFlashcardIndex];
  const isKnown = knownSet.has(currentFlashcardIndex);

  container.innerHTML = `
    <div class="text-center py-4">
      <div class="flashcard-container" style="perspective: 1000px; max-width: 500px; margin: 0 auto;">
        <div class="flashcard-inner" style="position: relative; width: 100%; height: 200px; transform-style: preserve-3d; transition: transform 0.5s;">
          <div class="flashcard-front" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 8px;">
            <div class="card bg-secondary text-light h-100 d-flex align-items-center justify-content-center">
              <p class="mb-0 px-3">${escapeHtml(fc.front)}</p>
            </div>
          </div>
          <div class="flashcard-back" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 8px; transform: rotateY(180deg);">
            <div class="card bg-primary text-light h-100 d-flex align-items-center justify-content-center">
              <p class="mb-0 px-3">${escapeHtml(fc.back)}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3 text-muted">
        Card ${currentFlashcardIndex + 1} of ${flashcards.length}
        ${isKnown ? ' • <span class="text-success">✓ Known</span>' : ''}
      </div>
    </div>
    <div class="d-flex justify-content-center gap-2 mt-3">
      <button class="btn btn-outline-light btn-sm" id="flashcard-prev" ${currentFlashcardIndex === 0 ? 'disabled' : ''}>Prev</button>
      <button class="btn btn-warning btn-sm" id="flashcard-unknown">Unknown</button>
      <button class="btn btn-success btn-sm" id="flashcard-known">${isKnown ? '✓ Known' : 'Known'}</button>
      <button class="btn btn-outline-light btn-sm" id="flashcard-next" ${currentFlashcardIndex === flashcards.length - 1 ? 'disabled' : ''}>Next</button>
    </div>
  `;

  container.querySelector('.flashcard-inner').addEventListener('click', () => {
    const inner = container.querySelector('.flashcard-inner');
    const isFlipped = inner.style.transform.includes('180');
    inner.style.transform = isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)';
  });

  // Button handlers
  document.getElementById('flashcard-prev')?.addEventListener('click', () => {
    currentFlashcardIndex--;
    renderFlashcards();
  });

  document.getElementById('flashcard-next')?.addEventListener('click', () => {
    currentFlashcardIndex++;
    renderFlashcards();
  });

  document.getElementById('flashcard-known')?.addEventListener('click', () => {
    const progress = getProgress(currentCapsule.id);
    const knownSet = new Set(progress.knownFlashcards || []);
    knownSet.add(currentFlashcardIndex);
    saveProgress(currentCapsule.id, { ...progress, knownFlashcards: Array.from(knownSet) });
    renderFlashcards();
  });

  document.getElementById('flashcard-unknown')?.addEventListener('click', () => {
    const progress = getProgress(currentCapsule.id);
    const knownSet = new Set(progress.knownFlashcards || []);
    knownSet.delete(currentFlashcardIndex);
    saveProgress(currentCapsule.id, { ...progress, knownFlashcards: Array.from(knownSet) });
    renderFlashcards();
  });
}

// Render Quiz
function renderQuiz() {
  const quiz = currentCapsule.quiz || [];
  const container = document.getElementById('quiz-tab-content');

  if (quiz.length === 0) {
    container.innerHTML = '<p class="text-muted">No quiz available.</p>';
    return;
  }

  container.innerHTML = `
    <div class="text-center py-4">
      <button class="btn btn-primary" id="start-quiz-btn">Start Quiz</button>
    </div>
  `;

  document.getElementById('start-quiz-btn').addEventListener('click', () => {
    currentQuizIndex = 0;
    quizScore = 0;
    showQuizQuestion();
  });
}

// Show quiz question
function showQuizQuestion() {
  const quiz = currentCapsule.quiz;
  if (currentQuizIndex >= quiz.length) {
    finishQuiz();
    return;
  }


const q = quiz[currentQuizIndex];
const container = document.getElementById('quiz-tab-content');
container.innerHTML = `
  <div class="bg-secondary p-4 rounded" style="max-width: 600px; margin: 0 auto;">
    <h5 class="mb-4">Question ${currentQuizIndex + 1} of ${quiz.length}</h5>
    <p class="mb-4">${escapeHtml(q.question)}</p>
    <div id="quiz-choices" class="d-grid gap-2">
      ${q.choices.map((choice, i) => 
        `<button class="btn btn-outline-light text-start w-100" data-choice="${i}">
          ${String.fromCharCode(65 + i)}. ${escapeHtml(choice)}
        </button>`
      ).join('')}
    </div>
  </div>
`;

  document.getElementById('quiz-choices').addEventListener('click', (e) => {
    if (e.target.matches('[data-choice]')) {
      const selected = parseInt(e.target.dataset.choice);
      const isCorrect = selected === q.correct;

      e.target.classList.add(isCorrect ? 'btn-success' : 'btn-danger');
      if (!isCorrect) {
        document.querySelector(`[data-choice="${q.correct}"]`).classList.add('btn-success');
      }

      if (isCorrect) quizScore++;

      setTimeout(() => {
        currentQuizIndex++;
        showQuizQuestion();
      }, 1500);
    }
  });
}

// Finish quiz
function finishQuiz() {
  const quiz = currentCapsule.quiz;
  const percent = Math.round((quizScore / quiz.length) * 100);
  const progress = getProgress(currentCapsule.id);
  const newBest = Math.max(progress.bestScore || 0, percent);

  saveProgress(currentCapsule.id, { ...progress, bestScore: newBest });

  const container = document.getElementById('quiz-tab-content');
  container.innerHTML = `
    <div class="text-center py-4">
      <h4>Quiz Complete!</h4>
      <p>Your score: <strong>${percent}%</strong></p>
      <p>Best score: <strong>${newBest}%</strong></p>
      <button class="btn btn-primary mt-3" id="restart-quiz">Restart Quiz</button>
    </div>
  `;

  document.getElementById('restart-quiz').addEventListener('click', () => {
    renderQuiz();
  });
}

// Main render
export function renderLearnMode() {
  const capsuleId = localStorage.getItem('learningCapsuleId');
  const capsule = capsuleId ? getCapsule(capsuleId) : null;

  const container = document.getElementById('learn-content');
  if (!container) return;

  if (!capsule) {
    container.innerHTML = `
      <div class="text-center py-5">
        <h3>Select a Capsule to Learn</h3>
        <p class="text-muted">Go to Library and click "Learn" on any capsule.</p>
      </div>
    `;
    return;
  }

  currentCapsule = capsule;
  currentFlashcardIndex = 0;

  container.innerHTML = `
    <div class="bg-secondary p-4 rounded mb-4">
      <h2 class="h4 mb-1">${escapeHtml(capsule.meta.title)}</h2>
      <p class="text-light mb-0">${escapeHtml(capsule.meta.subject)} • ${capsule.meta.level}</p>
    </div>
    
    <ul class="nav nav-tabs mb-4" id="learn-tabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#notes">Notes</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#flashcards">Flashcards</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#quiz">Quiz</button>
      </li>
    </ul>
    
    <div class="tab-content">
      <div class="tab-pane fade show active" id="notes">
        <div class="mb-3">
          <input type="text" class="form-control form-control-sm" id="notes-search" placeholder="Search notes...">
        </div>
        <div id="notes-list"></div>
      </div>
      <div class="tab-pane fade" id="flashcards">
        <div id="flashcards-tab-content"></div>
      </div>
      <div class="tab-pane fade" id="quiz">
        <div id="quiz-tab-content"></div>
      </div>
    </div>
  `;

  renderNotes();
  renderFlashcards();
  renderQuiz();
}

// Initialize
document.addEventListener('DOMContentLoaded', renderLearnMode);
window.addEventListener('app:navigate', (e) => {
  if (e.detail?.to === 'learn') {
    setTimeout(renderLearnMode, 50);
  }
});