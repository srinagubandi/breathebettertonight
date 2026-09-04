const { escapeHtml } = require('./escape');

function renderSurvey(practice) {
  const surveyId = escapeHtml(practice.surveyId);
  const source = `https://api.leadconnectorhq.com/widget/survey/${surveyId}`;
  return `<section class="consultation-section" id="free-consultation" aria-labelledby="consultation-title">
    <div class="landing-container consultation-grid">
      <div class="consultation-intro">
        <p class="landing-eyebrow">Free consultation</p>
        <h2 id="consultation-title">Take the next step with ${escapeHtml(practice.publicName)}.</h2>
        <p>This short consultation request helps the office understand how to follow up. It is not a diagnosis and should not be used for emergencies.</p>
        <div class="consultation-contact"><a href="tel:${escapeHtml(practice.phoneRaw)}">Call ${escapeHtml(practice.phoneDisplay)}</a><a href="sms:${escapeHtml(practice.textRaw)}">Text the office</a></div>
      </div>
      <div class="survey-frame-wrap">
        <iframe src="${source}" style="border:none;width:100%;" scrolling="no" id="${surveyId}" title="${escapeHtml(practice.campaignDestination)} free consultation survey" data-cookie-consent="true" data-cookie-consent-provider="auto"></iframe>
      </div>
    </div>
  </section><script async src="https://link.msgsndr.com/js/form_embed.js"></script>`;
}

module.exports = { renderSurvey };
