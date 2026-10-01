/*
 * Verify the supplied OpenPanel browser snippet is installed once in every
 * rendered document shell. Usage: node scripts/verify_openpanel_install.js [base-url]
 */
const { getAllRoutes } = require('../src/data');
const { getPractices } = require('../src/data/practices');
const { getCampaigns } = require('../src/data/campaigns');
const { getDoctorPageSetRoutes } = require('../src/data/doctor-page-sets');
const { renderAdmin } = require('../src/pages/admin/template');
const { OPENPANEL_CLIENT_ID } = require('../src/shared/openpanel');

const baseUrl = (process.argv[2] || 'http://127.0.0.1:8096').replace(/\/$/, '');

function occurrenceCount(value, needle) {
  return value.split(needle).length - 1;
}

function assertOpenPanel(html, label) {
  const headSnippet = '<!-- OpenPanel Analytics -->';
  const headEnd = html.indexOf('</head>');
  const errors = [];

  if (headEnd < 0 || html.indexOf(headSnippet) < 0 || html.indexOf(headSnippet) > headEnd) {
    errors.push('missing OpenPanel snippet before </head>');
  }
  if (occurrenceCount(html, OPENPANEL_CLIENT_ID) !== 1) {
    errors.push('OpenPanel client ID must appear exactly once');
  }
  if (occurrenceCount(html, 'https://openpanel.dev/op1.js') !== 1) {
    errors.push('OpenPanel loader must appear exactly once');
  }
  for (const setting of ['trackScreenViews: true', 'trackOutgoingLinks: true', 'trackAttributes: true']) {
    if (!html.includes(setting)) errors.push(`missing ${setting}`);
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
        assertOpenPanel(html, route);
      } catch (error) {
        failures.push({ route, error: error.message });
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));
  try {
    assertOpenPanel(renderAdmin(), 'protected admin template');
  } catch (error) {
    failures.push({ route: 'protected admin template', error: error.message });
  }

  if (failures.length) {
    console.error(JSON.stringify(failures, null, 2));
    process.exit(1);
  }
  console.log(`PASS: OpenPanel ${OPENPANEL_CLIENT_ID} appears exactly once across ${routes.length} public routes plus the protected admin template.`);
}

verify().catch((error) => {
  console.error(error);
  process.exit(1);
});
