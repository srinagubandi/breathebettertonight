/** Canonical patient-facing concepts, including the approved paid-traffic studies. */
const { getPatientConcept, getPatientConcepts } = require('../design-concepts');

function getCampaigns() {
  return getPatientConcepts();
}

function getCampaign(key) {
  return getPatientConcept(key);
}

module.exports = { getCampaigns, getCampaign };
