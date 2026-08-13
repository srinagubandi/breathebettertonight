/*
 * Verify every generated route without relying on a browser.
 * Usage: node scripts/verify_generated_routes.js [base-url]
 */
const { getAllRoutes } = require('../src/data');

const baseUrl = process.argv[2] || 'http://127.0.0.1:8092';
const forbiddenMarkers = ['ghl-form', 'gohighlevel', 'consultation form'];

async function verify() {
  const routes = getAllRoutes();
  const failures = [];

  for (const route of routes) {
    const response = await fetch(`${baseUrl}${route.path}`, { redirect: 'manual' });
    const html = await response.text();
    const forbidden = forbiddenMarkers.find((marker) => html.toLowerCase().includes(marker));

    if (!response.ok || forbidden) {
      failures.push({ path: route.path, status: response.status, forbidden });
    }
  }

  console.log(`Checked ${routes.length} generated routes at ${baseUrl}.`);
  if (failures.length) {
    console.error(JSON.stringify(failures, null, 2));
    process.exit(1);
  }
  console.log('PASS: every generated route returned 200 and contained no removed survey placeholder.');
}

verify().catch((error) => {
  console.error(error);
  process.exit(1);
});
