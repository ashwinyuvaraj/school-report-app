// LocalStorage Keys
export const KEYS = {
  SUBJECTS: 'subjects',
  HISTORY: 'history',
  USER_SESSION: 'userSession',
  DASHBOARD_DRAFT: 'dashboardDraft',
  DARK_MODE: 'darkMode',
};

// Default subjects
export const DEFAULT_SUBJECTS = [
  { id: '1', name: 'EVS', emoji: '🌿' },
  { id: '2', name: 'P.E.T', emoji: '⚽' },
  { id: '3', name: 'ENG', emoji: '🔤' },
  { id: '4', name: 'Computer', emoji: '💻' },
  { id: '5', name: 'Spoken English', emoji: '🗣️' },
  { id: '6', name: 'MAT', emoji: '🔢' },
  { id: '7', name: 'TAM', emoji: '📝' },
  { id: '8', name: 'GK', emoji: '💻' },
  { id: '9', name: 'Science', emoji: '🔬' },
  { id: '10', name: 'Social', emoji: '🌍' },
  { id: '11', name: 'Hindi', emoji: '🇮🇳' },
  { id: '12', name: 'Drawing', emoji: '🎨' },
];

const storage = {
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },

  // Subjects
  getSubjects() {
    const subjects = this.get(KEYS.SUBJECTS);
    if (!subjects || subjects.length === 0) {
      this.set(KEYS.SUBJECTS, DEFAULT_SUBJECTS);
      return DEFAULT_SUBJECTS;
    }
    return subjects;
  },

  saveSubjects(subjects) {
    return this.set(KEYS.SUBJECTS, subjects);
  },

  // History
  getHistory() {
    return this.get(KEYS.HISTORY) || [];
  },

  saveHistory(history) {
    return this.set(KEYS.HISTORY, history);
  },

  addToHistory(report) {
    const history = this.getHistory();
    history.unshift(report);
    return this.saveHistory(history);
  },

  deleteFromHistory(id) {
    const history = this.getHistory().filter(r => r.id !== id);
    return this.saveHistory(history);
  },

  // Session
  getSession() {
    return this.get(KEYS.USER_SESSION);
  },

  saveSession(session) {
    return this.set(KEYS.USER_SESSION, session);
  },

  clearSession() {
    return this.remove(KEYS.USER_SESSION);
  },

  // Draft
  getDraft() {
    return this.get(KEYS.DASHBOARD_DRAFT);
  },

  saveDraft(draft) {
    return this.set(KEYS.DASHBOARD_DRAFT, draft);
  },

  clearDraft() {
    return this.remove(KEYS.DASHBOARD_DRAFT);
  },

  // Dark Mode
  getDarkMode() {
    return this.get(KEYS.DARK_MODE) || false;
  },

  saveDarkMode(isDark) {
    return this.set(KEYS.DARK_MODE, isDark);
  },
};

export default storage;
