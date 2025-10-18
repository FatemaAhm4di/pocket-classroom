//author.js


document.addEventListener('DOMContentLoaded', () => {
  const editingId = localStorage.getItem('editingCapsuleId');
  if (editingId) {
    const capsule = getCapsule(editingId);
    if (capsule) {
      renderAuthorForm(capsule);
      return;
    }
  }

  renderAuthorForm();
});
import { generateId, getCapsule, saveCapsule, saveCapsuleIndex, getCapsuleIndex } from './storage.js';

let currentCapsule = null;

export function renderAuthorForm(capsule = null) {
  currentCapsule = capsule;
  const container = document.getElementById('author-forms');
  if (!container) return;

  container.innerHTML = `
    <form id="author-form" class=" shadow-lg p-4 rounded">
      <!-- Meta Form -->
      <div class="row mb-4">
        <div class="col-md-6 mb-3">
          <label for="meta-title" class="form-label">Title *</label>
          <input type="text" class="form-control" id="meta-title" value="${capsule?.meta?.title || ''}" required>
        </div>
        <div class="col-md-6 mb-3">
          <label for="meta-subject" class="form-label">Subject</label>
          <input type="text" class="form-control" id="meta-subject" value="${capsule?.meta?.subject || ''}">
        </div>
        <div class="col-md-6 mb-3">
          <label for="meta-level" class="form-label">Level</label>
          <select class="form-select" id="meta-level">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate" ${capsule?.meta?.level === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
            <option value="Advanced" ${capsule?.meta?.level === 'Advanced' ? 'selected' : ''}>Advanced</option>
          </select>
        </div>
        <div class="col-12 mb-3">
          <label for="meta-description" class="form-label">Description</label>
          <textarea class="form-control" id="meta-description" rows="2">${capsule?.meta?.description || ''}</textarea>
        </div>
      </div>

      <!-- Notes -->
      <div class="mb-4">
        <h5 class="mb-3">Notes</h5>
        <textarea class="form-control " id="notes-editor" rows="4" placeholder="One note per line...">${(capsule?.notes || []).join('\n')}</textarea>
      </div>

      <!-- Flashcards -->
      <div class="mb-4 ">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5>Flashcards</h5>
          <button type="button" class="btn btn-sm btn-outline-light" id="add-flashcard">+ Add</button>
        </div>
        <div id="flashcards-container">
          ${(capsule?.flashcards?.length > 0 ? capsule.flashcards : [{ front: '', back: '' }]).map((fc) => `
            <div class="row mb-2 flashcard-row">
              <div class="col-md-5"><input type="text" class="form-control " placeholder="Front (question)" value="${fc.front}"></div>
              <div class="col-md-5"><input type="text" class="form-control" placeholder="Back (answer)" value="${fc.back}"></div>
              <div class="col-md-2 d-flex align-items-center">
                <button type="button" class="btn btn-sm btn-outline-danger remove-flashcard">Remove</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Quiz -->
      <div class="mb-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5>Quiz</h5>
          <button type="button" class="btn btn-sm btn-outline-light" id="add-quiz">+ Add Question</button>
        </div>
        <div id="quiz-container">
          ${(capsule?.quiz || []).map((q) => `
            <div class="card bg-secondary mb-3 quiz-row">
              <div class="card-body">
                <input type="text" class="form-control mb-2" placeholder="Question" value="${q.question}">
                <div class="row mb-2">
                  ${[0, 1, 2, 3].map(i => `
                    <div class="col-md-6 mb-2">
                      <input type="text" class="form-control" placeholder="Choice ${String.fromCharCode(65 + i)}" value="${q.choices[i] || ''}">
                    </div>
                  `).join('')}
                </div>
                <div class="mb-2">
                  <label class="form-label">Correct Answer</label>
                  <select class="form-select">
                    <option value="0" ${q.correct === 0 ? 'selected' : ''}>A</option>
                    <option value="1" ${q.correct === 1 ? 'selected' : ''}>B</option>
                    <option value="2" ${q.correct === 2 ? 'selected' : ''}>C</option>
                    <option value="3" ${q.correct === 3 ? 'selected' : ''}>D</option>
                  </select>
                </div>
                <button type="button" class="btn btn-sm btn-outline-danger remove-quiz">Remove Question</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Actions -->
      <div class="d-flex gap-2">
        <button type="submit" class="btn btn-primary">Save Capsule</button>
        <button type="button" class="btn btn-outline-light" id="cancel-author">Cancel</button>
      </div>
    </form>
  `;

  setupEventListeners();
}

function setupEventListeners() {
  // Add Flashcard
  document.getElementById('add-flashcard')?.addEventListener('click', () => {
    document.getElementById('flashcards-container').insertAdjacentHTML('beforeend', `
      <div class="row mb-2 flashcard-row">
        <div class="col-md-5"><input type="text" class="form-control" placeholder="Front (question)"></div>
        <div class="col-md-5"><input type="text" class="form-control" placeholder="Back (answer)"></div>
        <div class="col-md-2 d-flex align-items-center">
          <button type="button" class="btn btn-sm btn-outline-danger remove-flashcard">Remove</button>
        </div>
      </div>
    `);
  });

  // Add Quiz
  document.getElementById('add-quiz')?.addEventListener('click', () => {
    document.getElementById('quiz-container').insertAdjacentHTML('beforeend', `
      <div class="card bg-secondary mb-3 quiz-row">
        <div class="card-body">
          <input type="text" class="form-control mb-2" placeholder="Question">
          <div class="row mb-2">
            <div class="col-md-6 mb-2"><input type="text" class="form-control" placeholder="Choice A"></div>
            <div class="col-md-6 mb-2"><input type="text" class="form-control" placeholder="Choice B"></div>
            <div class="col-md-6 mb-2"><input type="text" class="form-control" placeholder="Choice C"></div>
            <div class="col-md-6 mb-2"><input type="text" class="form-control" placeholder="Choice D"></div>
          </div>
          <div class="mb-2">
            <label class="form-label">Correct Answer</label>
            <select class="form-select">
              <option value="0">A</option>
              <option value="1">B</option>
              <option value="2">C</option>
              <option value="3">D</option>
            </select>
          </div>
          <button type="button" class="btn btn-sm btn-outline-danger remove-quiz">Remove Question</button>
        </div>
      </div>
    `);
  });

  // Remove rows 
  document.getElementById('author-forms').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-flashcard')) {
      e.target.closest('.flashcard-row')?.remove();
    }
    if (e.target.classList.contains('remove-quiz')) {
      e.target.closest('.quiz-row')?.remove();
    }
  });

  // Cancel
  document.getElementById('cancel-author')?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { to: 'library' } }));
  });

  // Save
  document.getElementById('author-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    saveCapsuleFromForm();
  });
}

