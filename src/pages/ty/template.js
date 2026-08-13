/**
 * Qualified thank-you page template.
 * This page remains available for a future form integration, but makes no claim
 * that a form currently exists or that a message has already been submitted.
 */
const { layout } = require('../../shared/layout');
const { resolveCityLabel, resolvePhone } = require('../../data/index');

function renderTY(doctor, variantSlug, citySlug) {
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
      <div class="ty-check">✓</div>
      <p class="ty-eyebrow">Thank you</p>
      <h1 class="ty-headline">Your next step can be a private conversation.</h1>
      <p class="ty-sub">If you are ready to discuss persistent sleep symptoms, ${doctor.practice} can help you understand the appropriate evaluation path.</p>
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
          <p class="eyebrow">When you are ready</p>
          <h2>Talk through your sleep concerns privately.</h2>
          <p>Call ${doctor.practice} to discuss symptoms and the appropriate next step with the office.</p>
        </div>
        <a href="tel:${phoneRaw}" class="button button-secondary">Call ${phone}<span aria-hidden="true">→</span></a>
      </div>
    </section>`;

  return layout({ title: `Thank You — ${doctor.name}`, theme: variant.theme, body, phone, phoneRaw });
}

module.exports = { renderTY };
