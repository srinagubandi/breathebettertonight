const { escapeHtml } = require('../../shared/escape');

function policyShell({ title, practice, body }) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta name="robots" content="index,follow"/><title>${escapeHtml(title)} — ${escapeHtml(practice.publicName)}</title><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,600;9..144,700&display=swap" rel="stylesheet"/><link rel="stylesheet" href="/assets/css/site.css"/></head><body><main class="policy-v3"><div class="site-container narrow"><a class="back-link" href="/care/${escapeHtml(practice.key)}">← Back to ${escapeHtml(practice.publicName)}</a><p class="eyebrow">Practice information</p><h1>${escapeHtml(title)}</h1><p class="policy-practice">Applies to consultation requests routed to ${escapeHtml(practice.publicName)}.</p>${body}<p class="policy-updated">Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p></div></main></body></html>`;
}

function renderPracticePolicy(practice, kind) {
  const override = practice.policyOverrides?.[kind];
  const copy = {
    privacy: `<h2>Information in a consultation request</h2><p>The embedded consultation form is provided by the practice’s configured intake platform. Please avoid submitting detailed medical, insurance, or other sensitive information unless the practice’s own secure process asks for it.</p><h2>How information is used</h2><p>Information submitted through the consultation request is used by ${escapeHtml(practice.publicName)} to respond to the request and coordinate an appropriate next conversation. Breathe Better Tonight does not use the page to diagnose or treat a condition.</p><h2>Questions</h2><p>For questions about a consultation request or this notice, contact ${escapeHtml(practice.publicName)} at ${escapeHtml(practice.phoneDisplay)}.</p>`,
    terms: `<h2>Informational purpose</h2><p>This page provides general symptom-awareness information. It does not provide medical advice, diagnosis, treatment recommendations, or emergency services.</p><h2>Independent practice relationship</h2><p>${escapeHtml(practice.publicName)} is responsible for its own clinical services, communications, scheduling, and patient care. A consultation request does not create a patient-provider relationship.</p><h2>Emergency use</h2><p>Do not use this page or its consultation form for urgent or emergency needs. Call 911 or seek immediate local care if you believe you are experiencing an emergency.</p>`,
    accessibility: `<h2>Our accessibility commitment</h2><p>We aim to make this information and consultation route usable with keyboards, screen readers, zoom, and common mobile assistive technologies.</p><h2>Need help?</h2><p>If you have difficulty using this page, call ${escapeHtml(practice.phoneDisplay)} and ask for assistance with the consultation process.</p><h2>Embedded forms</h2><p>The consultation form is provided by a third-party platform. If you need an alternative format or cannot complete the form, contact the office by phone.</p>`,
  };
  const titles = { privacy: 'Privacy Notice', terms: 'Terms & Conditions', accessibility: 'Accessibility Statement' };
  const body = override
    ? `<div class="practice-policy-override">${escapeHtml(override).split('\n').map((line) => `<p>${line}</p>`).join('')}</div>`
    : copy[kind];
  return policyShell({ title: titles[kind], practice, body });
}

module.exports = { renderPracticePolicy };
