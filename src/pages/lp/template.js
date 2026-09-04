/**
 * Symptom-led landing-page template.
 *
 * All content is supplied by a doctor/variant configuration object. This keeps
 * doctor, city, design-variant, symptom, bio, and review changes out of markup.
 */
const { layout } = require('../../shared/layout');
const { resolveCityLabel, resolvePhone } = require('../../data/index');
const { getPracticeByLegacyDoctor } = require('../../data/practices');
const { renderSurvey } = require('../../shared/survey');

const ICONS = {
  sound: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l5 4V6l-5 4H4Zm12.5-3.5a1 1 0 0 1 1.4.1 7.5 7.5 0 0 1 0 10.8 1 1 0 1 1-1.5-1.3 5.5 5.5 0 0 0 0-8 1 1 0 0 1 .1-1.5Zm2.8-2.9a1 1 0 0 1 1.4.1 11.5 11.5 0 0 1 0 16.6 1 1 0 0 1-1.5-1.3 9.5 9.5 0 0 0 0-13.8 1 1 0 0 1 .1-1.5Z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3v14H7V5Zm7 0h3v14h-3V5ZM3 12a9 9 0 0 1 18 0h-2a7 7 0 0 0-14 0H3Z"/></svg>',
  air: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8h10a3 3 0 1 0-3-3h2a1 1 0 1 1 1 1H3V8Zm0 5h14a3 3 0 1 1-3 3h-2a1 1 0 1 0 1-1H3v-2Zm0 5h7v2H3v-2Z"/></svg>',
  sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5V2h2v3h-2Zm0 17v-3h2v3h-2ZM5.6 7 3.5 4.9l1.4-1.4L7 5.6 5.6 7Zm12.8 12-2.1-2.1 1.4-1.4 2.1 2.1-1.4 1.4ZM5 11H2v2h3v-2Zm17 0h-3v2h3v-2ZM5.6 17 3.5 19.1l1.4 1.4L7 18.4 5.6 17Zm12.8-12 2.1-2.1 1.4 1.4-2.1 2.1L18.4 5ZM13 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"/></svg>',
  head: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a8 8 0 0 0-8 8v3l-2 3h4v2a4 4 0 0 0 4 4h5v-5h3v-7a8 8 0 0 0-6-7.8V2Zm0 3a5 5 0 0 1 5 5v4h-4v5h-3a2 2 0 0 1-2-2v-3H5.7L6 13v-3a6 6 0 0 1 6-5Z"/></svg>',
  drop: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2S5 9.4 5 14a7 7 0 0 0 14 0c0-4.6-7-12-7-12Zm0 17a5 5 0 0 1-5-5c0-2.5 3.1-7 5-9.5 1.9 2.5 5 7 5 9.5a5 5 0 0 1-5 5Z"/></svg>',
  focus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6v2H9V3Zm-4 6h14v2H5V9Zm-2 5h18v2H3v-2Zm3 5h12v2H6v-2Z"/></svg>',
  move: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h11a3 3 0 1 0-3-3h2a1 1 0 1 1 1 1H3V7Zm0 6h14a3 3 0 1 1-3 3h-2a1 1 0 1 0 1-1H3v-2Zm0 5h8v2H3v-2Z"/></svg>',
  battery: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14v10H5V7Zm-2 2H1v6h2V9Zm4 0v6h8V9H7Zm14 1v4h2v-4h-2Z"/></svg>',
  spark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Zm7 13 .8 3.2L23 19l-3.2.8L19 23l-.8-3.2L15 19l3.2-.8L19 15Z"/></svg>',
  moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 15.4A8 8 0 0 1 8.6 3.5 9 9 0 1 0 20.5 15.4ZM12 20a7 7 0 0 1-5.5-11.3A10 10 0 0 0 15.3 17c1.6 0 3.1-.4 4.4-1.2A7 7 0 0 1 12 20Z"/></svg>',
};

function icon(name) {
  return ICONS[name] || ICONS.sun;
}

