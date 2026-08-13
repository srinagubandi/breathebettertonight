/**
 * Below-target thank-you page template.
 * Reserved for future qualification logic. It is deliberately warm, neutral, and
 * non-diagnostic; it does not imply a treatment decision or form submission.
 */
const { layout } = require('../../shared/layout');
const { resolveCityLabel, resolvePhone } = require('../../data/index');

function renderTYBT(doctor, variantSlug, citySlug) {
  const variant = doctor.variants[variantSlug];
  const cityLabel = resolveCityLabel(doctor, citySlug);
  const phone = resolvePhone(doctor, citySlug);
  const phoneRaw = phone.replace(/\D/g, '');
  const profile = doctor.profile;

  const photo = profile.photo
    ? `<img src="${profile.photo}" alt="${doctor.name}" />`
    : '<span class="doctor-photo-placeholder" aria-hidden="true">DR<br>PHOTO</span>';

  const body = `
    <section class="ty-hero">
      <div class="ty-check">i</div>
      <p class="ty-eyebrow">Helpful next step</p>
      <h1 class="ty-headline">Sleep concerns deserve the right evaluation.</h1>
      <p class="ty-sub">A symptom screen is not a diagnosis. If symptoms continue, ${doctor.practice} can help you discuss the most appropriate path forward.</p>
    </section>

    <section class="symptom-section">
      <div class="container section-narrow">
        <p class="eyebrow eyebrow-accent">What to remember</p>
        <h2>Start with a calm, private conversation.</h2>
        <p class="section-intro">Loud snoring, breathing pauses, gasping, and excessive daytime tiredness can have more than one cause. A qualified healthcare professional can evaluate your concerns.</p>
      </div>
    </section>

    <section class="provider-section">
      <div class="container">
        <div class="provider-card">
          <div class="provider-profile">
            <div class="doctor-photo">${photo}</div>
            <div class="provider-copy">
              <p class="eyebrow">Provider placeholder</p>
              <h2>${doctor.name}, ${doctor.credentials}</h2>
              <p class="provider-practice">${doctor.practice}</p>
              <p class="provider-bio">${profile.bioPlaceholder}</p>
              <p class="provider-location">Serving ${cityLabel}</p>
            </div>
          </div>
          <aside class="review-placeholder">
            <p class="review-label">${profile.reviewLabel}</p>
            <blockquote>“${profile.reviewQuote}”</blockquote>
            <p class="review-attribution">${profile.reviewAttribution}</p>
          </aside>
        </div>
      </div>
    </section>

    <section class="next-step-section">
      <div class="container next-step-inner">
        <div>
          <p class="eyebrow">Questions?</p>
          <h2>Talk through your concerns without pressure.</h2>
          <p>Call ${doctor.practice} to discuss symptoms and next steps with the office.</p>
        </div>
        <a href="tel:${phoneRaw}" class="button button-secondary">Call ${phone}<span aria-hidden="true">→</span></a>
      </div>
    </section>`;

  return layout({ title: `Helpful Next Step — ${doctor.name}`, theme: variant.theme, body, phone, phoneRaw });
}

module.exports = { renderTYBT };
