/**
 * BreatheBetterTonight.com — Express Server
 * ═══════════════════════════════════════════════════════════════
 * Routes are auto-generated from doctor config files.
 * To add a doctor: create src/data/dr-[slug].js and register
 * it in src/data/index.js. No changes needed here.
 * ═══════════════════════════════════════════════════════════════
 */

require('dotenv').config();

const express = require('express');
const path    = require('path');

const { getAllRoutes, getDoctorBySlug } = require('./src/data/index');
const { renderLP }    = require('./src/pages/lp/template');
const { renderTY }    = require('./src/pages/ty/template');
const { renderTYBT }  = require('./src/pages/ty-bt/template');
const { renderAdmin } = require('./src/pages/admin/template');
const { ADMIN_CONCEPT_FILES } = require('./src/data/admin-concepts');
const { getCampaign } = require('./src/data/campaigns');
const { getPractice, getPractices, setPracticeOverrideProvider } = require('./src/data/practices');
const { getDoctorPageSet } = require('./src/data/doctor-page-sets');
const { renderLandingPage } = require('./src/pages/landing-pages/template');
const { renderOutcome } = require('./src/pages/outcomes/template');
const { renderPracticePolicy } = require('./src/pages/policies/template');
const {
  getPracticeConfigStorage,
  getPracticeOverrides,
  getPracticeDrafts,
  getPracticeHistory,
  updatePracticeOverride,
  savePracticeDraft,
  discardPracticeDraft,
  publishPracticeDraft,
  restorePracticeHistory,
  applyBulkDisplayUpdate,
} = require('./src/lib/practice-config');
const { buildAdminWorkspaceData } = require('./src/lib/admin-workspace');
const {
  findProviderPage,
  homePage: nightToClarityHomePage,
  practicePage,
  sleepApneaPage,
  sleepCheckPage,
} = require('./src/pages/site/night-to-clarity');
const {
  aboutPage,
  contactPage,
  faqPage,
  homePage,
  privacyPage: sitePrivacyPage,
  symptomPage,
  thankYouPage,
  termsPage: siteTermsPage,
} = require('./src/pages/site/template');
const {
  createLead,
  getLeadSummary,
  getStorageState,
  listLeads,
  updateLeadStatus,
} = require('./src/lib/leads');
const crypto = require('crypto');

setPracticeOverrideProvider(getPracticeOverrides);

const app  = express();
const PORT = process.env.PORT || 8080;

app.disable('x-powered-by');
app.use((req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.set('X-Frame-Options', 'SAMEORIGIN');
  return next();
});
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
// Preserve static assets while allowing Express to render the new homepage.
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// ── Static pages ─────────────────────────────────────────────
app.get('/privacy-policy', (req, res) => {
  res.send(sitePrivacyPage());
});
app.get('/terms-and-conditions', (req, res) => {
  res.send(siteTermsPage());
});
// Keep the legacy URL valid while all shared footers use the canonical path.
app.get('/terms', (req, res) => {
  res.redirect(301, '/terms-and-conditions');
});
app.get('/accessibility', (req, res) => {
  res.send(legalShell('Accessibility Statement', '<h1>Accessibility Statement</h1><p>Breathe Better Tonight aims to provide readable, keyboard-accessible patient information and clear routes to participating practices. If you have difficulty using this site, contact the selected practice by phone for assistance with a consultation request.</p><h2>Embedded consultation forms</h2><p>Practice consultation forms are provided by a third-party intake platform. If you need an alternative way to request a conversation, use the visible office phone number on the selected practice page.</p>'));
});

// ── Admin area (Basic Auth protected) ────────────────────────
function secureEquals(received, expected) {
  const receivedBuffer = Buffer.from(String(received || ''));
  const expectedBuffer = Buffer.from(String(expected || ''));
  return receivedBuffer.length === expectedBuffer.length
    && crypto.timingSafeEqual(receivedBuffer, expectedBuffer);
}

