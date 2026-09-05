const { CAMPAIGN_KEYS, DESIGN_SYSTEMS } = require('./practice-config');
const { getAllRoutes } = require('../data');
const { getDoctorPageSetRoutes } = require('../data/doctor-page-sets');
const { getPatientConcepts } = require('../data/design-concepts');

function countBy(items, key) {
  return items.reduce((result, item) => {
    const value = item[key] || 'Uncategorized';
    result[value] = (result[value] || 0) + 1;
    return result;
  }, {});
}

function practiceImpact(practice) {
  const campaignRoutes = CAMPAIGN_KEYS.length * 3;
  const localRoutes = 4;
  const doctorRoutes = getDoctorPageSetRoutes(practice.key);
  const compatibilityRoutes = practice.legacyDoctorSlug
    ? getAllRoutes().filter((route) => route.doctorSlug === practice.legacyDoctorSlug).length
    : 0;
  return {
    canonical: campaignRoutes + localRoutes,
    doctorOwned: doctorRoutes.length,
    compatibility: compatibilityRoutes,
    total: campaignRoutes + localRoutes + doctorRoutes.length + compatibilityRoutes,
    outcomes: CAMPAIGN_KEYS.length * 2 + doctorRoutes.filter((route) => route.type !== 'landing').length,
  };
}

function practiceReadiness(practice) {
  const checks = [
    { key: 'survey', label: 'Assigned GoHighLevel survey', passed: /^[A-Za-z0-9_-]{12,80}$/.test(practice.surveyId || '') },
    { key: 'contact', label: 'Call and Text routes', passed: String(practice.phoneRaw || '').length >= 7 && String(practice.textRaw || '').length >= 7 },
    { key: 'policy', label: 'Practice policy profile', passed: Boolean(practice.policyProfile) },
    { key: 'designs', label: 'Supported campaign designs', passed: CAMPAIGN_KEYS.every((key) => DESIGN_SYSTEMS.includes(practice.designAssignments?.[key] || 'night-to-clarity')) },
    { key: 'identity', label: 'Public identity fields', passed: practice.showPracticeName === false || Boolean(practice.publicName && practice.doctorName && practice.credentials) },
    { key: 'profile', label: 'Dentist profile settings', passed: practice.showDentistProfile === false || practice.showPracticeName !== false },
    { key: 'portrait', label: 'Portrait readiness', passed: practice.showDentistPhoto === false || !practice.portraitUrl || (practice.portraitStatus === 'Approved for publication' && Boolean(practice.portraitAlt)) || practice.portraitStatus === 'Placeholder' },
  ];
  return { checks, passed: checks.filter((check) => check.passed).length, total: checks.length };
}

function contentChecks(practice) {
  const warnings = [];
  if (!practice.doctorBio) warnings.push('Profile note uses the concise default patient-safe copy.');
  if (practice.showDentistPhoto !== false && practice.portraitStatus === 'Pending approval') warnings.push('Portrait is pending approval; keep the neutral placeholder until the image and alt text are approved.');
  if (practice.showDentistPhoto !== false && practice.portraitUrl && !practice.portraitAlt) warnings.push('Approved portrait path needs meaningful alt text before publication.');
  if (practice.showPracticeName === false && practice.showDentistProfile !== false) warnings.push('The dentist profile is automatically hidden while practice identity is hidden.');
  if (!practice.policyOverrides?.privacy || !practice.policyOverrides?.terms || !practice.policyOverrides?.accessibility) warnings.push('One or more policy routes are using the reviewed shared practice copy.');
  return warnings;
}

function buildCampaignMatrix(practices) {
  const concepts = getPatientConcepts();
  return concepts.map((concept) => ({
    key: concept.key,
    label: concept.navLabel,
    video: Boolean(concept.heroVideo),
    rows: practices.map((practice) => ({
      practiceKey: practice.key,
      practiceName: practice.campaignDestination,
      design: practice.designAssignments?.[concept.key] || concept.designSystem,
      landing: `/go/${practice.key}/${concept.key}`,
      surveyId: practice.surveyId,
      ready: practiceReadiness(practice).passed === practiceReadiness(practice).total,
    })),
  }));
}

function aggregateAnalytics(leads = []) {
  const now = Date.now();
  const since30Days = now - 30 * 24 * 60 * 60 * 1000;
  const recent = leads.filter((lead) => new Date(lead.createdAt).getTime() >= since30Days);
  return {
    scope: 'General BBT contact intake only — practice GoHighLevel survey activity remains in GoHighLevel.',
    total: leads.length,
    recent30: recent.length,
    byStatus: countBy(leads, 'status'),
    byInquiry: countBy(recent, 'inquiryType'),
  };
}

function buildAdminWorkspaceData({ practices = [], leads = [], drafts = {}, history = [] } = {}) {
  return {
    impacts: Object.fromEntries(practices.map((practice) => [practice.key, practiceImpact(practice)])),
    readiness: Object.fromEntries(practices.map((practice) => [practice.key, practiceReadiness(practice)])),
    contentChecks: Object.fromEntries(practices.map((practice) => [practice.key, contentChecks(practice)])),
    drafts,
    history,
    campaignMatrix: buildCampaignMatrix(practices),
    analytics: aggregateAnalytics(leads),
  };
}

module.exports = { buildAdminWorkspaceData, practiceImpact, practiceReadiness, aggregateAnalytics };
