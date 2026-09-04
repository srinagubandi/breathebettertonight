#!/usr/bin/env node
/** Verify each active practice exposes every patient concept and legacy design family. */
const { getPractices } = require('../src/data/practices');
const { getDoctorPageSetRoutes } = require('../src/data/doctor-page-sets');
const { getPatientConcepts } = require('../src/data/design-concepts');

const baseUrl = process.argv[2] || 'http://127.0.0.1:8094';

async function verify() {
  const failures = [];
  const expectedConcepts = getPatientConcepts().length;
  for (const practice of getPractices()) {
    const routes = getDoctorPageSetRoutes(practice.key);
    const conceptLandingRoutes = routes.filter((route) => route.category === 'Patient concept' && route.type === 'landing');
    if (conceptLandingRoutes.length !== expectedConcepts) failures.push(`${practice.key}: expected ${expectedConcepts} concept landing routes, found ${conceptLandingRoutes.length}`);
    for (const route of routes) {
      const response = await fetch(`${baseUrl}${route.path}`);
      const html = await response.text();
      if (!response.ok) failures.push(`${practice.key}: ${route.path} returned ${response.status}`);
      if (!html.includes(practice.surveyId) && route.type === 'landing') failures.push(`${practice.key}: ${route.path} did not render its assigned survey`);
      if (/free[\s-]*consultation/i.test(html)) failures.push(`${practice.key}: ${route.path} contains retired free-consultation language`);
      if (!html.includes(`/care/${practice.key}/privacy`)) failures.push(`${practice.key}: ${route.path} does not contain its privacy profile link`);
    }
  }
  if (failures.length) {
    console.error(failures.join('\n'));
    process.exit(1);
  }
  console.log(`PASS: all doctor concept and legacy page sets loaded from ${baseUrl}.`);
}

verify().catch((error) => { console.error(error); process.exit(1); });
