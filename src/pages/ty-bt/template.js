/**
 * Below-target thank-you page template.
 * Reserved for future qualification logic. It is deliberately warm, neutral, and
 * non-diagnostic; it does not imply a treatment decision or form submission.
 */
const { layout } = require('../../shared/layout');
const { resolveCityLabel, resolvePhone } = require('../../data/index');
const { getPracticeByLegacyDoctor } = require('../../data/practices');

function renderTYBT(doctor, variantSlug, citySlug, practiceOverride = null) {
  const variant = doctor.variants[variantSlug];
  const practice = practiceOverride || getPracticeByLegacyDoctor(doctor.slug);
  const cityLabel = resolveCityLabel(doctor, citySlug);
  const phone = resolvePhone(doctor, citySlug);
  const phoneRaw = phone.replace(/\D/g, '');
  const callDisplay = practice?.phoneDisplay || phone;
  const callRaw = practice?.phoneRaw || phoneRaw;
  const showPracticeName = !practice || practice.showPracticeName !== false;
  const showPhone = !practice || practice.showPhone !== false;
  const practiceLabel = showPracticeName ? (practice?.publicName || doctor.practice) : 'a selected local practice';
  const providerName = showPracticeName ? `${doctor.name}, ${doctor.credentials}` : 'A local conversation, when you are ready';
  const providerDetail = showPracticeName ? (practice?.publicName || doctor.practice) : 'Your consultation request can go to the selected local practice.';
  const callCopy = showPracticeName ? `Call ${practiceLabel} to discuss symptoms and next steps.` : 'Use the consultation request to discuss symptoms and next steps.';
  const callAction = showPhone ? `<a href="tel:${callRaw}" class="button button-secondary">Call ${callDisplay}<span aria-hidden="true">→</span></a>` : '';
  const body = `<div class="legacy-outcome legacy-outcome-helpful" style="--outcome-image:url('${variant.hero}')">
    <section class="ty-hero">
      <div class="ty-check">i</div>
      <p class="ty-eyebrow">Helpful next step</p>
      <h1 class="ty-headline">Sleep concerns deserve the right evaluation.</h1>
      <p class="ty-sub">This symptom screen is not a diagnosis. If symptoms continue, ${practiceLabel} can discuss next steps.</p>
    </section>

    <section class="symptom-section">
      <div class="container section-narrow">
        <p class="eyebrow eyebrow-accent">What to remember</p>
        <h2>Start with a calm, private conversation.</h2>
        <p class="section-intro">Snoring, breathing pauses, gasping, and daytime tiredness can have many causes. A qualified clinician can evaluate your concerns.</p>
      </div>
    </section>

    <section class="provider-section">
      <div class="container">
        <div class="provider-card provider-card-local"><div class="provider-copy"><p class="eyebrow">${showPracticeName ? 'Your selected local practice' : 'Your local consultation route'}</p><h2>${providerName}</h2><p class="provider-practice">${providerDetail}</p><p class="provider-bio">${doctor.profile.bioPlaceholder}</p><p class="provider-location">Serving ${cityLabel}</p></div></div>
      </div>
    </section>

    <section class="next-step-section">
      <div class="container next-step-inner">
        <div>
          <p class="eyebrow">Questions?</p>
          <h2>Discuss your concerns without pressure.</h2>
          <p>${callCopy}</p>
        </div>
        ${callAction}
      </div>
    </section></div>`;

  return layout({
    title: `Helpful Next Step${showPracticeName ? ` — ${doctor.name}` : ''}`,
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

module.exports = { renderTYBT };
