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
  {
    key: 'sleep-pattern-clarity', navLabel: 'Sleep pattern clarity', copyFamily: true,
    headline: 'Your sleep may be worth a closer look.',
    subheadline: 'Tired mornings, loud snoring, and brain fog can have many causes. Together, they may be a reason to discuss sleep-related breathing.',
    hero: '/assets/images/hero-v1.jpg', designSystem: 'quiet-signal',
    recognitionTitle: 'Do any of these sound familiar?',
    recognitionIntro: 'A symptom is not a diagnosis. But when several patterns happen together, it can be useful to discuss what may be affecting your sleep.',
    recognition: ['Waking tired after enough time in bed', 'Loud or regular snoring', 'Changes in breathing noticed by a partner', 'Daytime sleepiness or trouble focusing'],
    guidance: {
      reasons: {
        eyebrow: 'Why discuss the pattern', title: 'Sleep is not only about time in bed.',
        copy: 'Breathing changes can make sleep feel less restorative. You may not remember them the next morning; you may simply notice low energy, a foggy head, or a partner who hears the pattern.',
        cards: [
          ['During sleep', 'Snoring, gasping, pauses, or restless sleep.'],
          ['In the morning', 'Tired mornings, dry mouth, or a headache.'],
          ['Through the day', 'Sleepiness, low energy, or trouble focusing.'],
        ],
      },
      appliance: {
        eyebrow: 'From symptoms to a treatment conversation', title: 'Could an oral appliance be an option?',
        copy: 'After appropriate evaluation and sleep testing, some adults may discuss a custom oral appliance as one possible treatment option.',
        steps: [
          ['Start with evaluation', 'A clinician reviews the pattern and decides whether testing or another next step is appropriate.'],
          ['Discuss suitable options', 'A qualified care team explains whether an oral appliance or another approach may fit your needs.'],
          ['Follow up', 'Care is tailored to your evaluation, comfort, and treatment plan.'],
        ],
        note: 'An oral appliance is not right for everyone and does not replace medical evaluation.',
      },
    },
  },
  {
    key: 'gentle-sleep-check', navLabel: 'A gentler sleep check', copyFamily: true,
    headline: 'Snoring, exhaustion, and brain fog are worth noticing.',
    subheadline: 'Many people get used to feeling tired. A short sleep survey can help you decide whether a closer conversation is worthwhile.',
    hero: '/assets/images/symptom-v2.jpg', designSystem: 'morning-signal',
    recognitionTitle: 'Your symptoms may have a pattern.',
    recognitionIntro: 'You do not need to diagnose yourself. If tired mornings, snoring, and daytime fatigue feel familiar, a sleep-related breathing issue is one possibility to discuss.',
    recognition: ['Feeling tired even after a full night in bed', 'Snoring that a partner mentions often', 'A dip in energy through the afternoon', 'Trouble concentrating or feeling like yourself'],
    guidance: {
      reasons: {
        eyebrow: 'A calm place to start', title: 'Familiar does not always mean restorative.',
        copy: 'It is easy to normalize fatigue, more coffee, or a noisy night. An evaluation can help clarify whether your sleep pattern deserves more attention.',
        cards: [
          ['At night', 'A partner may hear snoring, gasps, or changing sounds.'],
          ['At sunrise', 'You may wake tired, dry-mouthed, or headachy.'],
          ['By afternoon', 'You may feel sleepy, unfocused, or mentally drained.'],
        ],
      },
      appliance: {
        eyebrow: 'The right next step depends on you', title: 'Care starts with understanding the cause.',
        copy: 'If an evaluation identifies a sleep-related breathing problem, your care team can explain appropriate options. A custom oral appliance may be suitable for some adults.',
        steps: [
          ['Share what you notice', 'Bring up tired mornings, snoring, and any partner-noticed changes.'],
          ['Complete appropriate testing', 'A qualified clinician determines what evaluation may be needed.'],
          ['Choose an informed path', 'Your team can discuss an appliance or another approach if it is clinically appropriate.'],
        ],
        note: 'Suitability depends on an individual clinical evaluation; not every person needs or benefits from an oral appliance.',
      },
    },
  },
  {
    key: 'shared-night-conversation', navLabel: 'Shared-night conversation', copyFamily: true,
    headline: 'When one person’s sleep is disrupted, both people feel it.',
    subheadline: 'Loud snoring or changing breathing sounds can affect a shared night. Start with the pattern, not blame.',
    hero: '/assets/images/symptom-v3.jpg', designSystem: 'shared-sleep-signal',
    recognitionTitle: 'Details a partner may notice.',
    recognitionIntro: 'Snoring alone does not diagnose a condition. Snoring paired with gasping, pauses, or daytime exhaustion is a reason to learn more together.',
    recognition: ['Snoring that repeatedly wakes a partner', 'Sudden snorts, gasps, or changing breathing sounds', 'Quiet pauses that a partner notices', 'One or both people waking without feeling rested'],
    guidance: {
      reasons: {
        eyebrow: 'A shared sleep concern', title: 'It is about understanding, not blame.',
        copy: 'The person sleeping beside you may notice changes before you do. A respectful conversation can help turn a frustrating night into useful information for a clinician.',
        cards: [
          ['What is heard', 'Loud snoring, gasps, pauses, or sudden breathing changes.'],
          ['What is felt', 'Restless sleep and a disrupted night for one or both people.'],
          ['What follows', 'Tired mornings, low energy, or less focus the next day.'],
        ],
      },
      appliance: {
        eyebrow: 'Evaluation can guide the conversation', title: 'Treatment is individualized.',
        copy: 'When sleep testing and clinical assessment support treatment, a custom oral appliance may be one option for some adults. Other care paths may be more appropriate for others.',
        steps: [
          ['Notice the pattern together', 'Share partner-noticed details with a qualified clinician.'],
          ['Learn what testing shows', 'Appropriate evaluation identifies whether treatment should be discussed.'],
          ['Review care options', 'A team can explain whether an appliance or another option fits the clinical plan.'],
        ],
        note: 'A custom oral appliance is considered only after appropriate evaluation and is not right for every person.',
      },
    },
  },
  {
    key: 'sleep-symptom-check', navLabel: 'Sleep symptom check', copyFamily: true,
    headline: 'Snoring. Tired mornings. Brain fog.',
    subheadline: 'These symptoms can have many causes. If they happen regularly, a quick survey can help you decide whether sleep evaluation is worth discussing.',
    hero: '/assets/images/symptom-v1.jpg', designSystem: 'sleep-check',
    recognitionTitle: 'Common patterns to notice.',
    recognitionIntro: 'Look at the full pattern—not only how loudly you snore. Several recurring symptoms can be a useful reason to ask a clinician for guidance.',
    recognition: ['Waking tired after a full night in bed', 'Loud or regular snoring', 'Dry mouth or morning headaches', 'Gasping, choking, or pauses noticed during sleep'],
    guidance: {
      reasons: {
        eyebrow: 'A direct next step', title: 'Check the pattern before you guess.',
        copy: 'You may not remember every nighttime interruption. What you do notice—fatigue, low focus, dry mouth, or a partner’s observations—can be useful information.',
        cards: [
          ['Sleep signs', 'Snoring, gasping, pauses, or restlessness.'],
          ['Morning signs', 'Tiredness, dry mouth, or a headache.'],
          ['Daytime signs', 'Sleepiness, brain fog, or trouble staying alert.'],
        ],
      },
      appliance: {
        eyebrow: 'If care is needed, it is personalized', title: 'An appliance is one possible conversation.',
        copy: 'After appropriate sleep evaluation, a clinician may discuss a custom oral appliance for some adults. The recommendation depends on the individual and the clinical findings.',
        steps: [
          ['Complete the survey', 'Start by describing the symptoms you recognize.'],
          ['Discuss evaluation', 'A clinician can determine whether testing or another step is appropriate.'],
          ['Consider treatment options', 'If indicated, a qualified dentist can discuss a custom appliance and follow-up care.'],
        ],
        note: 'A survey does not diagnose sleep apnea, and an oral appliance is not a one-size-fits-all treatment.',
      },
    },
  },
  {
    key: 'local-sleep-next-step', navLabel: 'Local sleep next step', copyFamily: true,
    headline: 'Better sleep starts with understanding the symptoms.',
    subheadline: 'If snoring, poor rest, or daytime fatigue affects your life, begin with a short survey and a local conversation when you are ready.',
    hero: '/assets/images/hero-v2.jpg', designSystem: 'local-care-calm-direction',
    recognitionTitle: 'A practical next step.',
    recognitionIntro: 'You do not need to know what the problem is or what treatment you may need. Start by sharing the sleep patterns you are experiencing.',
    recognition: ['Tired mornings or low afternoon energy', 'Regular snoring or partner-noticed breathing changes', 'Difficulty staying alert or focused', 'Questions about whether a sleep evaluation is appropriate'],
    guidance: {
      reasons: {
        eyebrow: 'Local care, calm direction', title: 'Tell us what you are noticing.',
        copy: 'A few details can help guide the next conversation: how you feel in the morning, what a partner hears at night, and how alert you feel during the day.',
        cards: [
          ['Share the symptoms', 'Tired mornings, snoring, breathing changes, or daytime fatigue.'],
          ['Discuss appropriate evaluation', 'A qualified clinician can explain whether sleep testing is worth considering.'],
          ['Choose the next step', 'Care is based on your individual symptoms, evaluation, and preferences.'],
        ],
      },
      appliance: {
        eyebrow: 'A possible care conversation', title: 'Could a custom oral appliance fit your plan?',
        copy: 'When an evaluation supports it, some adults may benefit from an oral appliance made specifically for sleep-related breathing care. Your care team will explain whether it may be appropriate.',
        steps: [
          ['Begin with the survey', 'Share what you are experiencing without trying to diagnose it yourself.'],
          ['Review clinical findings', 'A qualified clinician determines the appropriate next step.'],
          ['Discuss suitable care', 'An oral appliance or another approach may be considered when clinically appropriate.'],
        ],
        note: 'Treatment recommendations require appropriate clinical evaluation and are individualized to each person.',
      },
    },
  },
];

function getPatientConcepts() {
  return patientConcepts;
}

function getPatientConcept(key) {
  return patientConcepts.find((concept) => concept.key === key) || null;
}

module.exports = { getPatientConcept, getPatientConcepts };
