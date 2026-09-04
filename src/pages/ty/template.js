/**
 * Qualified thank-you page template.
 * This page remains available for a future form integration, but makes no claim
 * that a form currently exists or that a message has already been submitted.
 */
const { layout } = require('../../shared/layout');
const { resolveCityLabel, resolvePhone } = require('../../data/index');
const { getPracticeByLegacyDoctor } = require('../../data/practices');

function renderTY(doctor, variantSlug, citySlug, practiceOverride = null) {
  const variant = doctor.variants[variantSlug];
  const practice = practiceOverride || getPracticeByLegacyDoctor(doctor.slug);
  const cityLabel = resolveCityLabel(doctor, citySlug);
  const phone = resolvePhone(doctor, citySlug);
  const phoneRaw = phone.replace(/\D/g, '');
  const callDisplay = practice?.phoneDisplay || phone;
  const callRaw = practice?.phoneRaw || phoneRaw;
  const showPracticeName = !practice || practice.showPracticeName !== false;
  const showPhone = !practice || practice.showPhone !== false;
  const practiceLabel = showPracticeName ? (practice?.publicName || doctor.practice) : 'your selected local practice';
  const providerName = showPracticeName ? `${doctor.name}, ${doctor.credentials}` : 'A local conversation, when you are ready';
  const providerDetail = showPracticeName ? (practice?.publicName || doctor.practice) : 'A selected local practice will receive your consultation request.';
  const callCopy = showPracticeName ? `Call ${practiceLabel} to discuss symptoms and the appropriate next step with the office.` : 'Use the consultation request to discuss symptoms and an appropriate next step with the office.';
  const callAction = showPhone ? `<a href="tel:${callRaw}" class="button button-secondary">Call ${callDisplay}<span aria-hidden="true">→</span></a>` : '';
  const body = `<div class="legacy-outcome" style="--outcome-image:url('${variant.hero}')">
    <section class="ty-hero">
      <div class="ty-check">✓</div>
      <p class="ty-eyebrow">Thank you</p>
      <h1 class="ty-headline">Your next step can be a private conversation.</h1>
      <p class="ty-sub">If you are ready to discuss persistent sleep symptoms, ${practiceLabel} can help you understand an appropriate evaluation path.</p>
    </section>

    <section class="provider-section">
      <div class="container">
        <div class="provider-card provider-card-local"><div class="provider-copy"><p class="eyebrow">${showPracticeName ? 'Your selected local practice' : 'Your local consultation route'}</p><h2>${providerName}</h2><p class="provider-practice">${providerDetail}</p><p class="provider-bio">${doctor.profile.bioPlaceholder}</p><p class="provider-location">Serving ${cityLabel}</p></div></div>
      </div>
    </section>

    <section class="next-step-section">
      <div class="container next-step-inner">
        <div>
          <p class="eyebrow">When you are ready</p>
          <h2>Talk through your sleep concerns privately.</h2>
          <p>${callCopy}</p>
        </div>
        ${callAction}
      </div>
    </section></div>`;

  return layout({
    title: `Thank You${showPracticeName ? ` — ${doctor.name}` : ''}`,
    theme: variant.theme,
    designSystem: variant.designSystem,
    body,
    phone: callDisplay,
    phoneRaw: callRaw,
    practice,
    headerTarget: practice ? `/care/${practice.key}` : '#top',
    policyBase: practice ? `/care/${practice.key}` : '',
  });
}

module.exports = { renderTY };
