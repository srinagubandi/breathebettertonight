/**
 * Patient-facing concept registry.
 * Each record can render as a doctor-owned landing page with the same assigned
 * GoHighLevel survey, policy profile, and matched outcome pages.
 */
const patientConcepts = [
  {
    key: 'night-to-clarity', navLabel: 'Night to Clarity', eyebrow: 'Night to clarity',
    headline: 'From a restless night to a clearer next step.',
    subheadline: 'Recognize familiar sleep concerns and choose a local practice when you are ready for a conversation.',
    hero: '/assets/images/hero-v1.jpg', designSystem: 'night-to-clarity',
    recognitionTitle: 'Start with what you notice.',
    recognition: ['Snoring that stands out', 'Pauses or gasping that a partner notices', 'Waking unrefreshed', 'Energy that fades early'],
  },
  {
    key: 'clinical-confidence', navLabel: 'Clinical confidence', eyebrow: 'Sleep-apnea questions',
    headline: 'Bring the right questions to the next conversation.',
    subheadline: 'Sleep symptoms can have more than one cause. A local practice can help you understand an appropriate next step.',
    hero: '/assets/images/symptom-v1.jpg', designSystem: 'clinical-confidence',
    recognitionTitle: 'Signs worth discussing.',
    recognition: ['Loud or frequent snoring', 'Observed breathing pauses', 'Gasping during sleep', 'Ongoing daytime tiredness'],
  },
  {
    key: 'family-comfort', navLabel: 'Family comfort', eyebrow: 'A shared sleep concern',
    headline: 'A calmer conversation can begin at home.',
    subheadline: 'Sleep concerns often affect more than one person. Use this page to prepare for a thoughtful local conversation.',
    hero: '/assets/images/symptom-v3.jpg', designSystem: 'family-comfort',
    recognitionTitle: 'What partners often notice.',
    recognition: ['Snoring that interrupts rest', 'Changes in breathing sounds', 'Restless movement', 'Waking tired together'],
  },
  {
    key: 'local-care-calm-direction', navLabel: 'Local care, calm direction', eyebrow: 'A local next step',
    headline: 'Clear information. A local conversation. No pressure.',
    subheadline: 'Learn what may be worth discussing and connect with a participating local practice when the time is right.',
    hero: '/assets/images/hero-v2.jpg', designSystem: 'local-care-calm-direction',
    recognitionTitle: 'A practical starting point.',
    recognition: ['Nighttime disruption', 'Waking unrefreshed', 'Daytime fatigue', 'Questions about next steps'],
  },
  {
    key: 'soft-utility', navLabel: 'Soft utility', eyebrow: 'A simple next step',
    headline: 'Sleep questions, made easier to sort through.',
    subheadline: 'A focused route for visitors who want clear information before choosing a local care conversation.',
    hero: '/assets/images/symptom-v4.jpg', designSystem: 'soft-utility',
    recognitionTitle: 'Choose what feels familiar.',
    recognition: ['Tired mornings', 'Dry mouth on waking', 'Trouble focusing', 'Disrupted sleep'],
  },
  {
    key: 'humanist-morning', navLabel: 'Humanist morning', eyebrow: 'How did today begin?',
    headline: 'Morning can tell you something about the night before.',
    subheadline: 'Feeling foggy, headachy, or still tired is a useful detail to bring into a provider conversation.',
    hero: '/assets/images/symptom-v2.jpg', designSystem: 'humanist-morning',
    recognitionTitle: 'Morning details to remember.',
    recognition: ['Waking unrefreshed', 'Morning headache', 'Dry mouth or sore throat', 'Early-day fatigue'],
  },
  {
    key: 'quiet-signal', navLabel: 'Quiet signal', eyebrow: 'Clear, practical information',
    headline: 'Notice the pattern. Choose the next step.',
    subheadline: 'A direct, low-pressure guide for exploring sleep-related concerns without assuming a diagnosis.',
    hero: '/assets/images/symptom-v5.jpg', designSystem: 'quiet-signal',
    recognitionTitle: 'Common patterns.',
    recognition: ['Frequent snoring', 'Interrupted sleep', 'Low daytime energy', 'Trouble staying alert'],
  },
  {
    key: 'sleep-check', navLabel: 'Sleep check', eyebrow: 'Awareness, not diagnosis',
    headline: 'Begin with the patterns you recognize.',
    subheadline: 'Use a few familiar signals to prepare for an informed conversation with a participating local practice.',
    hero: '/assets/images/symptom-v1.jpg', designSystem: 'sleep-check',
    recognitionTitle: 'Which signs sound familiar?',
    recognition: ['Loud or frequent snoring', 'Observed pauses in breathing', 'Gasping or choking sounds', 'Daytime sleepiness'],
  },
  {
    key: 'provider-match', navLabel: 'Provider match', eyebrow: 'Your local choice',
    headline: 'Choose the practice that fits your next step.',
    subheadline: 'You remain in control of the local destination you select and the information you choose to share.',
    hero: '/assets/images/hero-v3.jpg', designSystem: 'provider-match',
    recognitionTitle: 'What matters for your choice.',
    recognition: ['A local practice', 'Visible Call and Text options', 'A direct intake route', 'Clear policy information'],
  },
  {
    key: 'consultation-handoff', navLabel: 'Consultation handoff', eyebrow: 'A clear handoff',
    headline: 'You know who receives your request and what happens next.',
    subheadline: 'Choose the local practice, review its contact details, and use its dedicated consultation request when ready.',
    hero: '/assets/images/hero-v1.jpg', designSystem: 'consultation-handoff',
    recognitionTitle: 'A transparent next step.',
    recognition: ['Your selected practice', 'Its direct Call and Text routes', 'A secure intake request', 'Clear local policies'],
  },
  {
    key: 'partner-path', navLabel: 'Partner path', eyebrow: 'For you or someone you care about',
    headline: 'A sleep concern can be easier to raise together.',
    subheadline: 'Use a respectful, conversation-led path when you are seeking information for a partner or family member.',
    hero: '/assets/images/symptom-v3.jpg', designSystem: 'partner-path',
    recognitionTitle: 'A partner may notice.',
    recognition: ['Loud snoring', 'Pauses in breathing', 'Sudden gasping', 'A visibly restless night'],
  },
  {
    key: 'treatment-questions', navLabel: 'Treatment questions', eyebrow: 'Prepare, do not self-diagnose',
    headline: 'Bring better questions into the next conversation.',
    subheadline: 'This page helps organize the questions you may want to ask a qualified healthcare professional about evaluation and options.',
    hero: '/assets/images/symptom-v6.jpg', designSystem: 'treatment-questions',
    recognitionTitle: 'Questions to prepare.',
    recognition: ['What evaluation may be appropriate?', 'What information should I bring?', 'Who coordinates next steps?', 'How can I follow up?'],
  },
  {
    key: 'request-received', navLabel: 'Request received', eyebrow: 'Follow-up clarity',
    headline: 'Make the next step feel clear before you send a request.',
    subheadline: 'Review the local practice, the conversation route, and the information you can expect to share before proceeding.',
    hero: '/assets/images/hero-v2.jpg', designSystem: 'request-received',
    recognitionTitle: 'What the request supports.',
    recognition: ['A practice follow-up', 'A conversation about concerns', 'A clear contact path', 'No diagnosis from this page'],
  },
  {
    key: 'tired-mornings', navLabel: 'Tired mornings', eyebrow: 'Sleep awareness',
    headline: 'Still tired when the day begins?',
    subheadline: 'Restless nights and waking unrefreshed can be worth a private conversation.',
    hero: '/assets/images/ads/tired-mornings.png', designSystem: 'morning-signal', featured: true,
    recognitionTitle: 'Notice the morning pattern.',
    recognition: ['Waking tired after a full night', 'Restless or interrupted sleep', 'Morning headaches or dry mouth', 'Low energy before the day has begun'],
  },
  {
    key: 'focus-and-brain-fog', navLabel: 'Focus and brain fog', eyebrow: 'Daytime signal',
    headline: 'When focus fades, look at the night before.',
    subheadline: 'Low daytime energy and brain fog can have more than one cause. They are worth discussing when they persist.',
    hero: '/assets/images/ads/focus-and-brain-fog.png', designSystem: 'clarity-signal', featured: true,
    recognitionTitle: 'A pattern to bring up.',
    recognition: ['Trouble staying focused', 'Afternoon sleepiness', 'Irritability or mental fatigue', 'Feeling unrefreshed despite time in bed'],
  },
  {
    key: 'partner-noticed-snoring', navLabel: 'Partner-noticed snoring', eyebrow: 'Partner signal',
    headline: 'When snoring keeps two people awake.',
    subheadline: 'A partner may notice loud snoring, pauses, or gasping before the sleeper does.',
    hero: '/assets/images/ads/partner-noticed-snoring.png', designSystem: 'shared-sleep-signal', featured: true,
    recognitionTitle: 'What a partner may notice.',
    recognition: ['Loud or frequent snoring', 'Pauses in breathing', 'Gasping or choking sounds', 'Restless movement through the night'],
  },
];

function getPatientConcepts() {
  return patientConcepts;
}

function getPatientConcept(key) {
  return patientConcepts.find((concept) => concept.key === key) || null;
}

module.exports = { getPatientConcept, getPatientConcepts };
