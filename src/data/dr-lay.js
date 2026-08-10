/**
 * DOCTOR CONFIG — Dr. Willis Lay
 * ═══════════════════════════════════════════════════════════════
 * HOW TO ADD A NEW DOCTOR:
 *   1. Copy this file to src/data/dr-[slug].js
 *   2. Update all fields below
 *   3. Register it in src/data/index.js
 *   That's it — routes, pages, and admin listing auto-generate.
 *
 * HOW TO ADD A NEW CITY:
 *   Add an entry to the `cities` array below.
 *   The city name will be injected into LP copy automatically.
 *
 * HOW TO ADD A NEW VARIANT:
 *   Add an entry to the `variants` object below.
 *   A new LP, TY, and TY-BT page will be auto-generated.
 * ═══════════════════════════════════════════════════════════════
 */

module.exports = {

  // ── Identity ──────────────────────────────────────────────────
  slug:        'dr-lay',
  name:        'Dr. Willis Lay',
  credentials: 'DDS',
  practice:    'Pantego Dental',
  phone:       '(817) 274-1825',
  phoneRaw:    '8172741825',
  address:     '1810 S Bowen Rd, Pantego, TX 76013',
  state:       'TX',
  website:     'https://www.drwillislay.com/',
  photo:       '/assets/images/dr-lay-photo.jpg', // Replace with real headshot

  // ── Cities served ─────────────────────────────────────────────
  // Each city gets its own LP copy injection.
  // slug is used in the URL: /dr-lay/v1/arlington-tx
  // label is displayed on the page.
  // phone can override the default phone per city (e.g. call tracking number).
  cities: [
    { slug: 'arlington-tx',    label: 'Arlington, TX',    phone: null }, // null = use default
    { slug: 'pantego-tx',      label: 'Pantego, TX',      phone: null },
    { slug: 'grand-prairie-tx',label: 'Grand Prairie, TX',phone: null },
    { slug: 'mansfield-tx',    label: 'Mansfield, TX',    phone: null },
    { slug: 'fort-worth-tx',   label: 'Fort Worth, TX',   phone: null },
    // Add more cities here — no code changes needed
  ],

  // ── Doctor bio ────────────────────────────────────────────────
  bio: 'Dr. Willis Lay has served the Arlington and Pantego community for years, offering a full range of dental services including oral appliance therapy for patients struggling with sleep apnea and snoring. His practice accepts most major insurance plans and offers medical billing for qualifying sleep treatments.',

  // ── Trust badges ──────────────────────────────────────────────
  badges: [
    { icon: '✓', label: 'Family Dentist' },
    { icon: '✓', label: 'Medicare & Insurance' },
    { icon: '✓', label: 'Free Consult' },
  ],

  // ── Stats bar ─────────────────────────────────────────────────
  stats: [
    { value: '80%', label: 'of Sleep Apnea Goes Undiagnosed' },
    { value: '50%', label: 'of CPAP Users Quit Within a Year' },
    { value: '$0',  label: 'Out of Pocket With Insurance*' },
  ],

  // ── Symptoms ──────────────────────────────────────────────────
  symptoms: [
    { icon: '😤', label: 'Loud Snoring',      desc: 'Disrupts your sleep and your partner\'s.' },
    { icon: '😴', label: 'Daytime Fatigue',   desc: 'Low energy, poor focus, no motivation.' },
    { icon: '😮', label: 'CPAP Intolerance',  desc: 'Uncomfortable, inconvenient, unsustainable.' },
  ],

  // ── How it works ──────────────────────────────────────────────
  steps: [
    { num: '1', title: 'Free Consultation',       desc: 'We evaluate your sleep and discuss your options at no cost.' },
    { num: '2', title: 'Insurance Verified',       desc: 'We check your benefits and confirm your coverage upfront.' },
    { num: '3', title: 'Custom Appliance Fitted',  desc: 'Your custom oral appliance is made for comfort and lasting results.' },
  ],

  // ── Testimonials ──────────────────────────────────────────────
  testimonials: [
    {
      quote: 'From the moment I arrived I knew I had chosen the right place. Dr. Lay explained everything clearly. I no longer snore and my wife finally sleeps through the night.',
      name:  'Anas L.',
      city:  'Arlington, TX',
    },
    {
      quote: 'Dr. Lay took the time to show me exactly what to expect. The oral appliance has been life-changing — I wake up feeling rested for the first time in years.',
      name:  'Eng W.',
      city:  'Pantego, TX',
    },
    {
      quote: 'I was skeptical at first but the team was so professional. My sleep apnea is under control and I didn\'t have to deal with a CPAP machine at all.',
      name:  'Maria S.',
      city:  'Grand Prairie, TX',
    },
  ],

  // ── FAQ ───────────────────────────────────────────────────────
  faqs: [
    {
      q: 'Will my insurance cover oral appliance therapy?',
      a: 'Most major medical insurance plans and Medicare cover oral appliance therapy for diagnosed sleep apnea. Our team verifies your coverage before your first appointment.',
    },
    {
      q: 'How is this different from a CPAP machine?',
      a: 'An oral appliance is a small, custom-fitted device you wear in your mouth while you sleep — no mask, no hose, no noise. Most patients find it far more comfortable.',
    },
    {
      q: 'Do I need a sleep study first?',
      a: 'A sleep study or existing diagnosis is typically required. We can help guide you through the process and work with your physician.',
    },
    {
      q: 'How long does treatment take?',
      a: 'Most patients are fitted within 2–3 weeks of their consultation. Follow-up adjustments ensure optimal results.',
    },
  ],

  // ── LP Variants ───────────────────────────────────────────────
  // Add as many variants as needed.
  // Each variant auto-generates: LP, TY page, TY-BT page.
  // URL pattern: /[doctor-slug]/[variant-slug]
  // With city:   /[doctor-slug]/[variant-slug]/[city-slug]
  variants: {
    v1: {
      label:       'Dark Navy / Teal — "Tired of Your CPAP?"',
      theme:       'v1',
      hero:        '/assets/images/hero-v1.jpg',
      headline:    'Tired of Your CPAP?',
      subheadline: '{city} Patients Are Sleeping Better Without It.',
      cta:         'SEE IF YOU QUALIFY — FREE',
    },
    v2: {
      label:       'Warm Dark / Amber — "Wake Up Feeling Human Again"',
      theme:       'v2',
      hero:        '/assets/images/hero-v2.jpg',
      headline:    'Wake Up Feeling Human Again.',
      subheadline: 'Dr. Willis Lay serves {city} and surrounding areas.',
      cta:         'CLAIM MY FREE SLEEP CONSULT',
    },
    v3: {
      label:       'Clean Light / Blue — "No Mask. No Hose. Just Sleep."',
      theme:       'v3',
      hero:        '/assets/images/hero-v3.jpg',
      headline:    'No Mask. No Hose. Just Sleep.',
      subheadline: '{city} — Dr. Willis Lay, DDS',
      cta:         'CHECK MY INSURANCE COVERAGE',
    },
    // Add more variants here — no code changes needed
  },

  // ── Admin listing metadata ────────────────────────────────────
  adminLabel: 'Dr. Willis Lay — Pantego Dental — Arlington, TX',
};
