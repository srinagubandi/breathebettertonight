/*
 * Verify the supplied OpenReplay snippet is installed exactly once in each
 * public HTML document and is absent from protected admin responses.
 * Usage: node scripts/verify_openreplay_install.js [base-url]
 */
const { getAllRoutes } = require('../src/data');
const { getPractices } = require('../src/data/practices');
const { getCampaigns } = require('../src/data/campaigns');
const { getDoctorPageSetRoutes } = require('../src/data/doctor-page-sets');
const { renderAdmin } = require('../src/pages/admin/template');
const { OPENREPLAY_PROJECT_KEY } = require('../src/shared/openreplay');

const baseUrl = (process.argv[2] || 'http://127.0.0.1:8098').replace(/\/$/, '');
const adminAuth = `Basic ${Buffer.from(`${process.env.OPENREPLAY_QA_ADMIN_USER || 'openreplay-qa'}:${process.env.OPENREPLAY_QA_ADMIN_PASS || 'openreplay-qa-password'}`).toString('base64')}`;
const snippet = '<!-- OpenReplay Tracking Code for my first project -->';
const loader = '//static.openreplay.com/latest/openreplay.js';

function count(value, needle) {
  return value.split(needle).length - 1;
}

function assertOpenReplay(html, label) {
  const headEnd = html.indexOf('</head>');
  const errors = [];
  if (headEnd < 0 || html.indexOf(snippet) < 0 || html.indexOf(snippet) > headEnd) {
    errors.push('missing OpenReplay snippet before </head>');
  }
  if (count(html, snippet) !== 1) errors.push('OpenReplay marker must appear exactly once');
  if (count(html, OPENREPLAY_PROJECT_KEY) !== 1) errors.push('OpenReplay project key must appear exactly once');
  if (count(html, loader) !== 1) errors.push('OpenReplay loader must appear exactly once');
  for (const setting of ['defaultInputMode: 2', 'obscureTextNumbers: false', 'obscureTextEmails: true']) {
    if (!html.includes(setting)) errors.push(`missing ${setting}`);
  }
  if (errors.length) throw new Error(`${label}: ${errors.join('; ')}`);
}

function assertNoOpenReplay(body, label) {
  const markers = [snippet, OPENREPLAY_PROJECT_KEY, loader].filter((marker) => body.includes(marker));
  if (markers.length) throw new Error(`${label}: OpenReplay marker found in protected or non-document response`);
}

function allPublicRoutes() {
  const routes = new Set([
    '/', '/sleep-check', '/symptom-check', '/find-a-provider', '/sleep-apnea', '/about', '/faq',
    '/contact', '/thank-you', '/privacy-policy', '/terms-and-conditions', '/terms', '/accessibility',
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

async function verifyPublicRoutes() {
  const routes = allPublicRoutes();
  const failures = [];
  let cursor = 0;
  const workers = Array.from({ length: 20 }, async () => {
    while (cursor < routes.length) {
      const route = routes[cursor++];
      try {
        const response = await fetch(`${baseUrl}${route}`);
        const html = await response.text();
        if (route === '/this-route-does-not-exist') {
          if (response.status !== 404) throw new Error(`expected HTTP 404, received ${response.status}`);
        } else if (!response.ok) {
          throw new Error(`expected HTTP 200, received ${response.status}`);
        }
        if (route === '/terms' && !response.url.endsWith('/terms-and-conditions')) {
          throw new Error(`expected redirect to /terms-and-conditions, received ${response.url}`);
        }
        assertOpenReplay(html, route);
      } catch (error) {
        failures.push({ route, error: error.message });
      }
    }
  });
  await Promise.all(workers);
  if (failures.length) throw new Error(JSON.stringify(failures, null, 2));
  return routes.length;
}

async function verifyProtectedResponses() {
  assertNoOpenReplay(renderAdmin(), 'renderAdmin template');
  const checks = [
    ['unauthenticated admin', '/admin', {}, 401],
    ['authenticated admin', '/admin', { Authorization: adminAuth }, 200],
    ['authenticated admin preview', '/admin/preview/pantego-dental?campaign=sleep-symptom-check', { Authorization: adminAuth }, 200],
    ['invalid admin update', '/admin/practices/pantego-dental', {
      Authorization: adminAuth,
      'Content-Type': 'application/x-www-form-urlencoded',
    }, 422, 'POST', 'phoneRaw=1&textRaw=1'],
    ['invalid public practice', '/care/not-a-practice', {}, 404],
    ['invalid public campaign', '/go/not-a-practice/not-a-campaign', {}, 404],
  ];
  for (const [label, route, headers, expectedStatus, method = 'GET', body] of checks) {
    const response = await fetch(`${baseUrl}${route}`, { method, headers, body, redirect: 'manual' });
    const text = await response.text();
    if (response.status !== expectedStatus) throw new Error(`${label}: expected HTTP ${expectedStatus}, received ${response.status}`);
    assertNoOpenReplay(text, label);
  }
}

(async () => {
  const publicRouteCount = await verifyPublicRoutes();
  await verifyProtectedResponses();
  console.log(`PASS: OpenReplay ${OPENREPLAY_PROJECT_KEY} appears exactly once across ${publicRouteCount} public documents and is absent from protected admin responses and previews.`);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
