export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const CLASSES = [
  'PRE KG', 'LKG', 'UKG',
  'I', 'II', 'III', 'IV', 'V',
  'VI', 'VII', 'VIII', 'IX', 'X',
  'XI', 'XII'
];

export const SECTIONS = ['A', 'B', 'C', 'D'];

export function getTodayFormatted() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export function getTodayISO() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

export function getDayFromDate(dateStr) {
  // dateStr format: DD/MM/YYYY
  if (!dateStr || dateStr.length !== 10) return '';
  const [dd, mm, yyyy] = dateStr.split('/');
  const date = new Date(`${yyyy}-${mm}-${dd}`);
  if (isNaN(date.getTime())) return '';
  return DAYS[date.getDay()];
}

export function isoToFormatted(isoStr) {
  // YYYY-MM-DD -> DD/MM/YYYY
  if (!isoStr) return '';
  const [yyyy, mm, dd] = isoStr.split('-');
  return `${dd}/${mm}/${yyyy}`;
}

export function formattedToISO(formatted) {
  // DD/MM/YYYY -> YYYY-MM-DD
  if (!formatted || formatted.length !== 10) return '';
  const [dd, mm, yyyy] = formatted.split('/');
  return `${yyyy}-${mm}-${dd}`;
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function formatDateTime(isoString) {
  const date = new Date(isoString);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${dd}/${mm}/${yyyy} at ${hh}:${min}`;
}