function requireAdmin(req, res, next) {
  const adminUser = process.env.ADMIN_USER || '';
  const adminPass = process.env.ADMIN_PASS || '';
  if (!adminUser || !adminPass || adminPass === 'changeme') {
    return res.status(503).send('Admin access has not been securely configured.');
  }
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="BBT Admin"');
    return res.status(401).send('Authentication required.');
  }
  const [user, ...passwordParts] = Buffer.from(auth.slice(6), 'base64').toString().split(':');
  const pass = passwordParts.join(':');
  if (!secureEquals(user, adminUser) || !secureEquals(pass, adminPass)) {
    res.set('WWW-Authenticate', 'Basic realm="BBT Admin"');
    return res.status(401).send('Invalid credentials.');
  }
  res.set('Cache-Control', 'no-store');
  return next();
}

function isSameOrigin(req) {
  const origin = req.get('origin');
  return !origin || origin === `${req.protocol}://${req.get('host')}`;
}

function adminInput({ configErrors = {}, adminNotice = '', adminError = '' } = {}) {
  const leads = listLeads();
  const practices = getPractices();
  const drafts = getPracticeDrafts();
  const history = getPracticeHistory();
  return {
    leads,
    summary: getLeadSummary(leads),
    storage: getStorageState(),
    practices,
    configStorage: getPracticeConfigStorage(),
    configErrors,
    adminNotice,
    adminError,
    workspace: buildAdminWorkspaceData({ practices, leads, drafts, history }),
  };
}

function applyAdminReviewPreset(html, preset) {
  const presets = {
    video: {
      label: 'Video LP review',
      note: 'Saved review view: Page Index is limited to routes with a supplied video-background treatment.',
      css: '.admin-review-video [data-index-row][data-video="false"]{display:none!important}',
    },
    campaigns: {
      label: 'Campaign operations',
      note: 'Saved review view: start with the campaign matrix, then review the complete Page Index below.',
      css: '',
    },
    readiness: {
      label: 'Launch readiness',
      note: 'Saved review view: use the practice launch checklist before changing public configuration.',
      css: '',
    },
  };
  const selected = presets[preset];
  const presetLinks = `<span class="saved-view-links"><a href="/admin?view=video#page-index">Video review</a><a href="/admin?view=campaigns#campaign-matrix">Campaign review</a><a href="/admin?view=readiness#launch-readiness">Readiness review</a></span>`;
  let output = html.replace('</nav>', `${presetLinks}</nav>`)
    .replace('</style>', '.saved-view-links{display:inline-flex;gap:7px;align-items:center;margin-left:auto}.saved-view-links a{padding:7px 9px;border:1px dashed #8ab7ae;background:#f7fffc;color:#17614f;font-size:.7rem;text-decoration:none}.saved-view-note{margin:-5px 0 20px;padding:11px 14px;border-left:3px solid #0b776c;background:#eaf8f5;color:#315f58;font-size:.8rem}</style>');
  if (!selected) return output;
  output = output.replace('<body>', `<body class="admin-review-${preset}">`);
  output = output.replace('</style>', `${selected.css}</style>`);
  if (preset === 'video') output = output.replace('id="index-video" type="checkbox"', 'id="index-video" type="checkbox" checked');
  return output.replace('<section class="card page-index"', `<p class="saved-view-note"><strong>${selected.label}:</strong> ${selected.note}</p><section class="card page-index"`);
}

app.get('/admin', requireAdmin, (req, res) => {
  try {
    const html = renderAdmin(adminInput({ adminNotice: String(req.query.notice || '') }));
    res.send(applyAdminReviewPreset(html, String(req.query.view || '')));
  } catch (error) {
    console.error('Admin lead-store error:', error.message);
    res.status(503).send('The lead dashboard is temporarily unavailable.');
  }
});

// Concept references are review-only assets. They are served only after the
// admin middleware succeeds and have no public navigation path.
app.get('/admin/concepts/:asset', requireAdmin, (req, res) => {
  const asset = String(req.params.asset || '');
  if (!ADMIN_CONCEPT_FILES.has(asset)) return res.status(404).send('Concept reference not found.');
  return res.sendFile(path.join(__dirname, 'admin-assets', 'concepts', asset), {
    headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
  }, (error) => {
    if (error && !res.headersSent) res.status(error.statusCode || 404).send('Concept reference unavailable.');
  });
});

