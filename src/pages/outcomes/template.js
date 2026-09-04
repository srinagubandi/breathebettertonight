const { layout } = require('../../shared/layout');
const { escapeHtml } = require('../../shared/escape');

function renderOutcome({ practice, campaign, type, locality = '' }) {
  const qualified = type === 'qualified';
  const showPracticeName = practice.showPracticeName !== false;
  const showPhone = practice.showPhone !== false;
  const showText = practice.showText !== false;
  const title = qualified
    ? `Your ${campaign.navLabel || 'consultation'} request is on its way.`
    : `A clearer next step for your ${campaign.navLabel || 'sleep'} questions.`;
  const eyebrow = qualified ? 'Request received' : 'Keep the conversation going';
  const description = qualified
    ? `Your ${campaign.navLabel || 'sleep concern'} request is now with ${showPracticeName ? escapeHtml(practice.publicName) : 'your selected local practice'}. The office can follow up using the details you provided.`
    : `A short screen does not determine a diagnosis or treatment path. If sleep concerns continue, ${showPracticeName ? escapeHtml(practice.publicName) : 'a local practice'} can help you discuss an appropriate next step.`;
  const action = qualified && showPhone
    ? `<a class="landing-button landing-button-primary" href="tel:${escapeHtml(practice.phoneRaw)}">Call ${escapeHtml(practice.phoneDisplay)}</a>`
    : `<a class="landing-button landing-button-primary" href="/care/${escapeHtml(practice.key)}">Explore your local options <span aria-hidden="true">→</span></a>`;
  const textAction = showText ? `<a class="landing-button landing-button-secondary" href="sms:${escapeHtml(practice.textRaw)}">Text the office</a>` : '';
  const localityLine = locality ? `Serving ${escapeHtml(locality)}.` : `Serving ${escapeHtml(practice.serviceLabel)}.`;
  const body = `<div class="landing-v3 outcome-v3 landing-${escapeHtml(campaign.designSystem || 'night-to-clarity')}">
    <section class="landing-hero outcome-hero" id="top" style="--hero-image:url('${escapeHtml(campaign.hero)}')"><div class="landing-hero-scrim"></div><div class="landing-container landing-hero-content"><p class="landing-eyebrow">${eyebrow}${showPracticeName ? ` · ${escapeHtml(practice.campaignDestination)}` : ''}</p><div class="outcome-mark" aria-hidden="true">${qualified ? '✓' : 'i'}</div><h1>${title}</h1><p class="landing-lede">${escapeHtml(description)}</p><div class="landing-actions">${action}${textAction}</div></div></section>
    <section class="outcome-path"><div class="landing-container"><p class="landing-eyebrow landing-eyebrow-dark">${escapeHtml(campaign.navLabel || 'Your next step')} · what happens next</p><div class="outcome-steps"><article><span>01</span><h2>${qualified ? 'The office reviews your request' : 'Keep noticing the pattern'}</h2><p>${qualified ? `A team member at ${showPracticeName ? escapeHtml(practice.publicName) : 'your selected local practice'} can follow up through the contact information submitted in the consultation request.` : 'Changes in rest, energy, or partner-observed symptoms can be useful to describe in a future conversation.'}</p></article><article><span>02</span><h2>Ask the questions that matter</h2><p>Talk through your concerns, any appropriate evaluation pathway, and what you would like to understand next.</p></article><article><span>03</span><h2>Choose a practical next step</h2><p>${localityLine} No treatment decision or diagnosis is made by this page.</p></article></div></div></section>
    <section class="landing-disclaimer"><div class="landing-container">This page is for general information only and is not medical advice, a diagnosis, or emergency care. If you are experiencing an emergency, call 911 or seek immediate local care.</div></section>
  </div>`;
  return layout({ title: `${qualified ? 'Thank You' : 'Helpful Next Step'}${showPracticeName ? ` — ${practice.publicName}` : ''}`, theme: 'v1', designSystem: campaign.designSystem || 'night-to-clarity', body, practice, headerTarget: qualified ? '#top' : `/care/${practice.key}`, policyBase: `/care/${practice.key}`, robots: 'noindex, nofollow' });
}

module.exports = { renderOutcome };
