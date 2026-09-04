/** Small, decorative SVG vocabulary for symptom and credential guidance. */
const icons = {
  sound: '<path d="M5 10v4h3l4.7 3.7V6.3L8 10H5Z"/><path d="M16 9a4.5 4.5 0 0 1 0 6M18.8 6.2a8.5 8.5 0 0 1 0 11.6"/>',
  airway: '<path d="M4 8h8a3 3 0 1 0-2.6-4.5M4 12h13a3 3 0 1 1-2.6 4.5M4 16h7"/>',
  moon: '<path d="M20 15.2A8.2 8.2 0 0 1 8.8 4 8.8 8.8 0 1 0 20 15.2Z"/>',
  sunrise: '<path d="M4 17h16M12 3v4M5.6 6.6l2.7 2.7M18.4 6.6l-2.7 2.7M6 13a6 6 0 0 1 12 0"/>',
  focus: '<path d="M5 4h4M15 4h4M5 20h4M15 20h4M8 8h8v8H8z"/><path d="M11 10.5h2v3h-2z"/>',
  head: '<path d="M12 3a7 7 0 0 0-7 7v3l-2 3h4v2a3 3 0 0 0 3 3h4v-5h3v-6a7 7 0 0 0-5-6.7Z"/><path d="M8 10h.01M12 8.5v4M16 10h.01"/>',
  evaluation: '<rect x="6" y="4" width="12" height="16" rx="2"/><path d="M9 4.5h6v3H9zM9 11h6M9 15h4"/>',
  appliance: '<path d="M6 5.5c1.8 1 3.8 1.5 6 1.5s4.2-.5 6-1.5v4.2c0 4-2.5 7.5-6 8.8-3.5-1.3-6-4.8-6-8.8V5.5Z"/><path d="M9.2 12.1 11.2 14l4-4"/>',
  followup: '<circle cx="12" cy="12" r="8"/><path d="m8.5 12 2.3 2.3 4.8-5"/>',
  credential: '<path d="m4 10 8-4 8 4-8 4-8-4Z"/><path d="M7 12.2v3.1c2.8 1.7 7.2 1.7 10 0v-3.1M20 10v5"/>',
  dentist: '<path d="M8.2 4.8c1.1 0 1.8.6 3.8.6s2.7-.6 3.8-.6c2.4 0 4 1.9 4 4.5 0 3-1.6 6-3.2 8.4-.7 1-1.7 1.8-2.5 1.4-.7-.3-.7-2.3-2.1-2.3s-1.4 2-2.1 2.3c-.8.4-1.8-.4-2.5-1.4-1.6-2.4-3.2-5.4-3.2-8.4 0-2.6 1.6-4.5 4-4.5Z"/>',
};

function medicalIcon(name, className = '') {
  const body = icons[name] || icons.evaluation;
  return `<svg${className ? ` class="${className}"` : ''} viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
}

module.exports = { medicalIcon };