app.post('/admin/leads/:id/status', requireAdmin, (req, res) => {
  if (!isSameOrigin(req)) return res.status(403).send('Invalid request origin.');
  const updated = updateLeadStatus(req.params.id, req.body.status);
  if (!updated) return res.status(400).send('Unable to update that lead.');
  return res.redirect(303, '/admin');
});

app.post('/admin/practices/:key', requireAdmin, (req, res) => {
  if (!isSameOrigin(req)) return res.status(403).send('Invalid request origin.');
  const practice = getPractice(req.params.key);
  if (!practice) return res.status(404).send('Practice not found.');
  try {
    const result = updatePracticeOverride(practice.key, req.body, practice);
    if (!result.updated) return res.status(422).send(renderAdmin(adminInput({ configErrors: { [practice.key]: result.errors } })));
    return res.redirect(303, '/admin?notice=Published+live+practice+configuration.#practice-config');
  } catch (error) {
    console.error('Practice configuration error:', error.message);
    return res.status(503).send('The practice configuration could not be saved.');
  }
});

app.post('/admin/practices/:key/draft', requireAdmin, (req, res) => {
  if (!isSameOrigin(req)) return res.status(403).send('Invalid request origin.');
  const practice = getPractice(req.params.key);
  if (!practice) return res.status(404).send('Practice not found.');
  try {
    const result = savePracticeDraft(practice.key, req.body, practice);
    if (!result.updated) return res.status(422).send(renderAdmin(adminInput({ configErrors: { [practice.key]: result.errors } })));
    return res.redirect(303, `/admin?notice=Saved+draft+for+${encodeURIComponent(practice.campaignDestination)}.#practice-${practice.key}`);
  } catch (error) {
    console.error('Practice draft error:', error.message);
    return res.status(503).send('The practice draft could not be saved.');
  }
});

app.post('/admin/practices/:key/draft/discard', requireAdmin, (req, res) => {
  if (!isSameOrigin(req)) return res.status(403).send('Invalid request origin.');
  if (!discardPracticeDraft(req.params.key)) return res.status(404).send('No draft was available to discard.');
  return res.redirect(303, '/admin?notice=Discarded+practice+draft.#practice-config');
});

app.post('/admin/practices/:key/draft/publish', requireAdmin, (req, res) => {
  if (!isSameOrigin(req)) return res.status(403).send('Invalid request origin.');
  const result = publishPracticeDraft(req.params.key);
  if (!result.updated) return res.status(422).send(result.reason);
  return res.redirect(303, '/admin?notice=Published+reviewed+draft.#practice-config');
});

app.post('/admin/practices/:key/history/:id/restore', requireAdmin, (req, res) => {
  if (!isSameOrigin(req)) return res.status(403).send('Invalid request origin.');
  if (req.body.confirmScope !== 'RESTORE') return res.status(422).send('Type RESTORE to confirm a saved configuration restore.');
  const result = restorePracticeHistory(req.params.key, req.params.id);
  if (!result.updated) return res.status(422).send(result.reason);
  return res.redirect(303, '/admin?notice=Restored+saved+configuration+version.#configuration-history');
});

app.post('/admin/bulk/visibility', requireAdmin, (req, res) => {
  if (!isSameOrigin(req)) return res.status(403).send('Invalid request origin.');
  if (req.body.confirmScope !== 'APPLY') return res.status(422).send('Type APPLY to confirm the selected bulk visibility change.');
  const selected = Array.isArray(req.body.practiceKeys) ? req.body.practiceKeys : [req.body.practiceKeys].filter(Boolean);
  const validKeys = new Set(getPractices().map((practice) => practice.key));
  const keys = selected.filter((key) => validKeys.has(key));
  const result = applyBulkDisplayUpdate(keys, req.body.field, req.body.value);
  if (!result.updated) return res.status(422).send(result.reason);
  return res.redirect(303, `/admin?notice=Applied+bulk+visibility+change+to+${result.targetCount}+practice(s).#bulk-actions`);
});

