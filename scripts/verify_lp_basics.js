#!/usr/bin/env node
/**
 * Basic structural accessibility and shared-content regression test.
 *
 * Run against a local or Railway base URL. This is intentionally dependency-free
 * and complements visual Playwright QA; it checks the content contract required
 * across every visual treatment.
 */
const { getAllDoctors } = require('../src/data');
const { getPracticeByLegacyDoctor, surveyUrl } = require('../src/data/practices');

const baseUrl = process.argv[2] || 'http://127.0.0.1:8094';
const doctor = getAllDoctors().find((item) => item.slug === 'dr-lay');
const practice = getPracticeByLegacyDoctor(doctor.slug);
const expected = doctor.sharedContent;
const variants = Object.keys(doctor.variants);

const requiredFragments = [
  '<html lang="en">',
  'name="viewport"',
  '<h1>',
  expected.headline,
  'Request a free consultation',
  'class="header-phone top-phone"',
  `href="/care/${practice.key}/privacy"`,
  `href="/care/${practice.key}/terms"`,
  `href="/care/${practice.key}/accessibility"`,
  surveyUrl(practice),
  'class="chat-launcher"',
  'aria-expanded="false"',
];

async function verify() {
  const failures = [];

  for (const variant of variants) {
    const response = await fetch(`${baseUrl}/dr-lay/${variant}`);
    const html = await response.text();
    const lower = html.toLowerCase();

    if (!response.ok) failures.push(`${variant}: expected HTTP 200, received ${response.status}`);
    for (const fragment of requiredFragments) {
      if (!html.includes(fragment)) failures.push(`${variant}: missing required fragment ${fragment}`);
    }
    for (const symptom of expected.symptoms) {
      if (!html.includes(symptom.label)) failures.push(`${variant}: missing shared symptom '${symptom.label}'`);
    }
    if (!html.includes(practice.surveyId)) failures.push(`${variant}: missing assigned GoHighLevel survey ID`);
  }

  if (failures.length) {
    console.error(failures.join('\n'));
    process.exit(1);
  }

  console.log(`PASS: ${variants.length} LPs share required accessible structure and approved content at ${baseUrl}.`);
}

verify().catch((error) => {
  console.error(error);
  process.exit(1);
});
