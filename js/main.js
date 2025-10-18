// js/main.js
const SECTIONS = ['library-section', 'author-section', 'learn-section'];

function showSection(id) {
  if (!SECTIONS.includes(id)) return;
  SECTIONS.forEach(secId => {
    const el = document.getElementById(secId);
    if (el) el.hidden = secId !== id;
  });
}

document.addEventListener('click', (e) => {
  const target = e.target.closest('[data-target]');
  if (target?.dataset.target) {
    e.preventDefault();
    showSection(target.dataset.target);
  }
});

window.addEventListener('app:navigate', (e) => {
  if (e.detail.to === 'author') {
    localStorage.removeItem('editingCapsuleId'); 
    showSection('author-section');
  } else if (e.detail.to === 'learn') {
    localStorage.setItem('learningCapsuleId', e.detail.id);
    showSection('learn-section');
  } else if (e.detail.to === 'library') {
    showSection('library-section');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  showSection('library-section');
});