app.get('/admin/preview/:practice', requireAdmin, (req, res) => {
  const livePractice = getPractice(req.params.practice);
  const campaign = getCampaign(req.query.campaign);
  if (!livePractice || !campaign) return res.status(404).send('Practice or campaign preview not found.');
  const draft = getPracticeDrafts()[livePractice.key];
  const useDraft = req.query.state === 'draft' && draft;
  const previewPractice = useDraft ? {
    ...livePractice,
    ...draft,
    designAssignments: { ...(livePractice.designAssignments || {}), ...(draft.designAssignments || {}) },
    policyOverrides: { ...(livePractice.policyOverrides || {}), ...(draft.policyOverrides || {}) },
  } : livePractice;
  const selectedCampaign = campaignForPractice(previewPractice, campaign);
  const forceReducedMotion = req.query.motion === 'reduced';
  const banner = `<div class="admin-preview-banner">Admin preview · ${useDraft ? 'draft configuration' : 'live configuration'} · ${forceReducedMotion ? 'reduced motion' : 'standard motion'}</div><style>.admin-preview-banner{position:fixed;z-index:9999;top:0;left:0;right:0;padding:9px 16px;background:#071a2d;color:#fff;font:800 12px/1.2 system-ui,sans-serif;letter-spacing:.08em;text-align:center;text-transform:uppercase}${forceReducedMotion ? '.landing-hero-video{display:none!important}.landing-hero-poster{display:block!important}' : ''}</style>`;
  return res.send(renderLandingPage({ practice: previewPractice, campaign: selectedCampaign }).replace('<body>', `<body>${banner}`));
});

// ── Night-to-Clarity public patient website ──────────────────
app.get('/', (req, res) => res.send(nightToClarityHomePage()));
app.get('/sleep-check', (req, res) => res.send(sleepCheckPage()));
app.get('/symptom-check', (req, res) => res.send(sleepCheckPage()));
app.get('/find-a-provider', (req, res) => res.send(findProviderPage()));
app.get('/sleep-apnea', (req, res) => res.send(sleepApneaPage()));
app.get('/for-professionals', (req, res) => res.redirect(302, 'https://www.propel.dental/'));
app.get('/about', (req, res) => res.send(aboutPage()));
app.get('/faq', (req, res) => res.send(faqPage()));
app.get('/contact', (req, res) => res.send(contactPage()));
app.post('/contact', (req, res) => {
  if (String(req.body.company || '').trim()) return res.status(400).send('Unable to submit this request.');
  try {
    const result = createLead(req.body);
    if (!result.created) return res.status(422).send(contactPage({ values: result.lead, errors: result.errors }));
    return res.redirect(303, '/thank-you');
  } catch (error) {
    console.error('Lead submission error:', error.message);
    return res.status(503).send(contactPage({
      values: req.body,
      errors: { form: 'We could not save your request. Please try again shortly.' },
    }));
  }
});
app.get('/thank-you', (req, res) => res.send(thankYouPage()));

// ── Canonical practice, campaign, outcome, and policy routes ─
app.get('/care/:practice/privacy', (req, res) => {
  const practice = getPractice(req.params.practice);
  return practice ? res.send(renderPracticePolicy(practice, 'privacy')) : res.status(404).send('Practice not found.');
});
app.get('/care/:practice/terms', (req, res) => {
  const practice = getPractice(req.params.practice);
  return practice ? res.send(renderPracticePolicy(practice, 'terms')) : res.status(404).send('Practice not found.');
});
app.get('/care/:practice/accessibility', (req, res) => {
  const practice = getPractice(req.params.practice);
  return practice ? res.send(renderPracticePolicy(practice, 'accessibility')) : res.status(404).send('Practice not found.');
});
app.get('/care/:practice', (req, res) => {
  const practice = getPractice(req.params.practice);
  return practice ? res.send(practicePage(practice)) : res.status(404).send('Practice not found.');
});
function campaignForPractice(practice, campaign) {
  return {
    ...campaign,
    designSystem: practice.designAssignments?.[campaign.key] || campaign.designSystem,
  };
}
app.get('/go/:practice/:campaign/thank-you', (req, res) => {
  const practice = getPractice(req.params.practice);
  const campaign = getCampaign(req.params.campaign);
  return practice && campaign ? res.send(renderOutcome({ practice, campaign: campaignForPractice(practice, campaign), type: 'qualified' })) : res.status(404).send('Landing page not found.');
});
app.get('/go/:practice/:campaign/not-qualified', (req, res) => {
  const practice = getPractice(req.params.practice);
  const campaign = getCampaign(req.params.campaign);
  return practice && campaign ? res.send(renderOutcome({ practice, campaign: campaignForPractice(practice, campaign), type: 'non-qualified' })) : res.status(404).send('Landing page not found.');
});
app.get('/go/:practice/:campaign', (req, res) => {
  const practice = getPractice(req.params.practice);
  const campaign = getCampaign(req.params.campaign);
  return practice && campaign ? res.send(renderLandingPage({ practice, campaign: campaignForPractice(practice, campaign) })) : res.status(404).send('Landing page not found.');
});

