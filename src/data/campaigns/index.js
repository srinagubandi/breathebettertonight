/**
 * Canonical paid-traffic campaigns. Each campaign takes its entry point and
 * hero image from the currently approved generic ad collection.
 */
const campaigns = [
  {
    key: 'tired-mornings',
    navLabel: 'Tired mornings',
    eyebrow: 'Sleep awareness',
    headline: 'Still tired when the day begins?',
    subheadline: 'Restless nights and waking unrefreshed can be worth a private conversation.',
    hero: '/assets/images/ads/tired-mornings.png',
    designSystem: 'morning-signal',
    recognitionTitle: 'Notice the morning pattern.',
    recognition: ['Waking up tired after a full night', 'Restless or interrupted sleep', 'Morning headaches or dry mouth', 'Low energy before the day has begun'],
  },
  {
    key: 'focus-and-brain-fog',
    navLabel: 'Focus and brain fog',
    eyebrow: 'Daytime signal',
    headline: 'When focus fades, look at the night before.',
    subheadline: 'Low daytime energy and brain fog can have more than one cause. They are worth discussing when they persist.',
    hero: '/assets/images/ads/focus-and-brain-fog.png',
    designSystem: 'clarity-signal',
    recognitionTitle: 'A pattern to bring up.',
    recognition: ['Trouble staying focused', 'Afternoon sleepiness', 'Irritability or mental fatigue', 'Feeling unrefreshed despite time in bed'],
  },
  {
    key: 'partner-noticed-snoring',
    navLabel: 'Partner-noticed snoring',
    eyebrow: 'Partner signal',
    headline: 'When snoring keeps two people awake.',
    subheadline: 'A partner may notice loud snoring, pauses, or gasping before the sleeper does.',
    hero: '/assets/images/ads/partner-noticed-snoring.png',
    designSystem: 'shared-sleep-signal',
    recognitionTitle: 'What a partner may notice.',
    recognition: ['Loud or frequent snoring', 'Pauses in breathing', 'Gasping or choking sounds', 'Restless movement through the night'],
  },
];

function getCampaigns() {
  return campaigns;
}

function getCampaign(key) {
  return campaigns.find((campaign) => campaign.key === key) || null;
}

module.exports = { getCampaigns, getCampaign };
