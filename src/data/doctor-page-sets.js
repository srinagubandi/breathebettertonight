/** Build reusable legacy LP design sets for each active practice without changing legacy URLs. */
const legacyBlueprint = require('./dr-lay');
const { getPractice } = require('./practices');
const { getPatientConcepts } = require('./design-concepts');

function labelForCity(slug) {
  const terms = String(slug || '').split('-');
  const state = terms.pop() || '';
  const city = terms.map((term) => term.charAt(0).toUpperCase() + term.slice(1)).join(' ');
  return `${city}, ${state.toUpperCase()}`;
}

function getDoctorPageSet(practiceKey) {
  const practice = getPractice(practiceKey);
  if (!practice) return null;
  return {
    ...legacyBlueprint,
    slug: `legacy-${practice.key}`,
    name: practice.doctorName,
    credentials: practice.credentials,
    practice: practice.publicName,
    phone: practice.phoneDisplay,
    phoneRaw: practice.phoneRaw,
    address: practice.address,
    state: practice.address.split(',').pop()?.trim().split(' ')[0] || '',
    website: '',
    cities: (practice.citySlugs || []).map((slug) => ({ slug, label: labelForCity(slug), phone: null })),
    profile: {
      photo: null,
      photoLabel: 'Practice contact',
      bioPlaceholder: 'Connect with the practice to discuss your sleep concerns and an appropriate next step.',
    },
    adminLabel: `${practice.campaignDestination} legacy design set`,
  };
}

function getDoctorPageSetRoutes(practiceKey) {
  const doctor = getDoctorPageSet(practiceKey);
  if (!doctor) return [];
  const routes = [];
  const addFamily = (category, design, path, system, locality = '') => {
    routes.push({ category, design, path, type: 'landing', system, locality });
    routes.push({ category, design, path: `${path}/thank-you`, type: 'qualified', system, locality });
    routes.push({ category, design, path: `${path}/not-qualified`, type: 'non-qualified', system, locality });
  };

  getPatientConcepts().forEach((concept) => {
    addFamily('Patient concept', concept.navLabel, `/lp/${practiceKey}/concepts/${concept.key}`, concept.designSystem);
  });
  Object.entries(doctor.variants).forEach(([variantKey, variant]) => {
    addFamily('Doctor legacy', `${variantKey.toUpperCase()} · ${variant.label}`, `/lp/${practiceKey}/legacy/${variantKey}`, variant.designSystem);
    doctor.cities.forEach((city) => {
      addFamily('Doctor legacy', `${variantKey.toUpperCase()} · ${variant.label}`, `/lp/${practiceKey}/legacy/${variantKey}/${city.slug}`, variant.designSystem, city.label);
    });
  });
  return routes;
}

module.exports = { getDoctorPageSet, getDoctorPageSetRoutes };