// ── Doctor-owned concept and legacy page sets ──────────────────
function getDoctorSetContext(req, res) {
  const practice = getPractice(req.params.practice);
  if (!practice) {
    res.status(404).send('Practice not found.');
    return null;
  }
  const doctor = getDoctorPageSet(practice.key);
  if (!doctor) {
    res.status(404).send('Doctor page set not found.');
    return null;
  }
  return { practice, doctor };
}

function getLegacyContext(req, res) {
  const context = getDoctorSetContext(req, res);
  if (!context) return null;
  const variant = context.doctor.variants[req.params.variant];
  if (!variant) {
    res.status(404).send('Legacy design not found.');
    return null;
  }
  if (req.params.city && !context.doctor.cities.some((city) => city.slug === req.params.city)) {
    res.status(404).send('Locality not found.');
    return null;
  }
  return context;
}

app.get('/lp/:practice/concepts/:concept/thank-you', (req, res) => {
  const practice = getPractice(req.params.practice);
  const concept = getCampaign(req.params.concept);
  return practice && concept ? res.send(renderOutcome({ practice, campaign: campaignForPractice(practice, concept), type: 'qualified' })) : res.status(404).send('Concept page not found.');
});
app.get('/lp/:practice/concepts/:concept/not-qualified', (req, res) => {
  const practice = getPractice(req.params.practice);
  const concept = getCampaign(req.params.concept);
  return practice && concept ? res.send(renderOutcome({ practice, campaign: campaignForPractice(practice, concept), type: 'non-qualified' })) : res.status(404).send('Concept page not found.');
});
app.get('/lp/:practice/concepts/:concept', (req, res) => {
  const practice = getPractice(req.params.practice);
  const concept = getCampaign(req.params.concept);
  return practice && concept ? res.send(renderLandingPage({ practice, campaign: campaignForPractice(practice, concept) })) : res.status(404).send('Concept page not found.');
});

app.get('/lp/:practice/legacy/:variant/:city/thank-you', (req, res) => {
  const context = getLegacyContext(req, res);
  return context && res.send(renderTY(context.doctor, req.params.variant, req.params.city, context.practice));
});
app.get('/lp/:practice/legacy/:variant/:city/not-qualified', (req, res) => {
  const context = getLegacyContext(req, res);
  return context && res.send(renderTYBT(context.doctor, req.params.variant, req.params.city, context.practice));
});
app.get('/lp/:practice/legacy/:variant/thank-you', (req, res) => {
  const context = getLegacyContext(req, res);
  return context && res.send(renderTY(context.doctor, req.params.variant, null, context.practice));
});
app.get('/lp/:practice/legacy/:variant/not-qualified', (req, res) => {
  const context = getLegacyContext(req, res);
  return context && res.send(renderTYBT(context.doctor, req.params.variant, null, context.practice));
});
app.get('/lp/:practice/legacy/:variant/:city', (req, res) => {
  const context = getLegacyContext(req, res);
  return context && res.send(renderLP(context.doctor, req.params.variant, req.params.city, context.practice));
});
app.get('/lp/:practice/legacy/:variant', (req, res) => {
  const context = getLegacyContext(req, res);
  return context && res.send(renderLP(context.doctor, req.params.variant, null, context.practice));
});

