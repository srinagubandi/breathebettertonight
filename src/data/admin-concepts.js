/**
 * Protected admin concept library. These references support the Night-to-Clarity
 * patient system and Propel Dental HCP review flow; they are never public routes.
 */

const LOOKBOOK_URL = 'https://concept-lookbook-production.up.railway.app/';

const HOMEPAGE_CONCEPTS = [
  {
    id: 'night-to-clarity-video',
    title: 'Night to Clarity — Video Signal',
    system: 'Motion-led patient homepage',
    image: 'bbt_patient_home_video_hero_concept.png',
    description: 'Review this if you want the homepage to feel more cinematic at first touch. It uses optional, muted motion to move from nighttime uncertainty toward a clear next step; any live version must retain a static fallback and reduced-motion support.',
    status: 'Review only',
    route: '/',
  },
  {
    id: 'soft-utility',
    title: 'Soft Utility',
    system: 'Guided patient utility',
    image: 'bbt_general_patient_soft_utility_concept.png',
    description: 'Review this if the priority is fast orientation. It helps visitors recognize a concern and choose a next action without turning symptom content into a diagnosis.',
    status: 'Review only',
    route: '/',
  },
  {
    id: 'humanist-morning',
    title: 'Humanist Morning',
    system: 'Editorial patient story',
    image: 'bbt_general_patient_humanist_morning_concept.png',
    description: 'Review this if the priority is empathy and recognition. It centers the lived experience of waking tired, then introduces the consultation path with calm, non-pressuring language.',
    status: 'Review only',
    route: '/',
  },
  {
    id: 'quiet-signal',
    title: 'Quiet Signal',
    system: 'Minimal recognition path',
    image: 'bbt_general_patient_quiet_signal_concept.png',
    description: 'Review this if the priority is clarity with minimal distraction. It uses a high-contrast reading path to connect symptom recognition, evidence-aware guidance, and a participating practice.',
    status: 'Review only',
    route: '/',
  },
];

const HCP_CONCEPTS = [
  {
    id: 'clinical-handoff',
    title: 'Clinical Handoff',
    system: 'Provider coordination story',
    image: 'propel_dental_sleep_hcp_concept_clinical_handoff.png',
    description: 'Review this if the HCP story should lead with coordinated handoffs. It positions Propel Dental as a structured partner across responsible demand, qualified intake, and clinical follow-through.',
    status: 'Review only',
    route: 'https://www.propel.dental/',
  },
  {
    id: 'p90-pathway',
    title: 'P90 Pathway',
    system: '90-day launch narrative',
    image: 'propel_dental_sleep_hcp_concept_p90_pathway.png',
    description: 'Review this if prospects need to see the engagement unfold over time. It makes the operating sequence concrete: launch, capture, conversion, and reporting.',
    status: 'Review only',
    route: 'https://www.propel.dental/',
  },
  {
    id: 'referral-loop',
    title: 'Referral Loop',
    system: 'Partner ecosystem map',
    image: 'propel_dental_sleep_hcp_concept_referral_loop.png',
    description: 'Review this if medical and referral alignment is the primary story. It clarifies the separate roles of demand generation, partner relationships, evaluation pathways, and follow-up communication.',
    status: 'Review only',
    route: 'https://www.propel.dental/',
  },
  {
    id: 'growth-constraint-system',
    title: 'Growth Constraint System',
    system: 'Operational conversion system',
    image: 'propel_hcp_growth_constraint_system_concept.png',
    description: 'Review this if the strongest proof is operational fluency. It surfaces capacity, response speed, scheduling, attendance, and reporting as connected constraints—not isolated marketing metrics.',
    status: 'Review only',
    route: 'https://www.propel.dental/',
  },
  {
    id: 'visible-operating-system',
    title: 'Visible Operating System',
    system: 'Growth visibility dashboard',
    image: 'propel_hcp_visible_operating_system_concept.png',
    description: 'Review this if visibility and accountability should lead. It translates patient-acquisition work into visible stages, accountable actions, and a practical operating view.',
    status: 'Review only',
    route: 'https://www.propel.dental/',
  },
];

const ADMIN_CONCEPT_FILES = new Set([
  ...HOMEPAGE_CONCEPTS,
  ...HCP_CONCEPTS,
].map((concept) => concept.image));

module.exports = {
  ADMIN_CONCEPT_FILES,
  HCP_CONCEPTS,
  HOMEPAGE_CONCEPTS,
  LOOKBOOK_URL,
};
