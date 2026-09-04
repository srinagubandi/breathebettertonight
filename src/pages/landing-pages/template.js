/** Night-to-Clarity landing-page renderer. */
const { layout } = require('../../shared/layout');
const { escapeHtml } = require('../../shared/escape');
const { renderSurvey } = require('../../shared/survey');

function renderRecognition(items) {
  return items.map((item, index) => `<article class="signal-card"><span>0${index + 1}</span><p>${escapeHtml(item)}</p></article>`).join('');
}

function renderLandingPage({ practice, campaign, locality = '', legacy = false }) {
  const localityLine = locality ? `Serving ${escapeHtml(locality)} with ${escapeHtml(practice.publicName)}.` : `Serving ${escapeHtml(practice.serviceLabel)}.`;
  const destination = `${escapeHtml(practice.campaignDestination)} · ${escapeHtml(practice.publicName)}`;
  const body = `<div class="landing-v3 landing-${escapeHtml(campaign.designSystem || 'night-to-clarity')}">
    <section class="landing-hero" style="--hero-image:url('${escapeHtml(campaign.hero)}')">
      <div class="landing-hero-scrim"></div>
      <div class="landing-container landing-hero-content">
        <p class="landing-eyebrow">${escapeHtml(campaign.eyebrow || 'Night-to-Clarity')} · ${escapeHtml(practice.campaignDestination)}</p>
        <h1>${escapeHtml(campaign.headline)}</h1>
        <p class="landing-lede">${escapeHtml(campaign.subheadline)}</p>
        <div class="landing-actions"><a class="landing-button landing-button-primary" href="#consultation">Request a consultation with ${escapeHtml(practice.campaignDestination)} <span aria-hidden="true">→</span></a><a class="landing-button landing-button-secondary" href="tel:${escapeHtml(practice.phoneRaw)}">Call ${escapeHtml(practice.phoneDisplay)}</a><a class="landing-button landing-button-secondary" href="sms:${escapeHtml(practice.textRaw)}">Text the office</a></div>
        <p class="landing-microcopy">Your request is sent to ${destination}. No diagnosis. No pressure.</p>
      </div>
    </section>
    <section class="recognition-section" id="signals">
      <div class="landing-container recognition-layout">
        <div><p class="landing-eyebrow landing-eyebrow-dark">Recognition first</p><h2>${escapeHtml(campaign.recognitionTitle || 'Start with the signs you recognize.')}</h2><p>Sleep symptoms can have more than one cause. Recognizing a pattern is a reason to begin a conversation, not a diagnosis.</p></div>
        <div class="signal-list">${renderRecognition(campaign.recognition || [])}</div>
      </div>
    </section>
    <section class="practice-context">
      <div class="landing-container practice-context-grid"><div><p class="landing-eyebrow">Your selected local destination</p><h2>${escapeHtml(practice.publicName)}</h2><p>${escapeHtml(practice.doctorName)}, ${escapeHtml(practice.credentials)} · ${escapeHtml(practice.address)}</p><p>${localityLine}</p></div><div class="practice-contact-card"><strong>Request a consultation</strong><p>Choose the secure request below, or contact the office directly.</p><a href="tel:${escapeHtml(practice.phoneRaw)}">Call ${escapeHtml(practice.phoneDisplay)}</a><a href="sms:${escapeHtml(practice.textRaw)}">Text the office</a></div></div>
    </section>
    ${renderSurvey(practice)}
    <section class="landing-disclaimer"><div class="landing-container">This page provides general symptom-awareness information. It does not provide medical advice, a diagnosis, treatment recommendations, or emergency services. If you are experiencing an emergency, call 911 or seek immediate local care.</div></section>
  </div>`;

  return layout({
    title: `${campaign.headline} — ${practice.publicName}`,
    theme: legacy ? campaign.theme || 'v1' : 'v1',
    designSystem: campaign.designSystem || 'night-to-clarity',
    body,
    practice,
    headerTarget: '#consultation',
    policyBase: `/care/${practice.key}`,
    robots: 'noindex, nofollow',
  });
}

module.exports = { renderLandingPage };