function renderLP(doctor, variantSlug, citySlug, practiceOverride = null) {
  const variant = doctor.variants[variantSlug];
  const practice = practiceOverride || getPracticeByLegacyDoctor(doctor.slug);
  const cityLabel = resolveCityLabel(doctor, citySlug);
  const phone = resolvePhone(doctor, citySlug);
  const phoneRaw = phone.replace(/\D/g, '');
  const designSystem = variant.designSystem || 'default';
  // All designs deliberately share this approved content; only structure and styling vary.
  const content = doctor.sharedContent || variant;

  const symptomCards = content.symptoms.map((symptom, index) => `
    <article class="symptom-card" data-symptom-index="${index}">
      <div class="symptom-icon">${icon(symptom.icon)}</div>
      <div class="symptom-copy">
        <h3>${symptom.label}</h3>
        <p>${symptom.desc}</p>
      </div>
      <span class="symptom-arrow" aria-hidden="true">→</span>
    </article>`).join('');

  const faqItems = doctor.faqs.map((faq) => `
    <article class="faq-item">
      <button class="faq-question" type="button" aria-expanded="false">${faq.q}<span>+</span></button>
      <div class="faq-answer"><p>${faq.a}</p></div>
    </article>`).join('');

  const body = `
    <div class="lp-shell ds-${designSystem}">
    <section class="symptom-hero" id="top">
      <div class="symptom-hero-media" style="background-image:url('${variant.hero}');"></div>
      <div class="symptom-hero-scrim"></div>
      <div class="symptom-hero-content container">
        <p class="eyebrow">${content.eyebrow}</p>
        <h1>${content.headline}</h1>
        <p class="hero-subtitle">${content.subheadline}</p>
        <a href="#consultation" class="button button-primary">Request a consultation<span aria-hidden="true">→</span></a>
        <p class="hero-microcopy">Private, pressure-free symptom awareness. No diagnosis through this page.</p>
      </div>
    </section>

    <section class="symptom-section" id="symptom-check">
      <div class="container section-narrow">
        <p class="eyebrow eyebrow-accent">Private symptom check</p>
        <h2>${content.symptomTitle}</h2>
        <p class="section-intro">${content.symptomIntro}</p>
        <div class="symptom-grid">${symptomCards}</div>
        <div class="screening-note">
          <span aria-hidden="true">✓</span>
          <p>Snoring alone does not diagnose a sleep disorder. Persistent symptoms are worth discussing with a qualified provider.</p>
        </div>
      </div>
    </section>

    <section class="provider-section" id="provider-profile">
      <div class="container">
        <div class="provider-card provider-card-local">
          <div class="provider-copy">
            <p class="eyebrow">Your local consultation route</p>
            <h2>${doctor.practice}</h2>
            <p class="provider-practice">${doctor.name}, ${doctor.credentials}</p>
            <p class="provider-bio">Use the secure request below to ask the office for a consultation about persistent sleep concerns.</p>
            <p class="provider-location">Serving ${cityLabel}</p>
          </div>
          <div class="provider-actions"><a href="tel:${phoneRaw}">Call ${phone}</a><a href="sms:${phoneRaw}">Text the office</a></div>
        </div>
      </div>
    </section>

    <section class="next-step-section">
      <div class="container next-step-inner">
        <div>
          <p class="eyebrow">When you are ready</p>
          <h2>Talk through your sleep concerns privately.</h2>
          <p>Request a consultation below or contact the office directly to discuss a practical next step.</p>
        </div>
        <a href="tel:${phoneRaw}" class="button button-secondary">Call ${phone}<span aria-hidden="true">→</span></a>
      </div>
    </section>

    ${practice ? renderSurvey(practice) : ''}

    <section class="faq-section">
      <div class="container section-narrow">
        <p class="eyebrow eyebrow-accent">Common questions</p>
        <h2>Helpful context before you call.</h2>
        <div class="faq-list">${faqItems}</div>
      </div>
    </section>

    <section class="medical-disclaimer">
      <div class="container"><p>This symptom screen is not a diagnosis and does not replace medical advice. A qualified healthcare professional can evaluate sleep concerns and recommend appropriate next steps.</p></div>
    </section>
    </div>`;

  return layout({
    title: `${content.headline} — ${doctor.name}, ${cityLabel}`,
    theme: variant.theme,
    designSystem,
    body,
    phone,
    phoneRaw,
    practice,
    headerTarget: practice ? '#consultation' : '#symptom-check',
    policyBase: practice ? `/care/${practice.key}` : '',
  });
}

module.exports = { renderLP };