//  ذخیره کپسول 
function saveCapsuleFromForm() {
  const title = document.getElementById('meta-title').value.trim();
  if (!title) {
    alert('Title is required!');
    return;
  }

  const meta = {
    title,
    subject: document.getElementById('meta-subject').value.trim(),
    level: document.getElementById('meta-level').value,
    description: document.getElementById('meta-description').value.trim(),
    updatedAt: new Date().toISOString()
  };

  const notes = document.getElementById('notes-editor').value
    .split('\n')
    .map(line => line.trim())
    .filter(line => line);

  const flashcards = Array.from(document.querySelectorAll('.flashcard-row'))
    .map(row => {
      const inputs = row.querySelectorAll('input');
      return { front: inputs[0]?.value.trim(), back: inputs[1]?.value.trim() };
    })
    .filter(fc => fc.front || fc.back);

  const quiz = Array.from(document.querySelectorAll('.quiz-row'))
    .map(row => {
      const question = row.querySelector('input[placeholder="Question"]')?.value.trim();
      if (!question) return null;

      const choices = Array.from(row.querySelectorAll('input[placeholder^="Choice"]'))
        .map(input => input.value.trim());
      if (choices.length !== 4) return null;

      const correct = parseInt(row.querySelector('select').value);
      return { question, choices, correct };
    })
    .filter(q => q !== null);

  if (notes.length === 0 && flashcards.length === 0 && quiz.length === 0) {
    alert('At least one of Notes, Flashcards, or Quiz must be filled!');
    return;
  }

  const capsule = {
    id: currentCapsule?.id || generateId(),
    schema: "pocket-classroom/v1",
    meta,
    notes,
    flashcards,
    quiz
  };

  saveCapsule(capsule);

  let index = getCapsuleIndex();
  const existingIndex = index.findIndex(item => item.id === capsule.id);
  const indexItem = {
    id: capsule.id,
    title: meta.title,
    subject: meta.subject,
    level: meta.level,
    updatedAt: meta.updatedAt
  };
  if (existingIndex >= 0) {
    index[existingIndex] = indexItem;
  } else {
    index.push(indexItem);
  }
  saveCapsuleIndex(index);

  alert('Capsule saved successfully!');
  window.dispatchEvent(new CustomEvent('app:navigate', {
    detail: { to: 'library' }
  }));
}

//  اولیه‌سازی 
document.addEventListener('DOMContentLoaded', () => {
  renderAuthorForm();
});

window.addEventListener('editCapsule', (e) => {
  const capsule = getCapsule(e.detail.id);
  if (capsule) {
    renderAuthorForm(capsule);
  } else {
    renderAuthorForm();
  }
});