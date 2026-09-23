const { escapeHtml } = require('./escape');

function renderSurvey(practice, { heroAdjacent = false } = {}) {
  const surveyId = escapeHtml(practice.surveyId);
  const source = `https://api.leadconnectorhq.com/widget/survey/${surveyId}`;
  const showPracticeName = practice.showPracticeName !== false;
  const showPhone = practice.showPhone !== false;
  const showText = practice.showText !== false;
  const defaultHeading = showPracticeName ? `Request a consultation with ${escapeHtml(practice.publicName)}.` : 'Request a consultation.';
  const defaultContext = showPracticeName
    ? `Your request goes directly to ${escapeHtml(practice.campaignDestination)}.`
    : 'Your request goes directly to your selected local practice.';
  const heading = heroAdjacent ? 'Start your sleep symptom check.' : defaultHeading;
  const context = heroAdjacent
    ? `${defaultContext} Share the patterns you notice, then choose the next step that feels right.`
    : defaultContext;
  const contactActions = [
    showPhone ? `<a href="tel:${escapeHtml(practice.phoneRaw)}" aria-label="Call the office at ${escapeHtml(practice.phoneDisplay)}">Call ${escapeHtml(practice.phoneDisplay)}</a>` : '',
    showText ? `<a href="sms:${escapeHtml(practice.textRaw)}" aria-label="Text the office">Text the office</a>` : '',
  ].filter(Boolean).join('');
  const contact = contactActions ? `<div class="consultation-contact">${contactActions}</div>` : '';
  const eyebrow = heroAdjacent
    ? `Sleep symptom check · ${showPracticeName ? escapeHtml(practice.campaignDestination) : 'Local practice'}`
    : (showPracticeName ? `Consultation request · ${escapeHtml(practice.campaignDestination)}` : 'Consultation request');
  return `<section class="consultation-section${heroAdjacent ? ' consultation-section-hero-adjacent' : ''}" id="consultation" aria-labelledby="consultation-title">
    <div class="landing-container consultation-grid">
      <div class="consultation-intro">
        <p class="landing-eyebrow">${eyebrow}</p>
        <h2 id="consultation-title">${heading}</h2>
        <p>${context} Not a diagnosis or emergency service.</p>
        ${contact}
      </div>
      <div class="survey-frame-wrap">
        <iframe src="${source}" style="border:none;width:100%;" scrolling="no" id="${surveyId}" title="${escapeHtml(practice.campaignDestination)} consultation survey" data-cookie-consent="true" data-cookie-consent-provider="auto" referrerpolicy="strict-origin-when-cross-origin"></iframe>
      </div>
    </div>
  </section><script async src="https://link.msgsndr.com/js/form_embed.js"></script>`;
}

module.exports = { renderSurvey };
