/**
 * LP TEMPLATE — v1.1.0
 * Updated to match mockup designs precisely.
 */

const { layout } = require('../../shared/layout');
const { resolveCityLabel, resolvePhone } = require('../../data/index');

function injectCity(str, cityLabel) {
  return str.replace(/\{city\}/g, cityLabel);
}

// Stat icons (SVG inline, teal on dark bg)
const STAT_ICONS = [
  // People/group icon
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
  // Trending down icon
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"/></svg>`,
  // Shield/check icon
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>`,
];

function renderLP(doctor, variantSlug, citySlug) {
  const variant   = doctor.variants[variantSlug];
  const cityLabel = resolveCityLabel(doctor, citySlug);
  const phone     = resolvePhone(doctor, citySlug);
  const phoneRaw  = phone.replace(/\D/g, '');
  const headline  = injectCity(variant.headline, cityLabel);
  const subhead   = injectCity(variant.subheadline, cityLabel);

  // ── Badges ──────────────────────────────────────────────────
  const badgesHTML = doctor.badges.map(b =>
    `<span class="hero-badge">${b.icon} ${b.label}</span>`
  ).join('');

  // ── Stats — cards with icons ─────────────────────────────────
  const statsHTML = doctor.stats.map((s, i) => `
    <div class="stat-item">
      <div class="stat-icon">${STAT_ICONS[i] || '★'}</div>
      <div class="stat-value">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </div>`
  ).join('');

  // ── Symptoms — circular icon containers ──────────────────────
  const symptomsHTML = doctor.symptoms.map(s => `
    <div class="symptom-item">
      <div class="symptom-icon-wrap">${s.icon}</div>
      <div>
        <div class="symptom-label">${s.label}</div>
        <div class="symptom-desc">${s.desc}</div>
      </div>
    </div>`
  ).join('');

  // ── Steps ────────────────────────────────────────────────────
  const stepsHTML = doctor.steps.map(s => `
    <div class="step-item">
      <div class="step-num">${s.num}</div>
      <div>
        <div class="step-title">${s.title}</div>
        <div class="step-desc">${s.desc}</div>
      </div>
    </div>`
  ).join('');

  // ── Testimonials ─────────────────────────────────────────────
  const testimonialsHTML = doctor.testimonials.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-stars">★★★★★</div>
      <div class="testimonial-quote">"${t.quote}"</div>
      <div class="testimonial-name">${t.name}</div>
      <div class="testimonial-city">${t.city}</div>
    </div>`
  ).join('');

  // ── FAQ ──────────────────────────────────────────────────────
  const faqHTML = doctor.faqs.map(f => `
    <div class="faq-item">
      <button class="faq-question">${f.q}</button>
      <div class="faq-answer">${f.a}</div>
    </div>`
  ).join('');

  // ── Doctor photo ─────────────────────────────────────────────
  const photoHTML = `<div class="doctor-photo">
    <img src="${doctor.photo}" alt="${doctor.name}" onerror="this.style.display='none';this.parentElement.innerHTML='👨‍⚕️';" />
  </div>`;

  // ── Body ─────────────────────────────────────────────────────
  const body = `

    <!-- ══ HERO ══════════════════════════════════════════════ -->
    <section class="hero">
      <div class="hero-bg" style="background-image:url('${variant.hero}');"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-eyebrow">BreatheBetterTonight.com</div>
        <h1 class="hero-headline">${headline}</h1>
        <p class="hero-sub">${subhead}</p>
        <div class="hero-badges">${badgesHTML}</div>
        <a href="#ghl-form" class="btn-full">${variant.cta}</a>
      </div>
    </section>

    <!-- ══ STATS BAR ═════════════════════════════════════════ -->
    <div class="stats-bar">${statsHTML}</div>

    <!-- ══ SYMPTOMS ══════════════════════════════════════════ -->
    <section class="section section-dark">
      <h2 class="section-title">Sound Familiar?</h2>
      <p class="section-sub">You're not alone. Millions of people suffer from these symptoms every night.</p>
      <div class="symptoms-list">${symptomsHTML}</div>
    </section>

    <!-- ══ SOLUTION ══════════════════════════════════════════ -->
    <section class="section section-light">
      <h2 class="section-title">There Is a Better Way</h2>
      <p class="section-sub">An oral appliance is a small, custom-fitted device you wear while you sleep — no mask, no hose, no noise. Most patients covered by medical insurance or Medicare.</p>
      <div class="steps-list">${stepsHTML}</div>
    </section>

    <!-- ══ DOCTOR ════════════════════════════════════════════ -->
    <section class="section section-white">
      <h2 class="section-title">Your Doctor</h2>
      <div class="doctor-card">
        ${photoHTML}
        <div class="doctor-info">
          <div class="doctor-name">${doctor.name}, ${doctor.credentials}</div>
          <div class="doctor-creds">${doctor.practice}</div>
          <div class="doctor-location">📍 Serving ${cityLabel}</div>
          <div class="doctor-badge">★ ${doctor.badges[0].label}</div>
          <div class="doctor-bio">${doctor.bio}</div>
        </div>
      </div>
    </section>

    <!-- ══ TESTIMONIALS ═══════════════════════════════════════ -->
    <section class="section section-light">
      <h2 class="section-title">What Patients Are Saying</h2>
      <div class="testimonials-list">${testimonialsHTML}</div>
    </section>

    <!-- ══ GHL FORM ═══════════════════════════════════════════ -->
    <section class="ghl-form-section" id="ghl-form">
      <h2 class="ghl-form-title">Claim Your Free Sleep Consultation</h2>
      <p class="ghl-form-sub">Takes less than 60 seconds. No obligation. Often covered by insurance.</p>
      <!-- ════════════════════════════════════════════════════
           GHL EMBED — Replace the div below with your
           GoHighLevel JavaScript embed code.
      ════════════════════════════════════════════════════ -->
      <div id="ghl-form-embed">
        <div class="ghl-embed-placeholder">
          <div class="ghl-icon">📋</div>
          <div class="ghl-label">Consultation Form</div>
          <div class="ghl-sub">Replace this block with your GHL JavaScript embed code.</div>
        </div>
      </div>
    </section>

    <!-- ══ FAQ ════════════════════════════════════════════════ -->
    <section class="section section-white">
      <h2 class="section-title">Common Questions</h2>
      <div class="faq-list">${faqHTML}</div>
    </section>

    <!-- ══ BOTTOM CTA ═════════════════════════════════════════ -->
    <section class="section section-dark" style="text-align:center;">
      <h2 class="section-title" style="color:#fff;margin-bottom:8px;">Ready to Sleep Better?</h2>
      <p class="section-sub" style="margin-bottom:24px;">Your free consultation with ${doctor.name} is the first step.</p>
      <a href="#ghl-form" class="btn-full" style="max-width:420px;margin:0 auto 16px;">${variant.cta}</a>
      <p style="font-size:0.85rem;color:rgba(255,255,255,0.55);">
        Or call: <a href="tel:${phoneRaw}" style="color:#fff;font-weight:700;">${phone}</a>
      </p>
    </section>

  `;

  return layout({
    title: `${headline} — ${doctor.name}, ${cityLabel}`,
    theme: variant.theme,
    body,
    phone,
    phoneRaw,
  });
}

module.exports = { renderLP };
