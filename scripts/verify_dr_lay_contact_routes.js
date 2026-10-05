/*
 * Verify Dr. Lay/Pantego contact routing across every affected public family.
 * Usage: node scripts/verify_dr_lay_contact_routes.js [base-url]
 */
const { getAllRoutes } = require('../src/data');
const { getCampaigns } = require('../src/data/campaigns');
const { getDoctorPageSetRoutes } = require('../src/data/doctor-page-sets');

const baseUrl = (process.argv[2] || 'http://127.0.0.1:8097').replace(/\/$/, '');
const DISPLAY = '(817) 670-8968';
const RAW = '8176708968';
const OLD_DISPLAY = '(817) 274-1825';
const OLD_RAW = '8172741825';

function routesForDrLay() {
  const routes = new Set([
    '/find-a-provider',
    '/care/pantego-dental',
    '/care/pantego-dental/privacy',
    '/care/pantego-dental/terms',
    '/care/pantego-dental/accessibility',
    ...getAllRoutes().filter((route) => route.doctorSlug === 'dr-lay').map((route) => route.path),
    ...getDoctorPageSetRoutes('pantego-dental').map((route) => route.path),
  ]);

  for (const campaign of getCampaigns()) {
    const root = `/go/pantego-dental/${campaign.key}`;
    routes.add(root);
    routes.add(`${root}/thank-you`);
    routes.add(`${root}/not-qualified`);
  }
  return [...routes];
}

async function verify() {
  const routes = routesForDrLay();
  const failures = [];
  const concurrency = 20;
  let cursor = 0;

  async function worker() {
    while (cursor < routes.length) {
      const route = routes[cursor++];
      try {
        const response = await fetch(`${baseUrl}${route}`);
        const html = await response.text();
        const missing = [];
        if (!response.ok) missing.push(`expected HTTP 200, received ${response.status}`);
        if (html.includes(OLD_DISPLAY) || html.includes(OLD_RAW)) missing.push('contains a retired Dr. Lay number');
        const isPolicy = route.startsWith('/care/pantego-dental/');
        const isTermsPolicy = route === '/care/pantego-dental/terms';
        const hasTextAction = !isPolicy && route !== '/find-a-provider';
        if (!isTermsPolicy && !html.includes(DISPLAY)) missing.push(`missing display number ${DISPLAY}`);
        if (!isPolicy && !html.includes(`href="tel:${RAW}"`)) missing.push(`missing Call target tel:${RAW}`);
        if (hasTextAction && !html.includes(`href="sms:${RAW}"`)) missing.push(`missing Text target sms:${RAW}`);
        if (missing.length) failures.push({ route, error: missing.join('; ') });
      } catch (error) {
        failures.push({ route, error: error.message });
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));
  if (failures.length) {
    console.error(JSON.stringify(failures, null, 2));
    process.exit(1);
  }
  console.log(`PASS: ${routes.length} Dr. Lay/Pantego routes show ${DISPLAY}, route Call/Text actions to ${RAW}, and contain no retired contact number.`);
}

verify().catch((error) => {
  console.error(error);
  process.exit(1);
});
