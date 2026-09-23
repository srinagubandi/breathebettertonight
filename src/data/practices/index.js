/**
 * Canonical practice records.
 *
 * These records are intentionally configuration-first: one source of truth for
 * public naming, Call/Text routes, survey handoff, policy profile, and the
 * legacy doctor slug. The protected admin workspace will manage overrides.
 */
const practices = [
  {
    key: 'pantego-dental',
    legacyDoctorSlug: 'dr-lay',
    publicName: 'Pantego Dental',
    campaignDestination: 'Pantego Dental',
    doctorName: 'Dr. Willis Lay',
    credentials: 'DDS',
    address: '1810 S Bowen Rd, Pantego, TX 76013',
    serviceLabel: 'Pantego and the central Dallas–Fort Worth area',
    phoneDisplay: '(817) 274-1825',
    phoneRaw: '8172741825',
    textRaw: '8172741825',
    surveyId: '75op3Tl4LTjPkaXI1zhb',
    showPracticeName: true,
    showPhone: true,
    showText: true,
    showDentistProfile: true,
    showDentistPhoto: true,
    portraitStatus: 'Approved for publication',
    portraitUrl: '/assets/images/providers/dr-willis-lay.jpeg',
    portraitAlt: 'Portrait of Dr. Willis Lay',
    doctorBio: [
      'First and foremost, Dr. Lay is a follower of Our Lord and Savior Jesus Christ.',
      'Christ led Dr. Lay to the University of Wisconsin - Madison for his undergraduate studies and to The University of Michigan - Ann Arbor for dental school.',
      'Perennially ranked as a top dental school in the world, Michigan blessed Dr. Lay with an incredible education which still serves him well to this day. Throughout the years, Dr. Lay has additionally taken hundreds of hours of Continuing Education to refine a clinical skill set that few other dentists can match.',
      'Dr. Lay is able to take care of a wide range dental treatment needs from intricate cosmetic cases to complicated dental implant surgeries, and everything in between.',
      'As a sign of Dr. Lay’s unparalleled investment in his patients, everyone in our practice has Dr. Lay’s cell phone number and they are welcome to directly contact Dr. Lay as needed and for any reason.',
    ],
    policyProfile: 'pantego-dental',
    citySlugs: ['arlington-tx', 'pantego-tx', 'grand-prairie-tx', 'mansfield-tx', 'fort-worth-tx'],
  },
  {
    key: 'periodds',
    legacyDoctorSlug: null,
    publicName: 'Lakeside Dental Solutions',
    campaignDestination: 'PerioDDS',
    doctorName: 'Dr. Rashid Beirute-Prada',
    credentials: 'DDS, MDS',
    address: '6705 Heritage Pkwy, Suite 100, Rockwall, TX 75087',
    serviceLabel: 'Rockwall and the east Dallas–Fort Worth area',
    phoneDisplay: '(972) 412-0014',
    phoneRaw: '9724120014',
    textRaw: '9724120014',
    surveyId: 'pvHcEcGNjxhXI3L8lSrE',
    showPracticeName: true,
    showPhone: true,
    showText: true,
    showDentistProfile: true,
    showDentistPhoto: true,
    policyProfile: 'periodds',
    citySlugs: ['rockwall-tx', 'rowlett-tx', 'heath-tx'],
  },
  {
    key: 'dental-world',
    legacyDoctorSlug: null,
    publicName: 'Dental World',
    campaignDestination: 'Dental World',
    doctorName: 'Dr. Sheetal R. Manmode',
    credentials: 'DDS',
    address: '1250 W State Rd 434, Suite 1008, Longwood, FL 32750',
    serviceLabel: 'Longwood and Central Florida',
    phoneDisplay: '(407) 830-4401',
    phoneRaw: '4078304401',
    textRaw: '4078304401',
    surveyId: 'Rx0LnsI0XLu8JfhiDnYc',
    showPracticeName: true,
    showPhone: true,
    showText: true,
    showDentistProfile: true,
    showDentistPhoto: true,
    policyProfile: 'dental-world',
    citySlugs: ['longwood-fl', 'altamonte-springs-fl', 'oviedo-fl'],
  },
];

let overrideProvider = () => ({});

function setPracticeOverrideProvider(provider) {
  overrideProvider = typeof provider === 'function' ? provider : () => ({});
}

function mergedPractice(practice) {
  const override = overrideProvider()[practice.key] || {};
  return {
    ...practice,
    ...override,
    designAssignments: { ...(practice.designAssignments || {}), ...(override.designAssignments || {}) },
    policyOverrides: { ...(practice.policyOverrides || {}), ...(override.policyOverrides || {}) },
  };
}

function getPractices() {
  return practices.map(mergedPractice);
}

function getPractice(key) {
  return getPractices().find((practice) => practice.key === key) || null;
}

function getPracticeByLegacyDoctor(slug) {
  return getPractices().find((practice) => practice.legacyDoctorSlug === slug) || null;
}

function surveyUrl(practice) {
  return `https://api.leadconnectorhq.com/widget/survey/${practice.surveyId}`;
}

module.exports = { getPractices, getPractice, getPracticeByLegacyDoctor, setPracticeOverrideProvider, surveyUrl };
