/**
 * THANK YOU PAGE TEMPLATE
 * Shown after a qualified lead submits the form.
 */

const { layout } = require('../../shared/layout');
const { resolveCityLabel, resolvePhone } = require('../../data/index');

function renderTY(doctor, variantSlug, citySlug) {
  const variant   = doctor.variants[variantSlug];
  const cityLabel = resolveCityLabel(doctor, citySlug);
  const phone     = resolvePhone(doctor, citySlug);
  const phoneRaw  = phone.replace(/\D/g, '');

  // ── Testimonials (first 2 only on TY) ──────────────────────
  const testimonialsHTML = doctor.testimonials.slice(0, 2).map(t => `
    <div class="testimonial-card">
      <div class="testimonial-stars">★★★★★</div>
      <div class="testimonial-quote">"${t.quote}"</div>
      <div class="testimonial-name">${t.name}</div>
      <div class="testimonial-city">${t.city}</div>
    </div>`
  ).join('');

  const body = `

    <!-- ══ TY HERO ═══════════════════════════════════════════ -->
    <section class="ty-hero">
      <div class="ty-check">✓</div>
      <div class="ty-eyebrow">You Are All Set</div>
      <h1 class="ty-headline">Thank You — We Received Your Request!</h1>
      <p class="ty-sub">Someone from ${doctor.practice} will be reaching out to you shortly. In the meantime, take a moment to learn more about ${doctor.name}.</p>
    </section>

    <!-- ══ NEXT STEPS ════════════════════════════════════════ -->
    <section class="section section-white">
      <h2 class="section-title">What Happens Next</h2>
      <div class="next-steps">
        <div class="next-step-item">
          <div class="next-step-num">1</div>
          <div>
            <div class="next-step-title">We Review Your Info</div>
            <div class="next-step-desc">A member of our team looks over what you shared so we can come prepared with answers specific to your situation.</div>
          </div>
        </div>
        <div class="next-step-item">
          <div class="next-step-num">2</div>
          <div>
            <div class="next-step-title">We Give You a Call</div>
            <div class="next-step-desc">Expect a call from our office within one business day. We will walk you through your insurance coverage and schedule your free consultation.</div>
          </div>
        </div>
        <div class="next-step-item">
          <div class="next-step-num">3</div>
          <div>
            <div class="next-step-title">Your Free Sleep Consultation</div>
            <div class="next-step-desc">You come in, meet ${doctor.name}, and get a clear picture of your options — no pressure, no obligation.</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ DOCTOR ════════════════════════════════════════════ -->
    <section class="section section-light">
      <h2 class="section-title">Meet Your Doctor</h2>
      <div class="doctor-card">
        <div class="doctor-photo">
          <img src="${doctor.photo}" alt="${doctor.name}" onerror="this.style.display='none';this.parentElement.innerHTML='👨‍⚕️';" />
        </div>
        <div class="doctor-info">
          <div class="doctor-name">${doctor.name}, ${doctor.credentials}</div>
          <div class="doctor-creds">${doctor.practice}</div>
          <div class="doctor-location">📍 Serving ${cityLabel}</div>
          <div class="doctor-bio">${doctor.bio}</div>
        </div>
      </div>
    </section>

    <!-- ══ TESTIMONIALS ═══════════════════════════════════════ -->
    <section class="section section-white">
      <h2 class="section-title">What Patients Are Saying</h2>
      <div class="testimonials-list">${testimonialsHTML}</div>
    </section>

    <!-- ══ CAN'T WAIT ═════════════════════════════════════════ -->
    <section class="section section-dark" style="text-align:center;">
      <h2 class="section-title" style="color:#fff;">Can't Wait to Hear From Us?</h2>
      <p class="section-sub">Give us a call and we'll get you on the schedule right away.</p>
      <a href="tel:${phoneRaw}" class="btn-full" style="max-width:360px;margin:0 auto;">${phone}</a>
      <p style="margin-top:12px;font-size:0.8rem;color:rgba(255,255,255,0.5);">${doctor.practice} · Mon–Thu 7:30am–6:30pm</p>
    </section>

  `;

  return layout({
    title: `Thank You — ${doctor.name}`,
    theme: variant.theme,
    body,
    phone,
    phoneRaw,
  });
}

module.exports = { renderTY };
