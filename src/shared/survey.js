const { escapeHtml } = require('./escape');

function renderSurvey(practice) {
  const surveyId = escapeHtml(practice.surveyId);
  const source = `https://api.leadconnectorhq.com/widget/survey/${surveyId}`;
  return `<section class="consultation-section" id="consultation" aria-labelledby="consultation-title">
    <div class="landing-container consultation-grid">
      <div class="consultation-intro">
        <p class="landing-eyebrow">Consultation request · ${escapeHtml(practice.campaignDestination)}</p>
        <h2 id="consultation-title">Request a consultation with ${escapeHtml(practice.publicName)}.</h2>
        <p>Your information is sent directly to ${escapeHtml(practice.campaignDestination)} through its secure request form. This page is not a diagnosis and should not be used for emergencies.</p>
        <div class="consultation-contact"><a href="tel:${escapeHtml(practice.phoneRaw)}" aria-label="Call ${escapeHtml(practice.publicName)} at ${escapeHtml(practice.phoneDisplay)}">Call ${escapeHtml(practice.phoneDisplay)}</a><a href="sms:${escapeHtml(practice.textRaw)}" aria-label="Text ${escapeHtml(practice.publicName)}">Text ${escapeHtml(practice.campaignDestination)}</a></div>
      </div>
      <div class="survey-frame-wrap">
        <iframe src="${source}" style="border:none;width:100%;" scrolling="no" id="${surveyId}" title="${escapeHtml(practice.campaignDestination)} consultation survey" data-cookie-consent="true" data-cookie-consent-provider="auto" referrerpolicy="strict-origin-when-cross-origin"></iframe>
      </div>
    </div>
  </section><script async src="https://link.msgsndr.com/js/form_embed.js"></script>`;
}

module.exports = { renderSurvey };
