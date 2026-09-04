const { layout } = require('../../shared/layout');
const { escapeHtml } = require('../../shared/escape');

function renderOutcome({ practice, campaign, type, locality = '' }) {
  const qualified = type === 'qualified';
  const showPracticeName = practice.showPracticeName !== false;
  const showPhone = practice.showPhone !== false;
  const showText = practice.showText !== false;
  const title = qualified
    ? `Your ${campaign.navLabel || 'consultation'} request is received.`
    : `A next step for your ${campaign.navLabel || 'sleep'} questions.`;
  const eyebrow = qualified ? 'Request received' : 'Keep the conversation going';
  const description = qualified
    ? `Your request is with ${showPracticeName ? escapeHtml(practice.publicName) : 'your selected local practice'}. The office can follow up using your submitted details.`
    : `This page cannot diagnose a sleep concern. If symptoms continue, ${showPracticeName ? escapeHtml(practice.publicName) : 'a local practice'} can discuss next steps.`;
  const action = qualified && showPhone
    ? `<a class="landing-button landing-button-primary" href="tel:${escapeHtml(practice.phoneRaw)}">Call ${escapeHtml(practice.phoneDisplay)}</a>`
    : `<a class="landing-button landing-button-primary" href="/care/${escapeHtml(practice.key)}">View local options <span aria-hidden="true">→</span></a>`;
  const textAction = showText ? `<a class="landing-button landing-button-secondary" href="sms:${escapeHtml(practice.textRaw)}">Text the office</a>` : '';
  const localityLine = locality ? `Serving ${escapeHtml(locality)}.` : `Serving ${escapeHtml(practice.serviceLabel)}.`;
  const body = `<div class="landing-v3 outcome-v3 landing-${escapeHtml(campaign.designSystem || 'night-to-clarity')}">
    <section class="landing-hero outcome-hero" id="top" style="--hero-image:url('${escapeHtml(campaign.hero)}')"><div class="landing-hero-scrim"></div><div class="landing-container landing-hero-content"><p class="landing-eyebrow">${eyebrow}${showPracticeName ? ` · ${escapeHtml(practice.campaignDestination)}` : ''}</p><div class="outcome-mark" aria-hidden="true">${qualified ? '✓' : 'i'}</div><h1>${title}</h1><p class="landing-lede">${escapeHtml(description)}</p><div class="landing-actions">${action}${textAction}</div></div></section>
    <section class="outcome-path"><div class="landing-container"><p class="landing-eyebrow landing-eyebrow-dark">${escapeHtml(campaign.navLabel || 'Your next step')} · next steps</p><div class="outcome-steps"><article><span>01</span><h2>${qualified ? 'The office reviews your request' : 'Keep noticing the pattern'}</h2><p>${qualified ? `A team member at ${showPracticeName ? escapeHtml(practice.publicName) : 'your selected local practice'} can follow up using your submitted details.` : 'Note changes in rest, energy, or symptoms a partner notices.'}</p></article><article><span>02</span><h2>Ask what matters</h2><p>Discuss your concerns and any appropriate evaluation.</p></article><article><span>03</span><h2>Choose the next step</h2><p>${localityLine} This page does not make a diagnosis or treatment decision.</p></article></div></div></section>
    <section class="landing-disclaimer"><div class="landing-container">General information only—not medical advice, a diagnosis, or emergency care. For emergencies, call 911 or seek local care.</div></section>
  </div>`;
  return layout({ title: `${qualified ? 'Thank You' : 'Helpful Next Step'}${showPracticeName ? ` — ${practice.publicName}` : ''}`, theme: 'v1', designSystem: campaign.designSystem || 'night-to-clarity', body, practice, headerTarget: qualified ? '#top' : `/care/${practice.key}`, policyBase: `/care/${practice.key}`, robots: 'noindex, nofollow' });
}

module.exports = { renderOutcome };
