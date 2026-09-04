/**
 * Patient-facing concept registry.
 * Each record can render as a doctor-owned landing page with the same assigned
 * GoHighLevel survey, policy profile, and matched outcome pages.
 */
const patientConcepts = [
  {
    key: 'night-to-clarity', navLabel: 'Night to Clarity', eyebrow: 'Night to clarity',
    headline: 'From a restless night to a clearer next step.',
    subheadline: 'Notice sleep concerns. Choose a local conversation when you are ready.',
    hero: '/assets/images/hero-v1.jpg', designSystem: 'night-to-clarity',
    recognitionTitle: 'Start with what you notice.',
    recognition: ['Snoring that stands out', 'Pauses or gasping that a partner notices', 'Waking unrefreshed', 'Energy that fades early'],
  },
  {
    key: 'clinical-confidence', navLabel: 'Clinical confidence', eyebrow: 'Sleep-apnea questions',
    headline: 'Bring the right questions to the next conversation.',
    subheadline: 'Sleep symptoms can have many causes. Discuss the next step locally.',
    hero: '/assets/images/symptom-v1.jpg', designSystem: 'clinical-confidence',
    recognitionTitle: 'Signs worth discussing.',
    recognition: ['Loud or frequent snoring', 'Observed breathing pauses', 'Gasping during sleep', 'Ongoing daytime tiredness'],
  },
  {
    key: 'family-comfort', navLabel: 'Family comfort', eyebrow: 'A shared sleep concern',
    headline: 'A calmer conversation can begin at home.',
    subheadline: 'Sleep concerns can affect more than one person. Start a calm conversation.',
    hero: '/assets/images/symptom-v3.jpg', designSystem: 'family-comfort',
    recognitionTitle: 'What partners often notice.',
    recognition: ['Snoring that interrupts rest', 'Changes in breathing sounds', 'Restless movement', 'Waking tired together'],
  },
  {
    key: 'local-care-calm-direction', navLabel: 'Local care, calm direction', eyebrow: 'A local next step',
    headline: 'Clear information. A local conversation. No pressure.',
    subheadline: 'Clear information and a local conversation when you are ready.',
    hero: '/assets/images/hero-v2.jpg', designSystem: 'local-care-calm-direction',
    recognitionTitle: 'A practical starting point.',
    recognition: ['Nighttime disruption', 'Waking unrefreshed', 'Daytime fatigue', 'Questions about next steps'],
  },
  {
    key: 'soft-utility', navLabel: 'Soft utility', eyebrow: 'A simple next step',
    headline: 'Sleep questions, made easier to sort through.',
    subheadline: 'Clear sleep information before you choose a local conversation.',
    hero: '/assets/images/symptom-v4.jpg', designSystem: 'soft-utility',
    recognitionTitle: 'Choose what feels familiar.',
    recognition: ['Tired mornings', 'Dry mouth on waking', 'Trouble focusing', 'Disrupted sleep'],
  },
  {
    key: 'humanist-morning', navLabel: 'Humanist morning', eyebrow: 'How did today begin?',
    headline: 'Morning can tell you something about the night before.',
    subheadline: 'Foggy, headachy, or tired mornings are worth mentioning.',
    hero: '/assets/images/symptom-v2.jpg', designSystem: 'humanist-morning',
    recognitionTitle: 'Morning details to remember.',
    recognition: ['Waking unrefreshed', 'Morning headache', 'Dry mouth or sore throat', 'Early-day fatigue'],
  },
  {
    key: 'quiet-signal', navLabel: 'Quiet signal', eyebrow: 'Clear, practical information',
    headline: 'Notice the pattern. Choose the next step.',
    subheadline: 'A low-pressure guide to sleep concerns and next steps.',
    hero: '/assets/images/symptom-v5.jpg', designSystem: 'quiet-signal',
    recognitionTitle: 'Common patterns.',
    recognition: ['Frequent snoring', 'Interrupted sleep', 'Low daytime energy', 'Trouble staying alert'],
  },
  {
    key: 'sleep-check', navLabel: 'Sleep check', eyebrow: 'Awareness, not diagnosis',
    headline: 'Begin with the patterns you recognize.',
    subheadline: 'Notice familiar symptoms before your next conversation.',
    hero: '/assets/images/symptom-v1.jpg', designSystem: 'sleep-check',
    recognitionTitle: 'Which signs sound familiar?',
    recognition: ['Loud or frequent snoring', 'Observed pauses in breathing', 'Gasping or choking sounds', 'Daytime sleepiness'],
  },
  {
    key: 'provider-match', navLabel: 'Provider match', eyebrow: 'Your local choice',
    headline: 'Choose the practice that fits your next step.',
    subheadline: 'Choose a local practice and decide what you share.',
    hero: '/assets/images/hero-v3.jpg', designSystem: 'provider-match',
    recognitionTitle: 'What matters for your choice.',
    recognition: ['A local practice', 'Visible Call and Text options', 'A direct intake route', 'Clear policy information'],
  },
  {
    key: 'consultation-handoff', navLabel: 'Consultation handoff', eyebrow: 'A clear handoff',
    headline: 'You know who receives your request and what happens next.',
    subheadline: 'Know who receives your request and what happens next.',
    hero: '/assets/images/hero-v1.jpg', designSystem: 'consultation-handoff',
    recognitionTitle: 'A transparent next step.',
    recognition: ['Your selected practice', 'Its direct Call and Text routes', 'A secure intake request', 'Clear local policies'],
  },
  {
    key: 'partner-path', navLabel: 'Partner path', eyebrow: 'For you or someone you care about',
    headline: 'A sleep concern can be easier to raise together.',
    subheadline: 'A respectful place to raise a sleep concern together.',
    hero: '/assets/images/symptom-v3.jpg', designSystem: 'partner-path',
    recognitionTitle: 'A partner may notice.',
    recognition: ['Loud snoring', 'Pauses in breathing', 'Sudden gasping', 'A visibly restless night'],
  },
  {
    key: 'treatment-questions', navLabel: 'Treatment questions', eyebrow: 'Prepare, do not self-diagnose',
    headline: 'Bring better questions into the next conversation.',
    subheadline: 'Prepare questions about evaluation and options.',
    hero: '/assets/images/symptom-v6.jpg', designSystem: 'treatment-questions',
    recognitionTitle: 'Questions to prepare.',
    recognition: ['What evaluation may be appropriate?', 'What information should I bring?', 'Who coordinates next steps?', 'How can I follow up?'],
  },
  {
    key: 'request-received', navLabel: 'Request received', eyebrow: 'Follow-up clarity',
    headline: 'Make the next step feel clear before you send a request.',
    subheadline: 'Review the practice and request process before you continue.',
    hero: '/assets/images/hero-v2.jpg', designSystem: 'request-received',
    recognitionTitle: 'What the request supports.',
    recognition: ['A practice follow-up', 'A conversation about concerns', 'A clear contact path', 'No diagnosis from this page'],
  },
  {
    key: 'tired-mornings', navLabel: 'Tired mornings', eyebrow: 'Sleep awareness',
    headline: 'Still tired when the day begins?',
    subheadline: 'Restless nights and tired mornings are worth discussing.',
    hero: '/assets/images/ads/tired-mornings.png', designSystem: 'morning-signal', featured: true,
    recognitionTitle: 'Notice the morning pattern.',
    recognition: ['Waking tired after a full night', 'Restless or interrupted sleep', 'Morning headaches or dry mouth', 'Low energy before the day has begun'],
  },
  {
    key: 'focus-and-brain-fog', navLabel: 'Focus and brain fog', eyebrow: 'Daytime signal',
    headline: 'When focus fades, look at the night before.',
    subheadline: 'Brain fog and low energy have many causes. Discuss persistent patterns.',
    hero: '/assets/images/ads/focus-and-brain-fog.png', designSystem: 'clarity-signal', featured: true,
    recognitionTitle: 'A pattern to bring up.',
    recognition: ['Trouble staying focused', 'Afternoon sleepiness', 'Irritability or mental fatigue', 'Feeling unrefreshed despite time in bed'],
  },
  {
    key: 'partner-noticed-snoring', navLabel: 'Partner-noticed snoring', eyebrow: 'Partner signal',
    headline: 'When snoring keeps two people awake.',
    subheadline: 'A partner may notice snoring, pauses, or gasping first.',
    hero: '/assets/images/ads/partner-noticed-snoring.png', designSystem: 'shared-sleep-signal', featured: true,
    recognitionTitle: 'What a partner may notice.',
    recognition: ['Loud or frequent snoring', 'Pauses in breathing', 'Gasping or choking sounds', 'Restless movement through the night'],
  },
  {
    key: 'partner-disrupted-sleep', navLabel: 'Partner-disrupted sleep', eyebrow: 'A shared night',
    headline: 'When one person’s sleep keeps the other awake.',
    subheadline: 'When snoring disrupts a partner’s rest, discuss the pattern together.',
    hero: '/assets/images/video-posters/partner-disrupted-sleep.jpg', heroPoster: '/assets/images/video-posters/partner-disrupted-sleep.jpg', heroVideo: '/assets/video/partner-disrupted-sleep.mp4', designSystem: 'shared-sleep-signal', featured: true,
    recognitionTitle: 'What a disrupted night can feel like.',
    recognition: ['Snoring that repeatedly interrupts a partner’s rest', 'Changes in breathing sounds that a partner notices', 'A restless night for one or both people', 'Waking without feeling restored'],
  },
  {
    key: 'waking-unrefreshed-video', navLabel: 'Waking unrefreshed', eyebrow: 'Morning after a restless night',
    headline: 'Still waking unrefreshed?',
    subheadline: 'A tired morning may be worth discussing with a local practice.',
    hero: '/assets/images/video-posters/unrefreshed-morning.jpg', heroPoster: '/assets/images/video-posters/unrefreshed-morning.jpg', heroVideo: '/assets/video/unrefreshed-morning.mp4', designSystem: 'morning-signal', featured: true,
    recognitionTitle: 'Details to notice in the morning.',
    recognition: ['Feeling tired despite time in bed', 'Remembering frequent wake-ups or restless sleep', 'Waking with dry mouth or a headache', 'Starting the day with low energy'],
  },
  {
    key: 'daytime-brain-fog-video', navLabel: 'Daytime brain fog', eyebrow: 'Daytime signal',
    headline: 'When the day feels foggy, consider the night before.',
    subheadline: 'Brain fog and low energy have many causes. Discuss persistent patterns.',
    hero: '/assets/images/video-posters/restless-night.jpg', heroPoster: '/assets/images/video-posters/restless-night.jpg', heroVideo: '/assets/video/restless-night.mp4', designSystem: 'clarity-signal', featured: true,
    recognitionTitle: 'A pattern to bring into the conversation.',
    recognition: ['Trouble focusing through the day', 'A dip in energy or alertness', 'Mental fatigue or irritability', 'Feeling unrefreshed after a restless night'],
  },
  {
    key: 'nighttime-breathing-sounds', navLabel: 'Nighttime breathing sounds', eyebrow: 'A nighttime pattern',
    headline: 'A partner may notice breathing sounds before you do.',
    subheadline: 'Regular snoring or changing breathing sounds can disrupt a shared night. Discuss the pattern without assumptions.',
    hero: '/assets/images/video-posters/nighttime-breathing-sounds.jpg', heroPoster: '/assets/images/video-posters/nighttime-breathing-sounds.jpg', heroVideo: '/assets/video/nighttime-breathing-sounds.mp4', designSystem: 'night-breathing-signal', featured: true,
    recognitionTitle: 'Nighttime details worth noting.',
    recognition: ['Snoring that is loud or regularly interrupts rest', 'Breathing sounds that change through the night', 'Pauses or gasping that a partner notices', 'Feeling less rested the next day'],
  },
];

function getPatientConcepts() {
  return patientConcepts;
}

function getPatientConcept(key) {
  return patientConcepts.find((concept) => concept.key === key) || null;
}

module.exports = { getPatientConcept, getPatientConcepts };
