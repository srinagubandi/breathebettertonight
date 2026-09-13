/** Patient-safe guidance renderer: symptom recognition → appropriate evaluation → individualized treatment conversation. */
const { medicalIcon } = require('./medical-icons');

const defaultReasons = {
  eyebrow: 'Why discuss a pattern',
  title: 'Small details can add up.',
  copy: 'Changes in breathing, rest, or daytime energy can affect you or a partner. They can have many causes, so an evaluation helps clarify the next step.',
  cards: [
    ['During sleep', 'Loud snoring, pauses, gasping, or restless sleep.'],
    ['In the morning', 'Waking tired, dry mouth, or a morning headache.'],
    ['Through the day', 'Sleepiness, low energy, or trouble focusing.'],
  ],
};

const defaultAppliance = {
  eyebrow: 'From symptoms to a treatment conversation',
  title: 'Could an oral appliance be an option?',
  copy: 'After an appropriate evaluation, some adults may discuss a custom oral appliance. It can help support an open airway during sleep.',
  steps: [
    ['Start with the pattern', 'A clinician reviews symptoms and decides whether testing or another step is appropriate.'],
    ['Fit it precisely', 'A qualified dentist can fit a custom appliance for the recommended plan.'],
    ['Follow up', 'Care teams check comfort, fit, and whether the plan is working for you.'],
  ],
  note: 'An appliance is not right for everyone and does not replace medical evaluation.',
};

function renderReasonsAndSymptoms(content = {}) {
  const guidance = { ...defaultReasons, ...content };
  const icons = ['moon', 'sunrise', 'focus'];
  return `<section class="reasons-section" aria-labelledby="reasons-heading">
    <div class="landing-container reasons-layout">
      <div class="reasons-intro">
        <p class="landing-eyebrow landing-eyebrow-dark">${guidance.eyebrow}</p>
        <h2 id="reasons-heading">${guidance.title}</h2>
        <p>${guidance.copy}</p>
      </div>
      <div class="reasons-signal-grid" aria-label="Common sleep-related patterns to discuss">
        ${(guidance.cards || defaultReasons.cards).map((card, index) => `<article><span class="reason-icon">${medicalIcon(icons[index] || 'evaluation')}</span><h3>${card[0]}</h3><p>${card[1]}</p></article>`).join('')}
      </div>
    </div>
  </section>`;
}

function renderOralApplianceContext(content = {}) {
  const guidance = { ...defaultAppliance, ...content };
  return `<section class="oral-appliance-section" aria-labelledby="oral-appliance-heading">
    <div class="landing-container oral-appliance-layout">
      <div class="oral-appliance-intro">
        <p class="landing-eyebrow">${guidance.eyebrow}</p>
        <h2 id="oral-appliance-heading">${guidance.title}</h2>
        <p>${guidance.copy}</p>
      </div>
      <div class="oral-appliance-steps" aria-label="The oral appliance care pathway">
        ${(guidance.steps || defaultAppliance.steps).map((step, index) => `<article><span>0${index + 1}</span><h3>${step[0]}</h3><p>${step[1]}</p></article>`).join('')}
      </div>
      <p class="oral-appliance-note">${guidance.note}</p>
    </div>
  </section>`;
}

module.exports = { renderReasonsAndSymptoms, renderOralApplianceContext };