// ── Auto-generate all LP / TY / TY-BT routes ─────────────────
// Reads from src/data/index.js — zero manual route registration needed.
const allRoutes = getAllRoutes();

allRoutes.forEach(route => {
  app.get(route.path, (req, res) => {
    const doctor = getDoctorBySlug(route.doctorSlug);
    if (!doctor) return res.status(404).send('Doctor not found.');

    try {
      if (route.type === 'lp') {
        return res.send(renderLP(doctor, route.variantSlug, route.citySlug));
      }
      if (route.type === 'ty') {
        return res.send(renderTY(doctor, route.variantSlug, route.citySlug));
      }
      if (route.type === 'ty-bt') {
        return res.send(renderTYBT(doctor, route.variantSlug, route.citySlug));
      }
    } catch (err) {
      console.error(`Route error [${route.path}]:`, err.message);
      return res.status(500).send('Page error. Please try again.');
    }
  });
});

// ── 404 ───────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).send(`<!DOCTYPE html><html><head><meta charset="UTF-8"/>
  <title>Page Not Found</title>
  <style>body{font-family:sans-serif;background:#0D1B2A;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center;}
  a{color:#00B4C8;}</style></head><body>
  <div><h1>404</h1><p>Page not found.</p><a href="/">Home</a></div></body></html>`);
});

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`BreatheBetterTonight.com running on port ${PORT}`);
  console.log(`Auto-registered ${allRoutes.length} routes from doctor configs.`);
});

// ── Minimal static pages ──────────────────────────────────────
function legalShell(title, body) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${title} — BreatheBetterTonight.com</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet"/>
  <style>body{font-family:Inter,system-ui,sans-serif;max-width:760px;margin:0 auto;padding:52px 24px;color:#28485e;line-height:1.7;background:#fff}h1{color:#0a2944;line-height:1.1;letter-spacing:-.04em}h2{color:#0a2944;margin-top:34px}a{color:#008fa0;font-weight:700}.notice{padding:14px 16px;border-radius:12px;background:#effafb;color:#426a74;font-size:.9rem}</style></head><body>${body}<p><a href="javascript:history.back()">← Back</a></p></body></html>`;
}

function privacyPage() {
  return legalShell('Privacy Policy', `<h1>Privacy Policy</h1><p>Last updated: ${new Date().toLocaleDateString()}</p><p class="notice"><strong>Placeholder policy:</strong> Have this page reviewed and finalized before enabling lead capture, analytics identifiers, or a third-party chat provider.</p><h2>Information this site may use</h2><p>BreatheBetterTonight.com currently provides general symptom-awareness content. When contact forms or chat integrations are enabled, this policy should describe the information collected, the purpose for collection, and how patients can contact the business about privacy questions.</p><h2>Analytics and chat tools</h2><p>This site contains configuration placeholders for analytics and a chat-provider link. Provider-specific privacy disclosures and consent language must be added before those tools are activated.</p><h2>Questions</h2><p>For privacy questions, use <a href="mailto:info@breathebettertonight.com">info@breathebettertonight.com</a>.</p>`);
}

function termsPage() {
  return legalShell('Terms & Conditions', `<h1>Terms &amp; Conditions</h1><p>Last updated: ${new Date().toLocaleDateString()}</p><p class="notice"><strong>Placeholder terms:</strong> Obtain legal review before using this page in a live lead-generation campaign.</p><h2>Informational content only</h2><p>BreatheBetterTonight.com provides general symptom-awareness information. It does not provide medical advice, diagnosis, treatment recommendations, or emergency services.</p><h2>Contact and chat</h2><p>A chat launcher may direct visitors to a future third-party chat provider or to an office phone number. Chat should not be used for emergencies. If you believe you are experiencing an emergency, call 911 or seek immediate local care.</p><h2>Provider relationship</h2><p>Each landing page may reference an independent dental provider. Provider-specific content, credentials, patient reviews, and service claims must be approved before publication.</p>`);
}
