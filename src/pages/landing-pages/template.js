/** Night-to-Clarity landing-page renderer. */
const { layout } = require('../../shared/layout');
const { escapeHtml } = require('../../shared/escape');
const { renderSurvey } = require('../../shared/survey');

function renderRecognition(items) {
  return items.map((item, index) => `<article class="signal-card"><span>0${index + 1}</span><p>${escapeHtml(item)}</p></article>`).join('');
}

function renderLandingPage({ practice, campaign, locality = '', legacy = false }) {
  const showPracticeName = practice.showPracticeName !== false;
  const showPhone = practice.showPhone !== false;
  const showText = practice.showText !== false;
  const localityLine = locality ? `Serving ${escapeHtml(locality)}${showPracticeName ? ` with ${escapeHtml(practice.publicName)}` : ''}.` : `Serving ${escapeHtml(practice.serviceLabel)}.`;
  const consultationLabel = 'Request a consultation';
  const microcopy = showPracticeName ? `Your request is sent to ${escapeHtml(practice.campaignDestination)}. No diagnosis. No pressure.` : 'Your request is sent to your selected local practice. No diagnosis. No pressure.';
  const heroActions = [
    `<a class="landing-button landing-button-primary" href="#consultation">${consultationLabel} <span aria-hidden="true">→</span></a>`,
    showPhone ? `<a class="landing-button landing-button-secondary" href="tel:${escapeHtml(practice.phoneRaw)}">Call ${escapeHtml(practice.phoneDisplay)}</a>` : '',
    showText ? `<a class="landing-button landing-button-secondary" href="sms:${escapeHtml(practice.textRaw)}">Text the office</a>` : '',
  ].filter(Boolean).join('');
  const contextTitle = showPracticeName ? escapeHtml(practice.publicName) : 'A local conversation, when you are ready.';
  const contextDetails = showPracticeName
    ? `${escapeHtml(practice.doctorName)}, ${escapeHtml(practice.credentials)} · ${escapeHtml(practice.address)}`
    : 'The consultation request below is routed directly to the selected local practice.';
  const contactActions = [
    showPhone ? `<a href="tel:${escapeHtml(practice.phoneRaw)}">Call ${escapeHtml(practice.phoneDisplay)}</a>` : '',
    showText ? `<a href="sms:${escapeHtml(practice.textRaw)}">Text the office</a>` : '',
  ].filter(Boolean).join('');
  const contactCard = contactActions ? `<div class="practice-contact-card"><strong>Request a consultation</strong><p>Choose the secure request below, or contact the office directly.</p>${contactActions}</div>` : '';
  const videoHero = campaign.heroVideo ? `<div class="landing-hero-visual" aria-hidden="true"><img class="landing-hero-poster" src="${escapeHtml(campaign.heroPoster || campaign.hero)}" alt=""/><video class="landing-hero-video" autoplay muted loop playsinline preload="metadata" poster="${escapeHtml(campaign.heroPoster || campaign.hero)}"><source src="${escapeHtml(campaign.heroVideo)}" type="video/mp4"/></video></div>` : '';
  const videoBadge = campaign.heroVideo ? '<span class="landing-video-badge"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4.5 6.8A2.3 2.3 0 0 1 6.8 4.5h7.4a2.3 2.3 0 0 1 2.3 2.3v1.1l2.5-1.55a1 1 0 0 1 1.5.85v9.6a1 1 0 0 1-1.5.85l-2.5-1.55v1.1a2.3 2.3 0 0 1-2.3 2.3H6.8a2.3 2.3 0 0 1-2.3-2.3V6.8Z" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linejoin="round"/></svg>Video background</span>' : '';
  const heroClass = campaign.heroVideo ? 'landing-hero landing-hero-video-enabled' : 'landing-hero';
  const body = `<div class="landing-v3 landing-${escapeHtml(campaign.designSystem || 'night-to-clarity')}">
    <section class="${heroClass}" style="--hero-image:url('${escapeHtml(campaign.hero)}')">
      ${videoHero}
      <div class="landing-hero-scrim"></div>
      <div class="landing-container landing-hero-content">
        <div class="landing-hero-meta"><p class="landing-eyebrow">${escapeHtml(campaign.eyebrow || 'Night-to-Clarity')}${showPracticeName ? ` · ${escapeHtml(practice.campaignDestination)}` : ''}</p>${videoBadge}</div>
        <h1>${escapeHtml(campaign.headline)}</h1>
        <p class="landing-lede">${escapeHtml(campaign.subheadline)}</p>
        <div class="landing-actions">${heroActions}</div>
        <p class="landing-microcopy">${microcopy}</p>
      </div>
    </section>
    <section class="recognition-section" id="signals">
      <div class="landing-container recognition-layout">
        <div><p class="landing-eyebrow landing-eyebrow-dark">Recognition first</p><h2>${escapeHtml(campaign.recognitionTitle || 'Start with the signs you recognize.')}</h2><p>Sleep symptoms can have more than one cause. Recognizing a pattern is a reason to begin a conversation, not a diagnosis.</p></div>
        <div class="signal-list">${renderRecognition(campaign.recognition || [])}</div>
      </div>
    </section>
    <section class="practice-context">
      <div class="landing-container practice-context-grid"><div><p class="landing-eyebrow">${showPracticeName ? 'Your selected local destination' : 'A local next step'}</p><h2>${contextTitle}</h2><p>${contextDetails}</p><p>${localityLine}</p></div>${contactCard}</div>
    </section>
    ${renderSurvey(practice)}
    <section class="landing-disclaimer"><div class="landing-container">This page provides general symptom-awareness information. It does not provide medical advice, a diagnosis, treatment recommendations, or emergency services. If you are experiencing an emergency, call 911 or seek immediate local care.</div></section>
  </div>`;

  return layout({
    title: showPracticeName ? `${campaign.headline} — ${practice.publicName}` : `${campaign.headline} — Local consultation request`,
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
