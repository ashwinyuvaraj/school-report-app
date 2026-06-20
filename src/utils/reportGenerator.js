export function generateReport({ date, classSection, section, day, workDone, homework }) {
  const SCHOOL_NAME = '🏫 ALLWIN MATRIC HR. SEC. SCHOOL';
  const NOTE1 = '📌 NOTE: Kindly ensure that all books are brought regularly and homework is completed neatly.';
  const NOTE2 = '🙏 Parents are requested to check the diary regularly and help children prepare for tests.';

  let message = '';

  message += `${SCHOOL_NAME}\n\n`;
  message += `📅 Date: ${date}\n\n`;
  message += `👩‍🏫 Class & Section: ${classSection}- ${section}\n\n`;
  message += `📆 Day: ${day}\n\n`;

  message += `📝 WORK DONE IN THE CLASSROOM\n\n`;
  if (workDone && workDone.length > 0) {
    workDone.forEach(item => {
      if (item.subject && item.description) {
        message += `${item.subject.emoji} ${item.subject.name}: ${item.description}\n\n`;
      }
    });
  }

  message += `🏠 TODAY'S HOMEWORK\n\n`;
  if (homework && homework.length > 0) {
    homework.forEach(item => {
      if (item.subject && item.description) {
        message += `${item.subject.emoji} ${item.subject.name}: ${item.description}\n\n`;
      }
    });
  }

  message += `${NOTE1}\n\n`;
  message += `${NOTE2}`;

  return message;
}
