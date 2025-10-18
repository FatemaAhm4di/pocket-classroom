export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function timeAgo(isoString) {
  const now = new Date();
  const past = new Date(isoString);
  const diffSec = Math.floor((now - past) / 1000);

  if (diffSec < 60) return 'just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} min ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} hr ago`;
  return `${Math.floor(diffSec / 86400)} day ago`;
}

export function getCapsuleIndex() {
  try {
    const data = localStorage.getItem('pc_capsules_index');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.warn('Failed to parse capsule index', e);
    return [];
  }
}

export function saveCapsuleIndex(index) {
  localStorage.setItem('pc_capsules_index', JSON.stringify(index));
}

export function getCapsule(id) {
  try {
    const data = localStorage.getItem(`pc_capsule_${id}`);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.warn(`Failed to parse capsule ${id}`, e);
    return null;
  }
}

export function saveCapsule(capsule) {
  if (!capsule.id) throw new Error('Capsule must have an id');
  localStorage.setItem(`pc_capsule_${capsule.id}`, JSON.stringify(capsule));
}

export function getProgress(id) {
  try {
    const data = localStorage.getItem(`pc_progress_${id}`);
    return data ? JSON.parse(data) : { bestScore: 0, knownFlashcards: [] };
  } catch (e) {
    console.warn(`Failed to parse progress ${id}`, e);
    return { bestScore: 0, knownFlashcards: [] };
  }
}

export function saveProgress(id, progress) {
  localStorage.setItem(`pc_progress_${id}`, JSON.stringify(progress));
}

export function deleteCapsule(id) {
  const index = getCapsuleIndex().filter(c => c.id !== id);
  saveCapsuleIndex(index);
  localStorage.removeItem(`pc_capsule_${id}`);
  localStorage.removeItem(`pc_progress_${id}`);
}