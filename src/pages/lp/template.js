/**
 * LP TEMPLATE
 * ═══════════════════════════════════════════════════════════════
 * Renders a full landing page for any doctor + variant + city.
 * All content comes from the doctor config file.
 * To change copy, colors, or structure — edit the config or CSS.
 * ═══════════════════════════════════════════════════════════════
 */

const { layout } = require('../../shared/layout');
const { resolveCityLabel, resolvePhone } = require('../../data/index');

/**
 * Replaces {city} tokens in strings with the resolved city label.
 */
function injectCity(str, cityLabel) {
  return str.replace(/\{city\}/g, cityLabel);
}

/**
 * Renders the full LP HTML.
 * @param {object} doctor      — doctor config object
 * @param {string} variantSlug — e.g. 'v1'
 * @param {string|null} citySlug — e.g. 'arlington-tx' or null
 */
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

  // ── Stats ───────────────────────────────────────────────────
  const statsHTML = doctor.stats.map(s => `
    <div class="stat-item">
      <div class="stat-value">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </div>`
  ).join('');

  // ── Symptoms ────────────────────────────────────────────────
  const symptomsHTML = doctor.symptoms.map(s => `
    <div class="symptom-item">
      <div class="symptom-icon">${s.icon}</div>
      <div>
        <div class="symptom-label">${s.label}</div>
        <div class="symptom-desc">${s.desc}</div>
      </div>
    </div>`
  ).join('');

  // ── Steps ───────────────────────────────────────────────────
  const stepsHTML = doctor.steps.map(s => `
    <div class="step-item">
      <div class="step-num">${s.num}</div>
      <div>
        <div class="step-title">${s.title}</div>
        <div class="step-desc">${s.desc}</div>
      </div>
    </div>`
  ).join('');

  // ── Testimonials ────────────────────────────────────────────
  const testimonialsHTML = doctor.testimonials.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-stars">★★★★★</div>
      <div class="testimonial-quote">"${t.quote}"</div>
      <div class="testimonial-name">${t.name}</div>
      <div class="testimonial-city">${t.city}</div>
    </div>`
  ).join('');

  // ── FAQ ─────────────────────────────────────────────────────
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
           GHL EMBED — Replace the placeholder below with your
           GoHighLevel form JavaScript embed code.
           The div id="ghl-form-embed" is your target container.
      ════════════════════════════════════════════════════ -->
      <div id="ghl-form-embed">
        <div class="ghl-embed-placeholder">
          📋 GoHighLevel Form Embed<br/>
          <small>Replace this block with your GHL JavaScript embed code.</small>
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
      <h2 class="section-title" style="color:#fff;">Ready to Sleep Better?</h2>
      <p class="section-sub">Your free consultation with ${doctor.name} is the first step.</p>
      <a href="#ghl-form" class="btn-full" style="max-width:400px;margin:0 auto;">${variant.cta}</a>
      <p style="margin-top:16px;font-size:0.85rem;color:rgba(255,255,255,0.6);">
        Or call us directly: <a href="tel:${phoneRaw}" style="color:#fff;font-weight:700;">${phone}</a>
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
