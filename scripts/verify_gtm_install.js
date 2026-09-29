/*
 * Verify the supplied GTM container is installed once in every document shell.
 * Usage: node scripts/verify_gtm_install.js [base-url]
 */
const { getAllRoutes } = require('../src/data');
const { getPractices } = require('../src/data/practices');
const { getCampaigns } = require('../src/data/campaigns');
const { getDoctorPageSetRoutes } = require('../src/data/doctor-page-sets');
const { renderAdmin } = require('../src/pages/admin/template');
const { GTM_CONTAINER_ID } = require('../src/shared/google-tag-manager');

const baseUrl = (process.argv[2] || 'http://127.0.0.1:8094').replace(/\/$/, '');

function occurrenceCount(value, needle) {
  return value.split(needle).length - 1;
}

function assertGtm(html, label) {
  const headSnippet = '<!-- Google Tag Manager -->';
  const bodySnippet = '<!-- Google Tag Manager (noscript) -->';
  const headEnd = html.indexOf('</head>');
  const bodyStart = html.indexOf('<body');
  const bodyTagEnd = bodyStart < 0 ? -1 : html.indexOf('>', bodyStart);
  const errors = [];

  if (headEnd < 0 || html.indexOf(headSnippet) < 0 || html.indexOf(headSnippet) > headEnd) {
    errors.push('missing GTM head snippet before </head>');
  }
  const bodySnippetStart = html.indexOf(bodySnippet);
  if (bodyTagEnd < 0 || bodySnippetStart < bodyTagEnd || html.slice(bodyTagEnd + 1, bodySnippetStart).trim()) {
    errors.push('missing GTM noscript fallback immediately after <body>');
  }
  if (occurrenceCount(html, `GTM-${GTM_CONTAINER_ID.replace('GTM-', '')}`) !== 2) {
    errors.push('container ID must appear exactly twice');
  }
  if (occurrenceCount(html, 'googletagmanager.com/gtm.js') !== 1) {
    errors.push('GTM script must appear exactly once');
  }
  if (occurrenceCount(html, 'googletagmanager.com/ns.html') !== 1) {
    errors.push('GTM noscript iframe must appear exactly once');
  }
  if (errors.length) throw new Error(`${label}: ${errors.join('; ')}`);
}

function allPublicRoutes() {
  const routes = new Set([
    '/', '/sleep-check', '/symptom-check', '/find-a-provider', '/sleep-apnea', '/about', '/faq',
    '/contact', '/thank-you', '/privacy-policy', '/terms-and-conditions', '/accessibility',
    '/index.html', '/this-route-does-not-exist',
    ...getAllRoutes().map((route) => route.path),
  ]);

  for (const practice of getPractices()) {
    routes.add(`/care/${practice.key}`);
    for (const kind of ['privacy', 'terms', 'accessibility']) routes.add(`/care/${practice.key}/${kind}`);
    for (const campaign of getCampaigns()) {
      const root = `/go/${practice.key}/${campaign.key}`;
      routes.add(root);
      routes.add(`${root}/thank-you`);
      routes.add(`${root}/not-qualified`);
    }
    for (const route of getDoctorPageSetRoutes(practice.key)) routes.add(route.path);
  }
  return [...routes];
}

async function verify() {
  const routes = allPublicRoutes();
  const failures = [];
  const concurrency = 20;
  let cursor = 0;

  async function worker() {
    while (cursor < routes.length) {
      const route = routes[cursor++];
      try {
        const response = await fetch(`${baseUrl}${route}`);
        const html = await response.text();
        if (route !== '/this-route-does-not-exist' && !response.ok) throw new Error(`HTTP ${response.status}`);
        if (route === '/this-route-does-not-exist' && response.status !== 404) throw new Error(`expected 404, received ${response.status}`);
        assertGtm(html, route);
      } catch (error) {
        failures.push({ route, error: error.message });
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));
  try {
    assertGtm(renderAdmin(), 'protected admin template');
  } catch (error) {
    failures.push({ route: 'protected admin template', error: error.message });
  }

  if (failures.length) {
    console.error(JSON.stringify(failures, null, 2));
    process.exit(1);
  }
  console.log(`PASS: GTM ${GTM_CONTAINER_ID} appears exactly once per head and body across ${routes.length} public routes plus the protected admin template.`);
}

verify().catch((error) => {
  console.error(error);
  process.exit(1);
});
