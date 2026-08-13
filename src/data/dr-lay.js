/**
 * Dr. Willis Lay configuration.
 *
 * This is data-only. Add a city under `cities` or a landing-page object under
 * `variants`; routes are registered automatically by the existing route system.
 */
module.exports = {
  slug: 'dr-lay',
  name: 'Dr. Willis Lay',
  credentials: 'DDS',
  practice: 'Pantego Dental',
  phone: '(817) 274-1825',
  phoneRaw: '8172741825',
  address: '1810 S Bowen Rd, Pantego, TX 76013',
  state: 'TX',
  website: 'https://www.drwillislay.com/',

  cities: [
    { slug: 'arlington-tx', label: 'Arlington, TX', phone: null },
    { slug: 'pantego-tx', label: 'Pantego, TX', phone: null },
    { slug: 'grand-prairie-tx', label: 'Grand Prairie, TX', phone: null },
    { slug: 'mansfield-tx', label: 'Mansfield, TX', phone: null },
    { slug: 'fort-worth-tx', label: 'Fort Worth, TX', phone: null },
  ],

  // Keep these placeholders until approved provider content is supplied.
  profile: {
    photo: null,
    photoLabel: 'Doctor photo',
    bioPlaceholder: 'Provider bio placeholder — add approved experience, qualifications, and service area.',
    reviewLabel: 'Verified review placeholder',
    reviewQuote: 'Add verified patient feedback here.',
    reviewAttribution: 'Patient Initial, City',
  },

  // The shared approved copy used by all ten LP visual treatments.
  // Keep health language simple, symptom-led, and non-diagnostic.
  sharedContent: {
    eyebrow: 'Private symptom check',
    headline: 'Do these sleep symptoms sound familiar?',
    subheadline: 'Loud snoring, gasping, and waking exhausted deserve a closer look.',
    cta: 'Start a private symptom check',
    symptomTitle: 'Start with the signs you can recognize.',
    symptomIntro: 'Select what sounds familiar. This screen is for awareness only.',
    symptoms: [
      { icon: 'sound', label: 'Loud or frequent snoring', desc: 'Especially when it disturbs a partner.' },
      { icon: 'pause', label: 'Pauses in breathing', desc: 'Often noticed by someone else.' },
      { icon: 'air', label: 'Waking gasping or choking', desc: 'A nighttime sign worth discussing.' },
      { icon: 'sun', label: 'Tired after a full night', desc: 'Low energy can carry into the day.' },
    ],
  },

  faqs: [
    {
      q: 'Is this symptom screen a diagnosis?',
      a: 'No. It is a private way to recognize common sleep-related symptoms. A qualified healthcare professional can evaluate sleep concerns and determine next steps.',
    },
    {
      q: 'What happens after I recognize these symptoms?',
      a: 'You can contact the practice to discuss your concerns and the appropriate evaluation pathway. A sleep study or home sleep test may be needed to diagnose sleep apnea.',
    },
  ],

  // Every variant auto-generates LP, thank-you, below-target, city, and admin routes.
  variants: {
    v1: {
      label: 'Symptom Self-Check — Navy / Teal',
      theme: 'v1',
      designSystem: 'signal-check',
      hero: '/assets/images/symptom-v1.jpg',
      eyebrow: 'Symptom self-check',
      headline: 'Do these sleep symptoms sound familiar?',
      subheadline: 'Loud snoring, gasping, and waking exhausted deserve a closer look.',
      cta: 'Start a private symptom check',
      symptomTitle: 'Start with the signs you can recognize.',
      symptomIntro: 'Select what sounds familiar. This screen is for awareness only.',
      symptoms: [
        { icon: 'sound', label: 'Loud or frequent snoring', desc: 'Especially when it disturbs a partner.' },
        { icon: 'pause', label: 'Pauses in breathing', desc: 'Often noticed by someone else.' },
        { icon: 'air', label: 'Waking gasping or choking', desc: 'A nighttime sign worth discussing.' },
        { icon: 'sun', label: 'Tired after a full night', desc: 'Low energy can carry into the day.' },
      ],
    },
    v2: {
      label: 'The Morning After — Charcoal / Amber',
      theme: 'v2',
      designSystem: 'morning-after',
      hero: '/assets/images/symptom-v2.jpg',
      eyebrow: 'The morning after',
      headline: 'How did you wake up today?',
      subheadline: 'Foggy. Headachy. Still not rested?',
      cta: 'Review my symptoms',
      symptomTitle: 'Morning signs to notice.',
      symptomIntro: 'These symptoms can have many causes. They are worth discussing when they persist.',
      symptoms: [
        { icon: 'sun', label: 'Woke up unrefreshed', desc: 'Even after what seemed like a full night.' },
        { icon: 'head', label: 'Morning headaches', desc: 'A common sign to mention at an evaluation.' },
        { icon: 'drop', label: 'Dry mouth or sore throat', desc: 'Notice how often it happens on waking.' },
        { icon: 'focus', label: 'Brain fog or irritability', desc: 'Sleep quality can affect your day.' },
      ],
    },
    v3: {
      label: 'Partner Signal — Midnight / Cyan',
      theme: 'v3',
      designSystem: 'partner-signal',
      hero: '/assets/images/symptom-v3.jpg',
      eyebrow: 'Partner signal',
      headline: 'Your partner may notice the signs first.',
      subheadline: 'Some sleep symptoms are easier for someone else to spot.',
      cta: 'See what these signs may mean',
      symptomTitle: 'What a bed partner may notice.',
      symptomIntro: 'Use these observations to start a calm, private conversation.',
      symptoms: [
        { icon: 'sound', label: 'Loud or frequent snoring', desc: 'That interrupts their sleep too.' },
        { icon: 'pause', label: 'Pauses in breathing', desc: 'Periods of quiet between breaths.' },
        { icon: 'air', label: 'Gasping or choking sounds', desc: 'Sudden sounds during the night.' },
        { icon: 'move', label: 'Restless movement', desc: 'Tossing, turning, or disrupted sleep.' },
      ],
    },
    v4: {
      label: 'Energy Debt — Light / Blue',
      theme: 'v4',
      designSystem: 'energy-audit',
      hero: '/assets/images/symptom-v4.jpg',
      eyebrow: 'Energy debt',
      headline: 'Is your day running on empty?',
      subheadline: 'Your energy symptoms may start the night before.',
      cta: 'Take the energy check',
      symptomTitle: 'Daytime signs to notice.',
      symptomIntro: 'These patterns can make everyday life feel harder than it should.',
      symptoms: [
        { icon: 'battery', label: 'Afternoon crash', desc: 'Energy drops when you need it most.' },
        { icon: 'focus', label: 'Trouble focusing', desc: 'Losing focus in routine moments.' },
        { icon: 'spark', label: 'Low motivation', desc: 'Feeling drained before the day is over.' },
        { icon: 'sun', label: 'Excessive daytime sleepiness', desc: 'Struggling to stay alert in the day.' },
      ],
    },
    v5: {
      label: 'Sleep Pattern Check — Indigo / Violet',
      theme: 'v5',
      designSystem: 'night-pattern',
      hero: '/assets/images/symptom-v5.jpg',
      eyebrow: 'Sleep pattern check',
      headline: 'What is your sleep pattern saying?',
      subheadline: 'Notice the symptoms. Understand the pattern.',
      cta: 'Get my sleep pattern check',
      symptomTitle: 'Tonight’s symptom check.',
      symptomIntro: 'A private place to notice the patterns that may be affecting your rest.',
      symptoms: [
        { icon: 'moon', label: 'Waking up more than once', desc: 'Repeated interruptions can affect rest.' },
        { icon: 'air', label: 'Waking short of breath', desc: 'A symptom to bring up with a provider.' },
        { icon: 'move', label: 'Restless sleep', desc: 'Tossing and turning through the night.' },
        { icon: 'sun', label: 'Tired even after sleeping', desc: 'Daytime sleepiness or low energy.' },
      ],
    },
    v6: {
      label: 'Partner Impact — Navy / Teal',
      theme: 'v6',
      designSystem: 'shared-sleep',
      hero: '/assets/images/symptom-v6.jpg',
      eyebrow: 'Partner impact',
      headline: 'Is their snoring keeping you awake?',
      subheadline: 'One person’s sleep symptoms can affect both of you.',
      cta: 'Start a private symptom check',
      symptomTitle: 'Signs you may notice.',
      symptomIntro: 'A respectful way to recognize sleep signs that affect the whole room.',
      symptoms: [
        { icon: 'sound', label: 'Loud or frequent snoring', desc: 'Noise that disrupts a partner’s rest.' },
        { icon: 'pause', label: 'Pauses in breathing', desc: 'A noticeable break between breaths.' },
        { icon: 'air', label: 'Gasping or choking sounds', desc: 'Sudden noises in the night.' },
        { icon: 'move', label: 'Restless movement', desc: 'Sleep that looks visibly unsettled.' },
      ],
    },
    v7: {
      label: 'Proof Wall — Blue / Cream',
      theme: 'v1',
      designSystem: 'proof-wall',
      hero: '/assets/images/symptom-v1.jpg',
    },
    v8: {
      label: 'Calm Checklist — Sage / Paper',
      theme: 'v4',
      designSystem: 'calm-checklist',
      hero: '/assets/images/symptom-v4.jpg',
    },
    v9: {
      label: 'Pulse Grid — Coral / Fuchsia',
      theme: 'v6',
      designSystem: 'pulse-grid',
      hero: '/assets/images/symptom-v3.jpg',
    },
    v10: {
      label: 'Quiet Minimal — Monochrome',
      theme: 'v5',
      designSystem: 'quiet-minimal',
      hero: '/assets/images/symptom-v2.jpg',
    },
  },

  adminLabel: 'Dr. Willis Lay — Pantego Dental — Arlington, TX',
};
