/**
 * BELOW-TARGET THANK YOU PAGE TEMPLATE (TY-BT)
 * Shown when a lead does not meet qualification criteria.
 * Keeps the experience warm and non-dismissive.
 * Still shows doctor info and a soft CTA to call.
 */

const { layout } = require('../../shared/layout');
const { resolveCityLabel, resolvePhone } = require('../../data/index');

function renderTYBT(doctor, variantSlug, citySlug) {
  const variant   = doctor.variants[variantSlug];
  const cityLabel = resolveCityLabel(doctor, citySlug);
  const phone     = resolvePhone(doctor, citySlug);
  const phoneRaw  = phone.replace(/\D/g, '');

  const body = `

    <!-- ══ TY-BT HERO ════════════════════════════════════════ -->
    <section class="ty-hero">
      <div class="ty-check" style="background:var(--accent);">ℹ</div>
      <div class="ty-eyebrow">We Received Your Request</div>
      <h1 class="ty-headline">Thank You for Reaching Out</h1>
      <p class="ty-sub">Based on what you shared, we want to make sure you get the right care. A member of our team will review your information and reach out to discuss the best options available to you.</p>
    </section>

    <!-- ══ WHAT HAPPENS NEXT ══════════════════════════════════ -->
    <section class="section section-white">
      <h2 class="section-title">What Happens Next</h2>
      <div class="next-steps">
        <div class="next-step-item">
          <div class="next-step-num">1</div>
          <div>
            <div class="next-step-title">We Review Your Information</div>
            <div class="next-step-desc">Our team will carefully review what you shared to understand your situation and identify the most appropriate next steps.</div>
          </div>
        </div>
        <div class="next-step-item">
          <div class="next-step-num">2</div>
          <div>
            <div class="next-step-title">We'll Be in Touch</div>
            <div class="next-step-desc">A team member will reach out within one business day to discuss your options and answer any questions you have.</div>
          </div>
        </div>
        <div class="next-step-item">
          <div class="next-step-num">3</div>
          <div>
            <div class="next-step-title">We'll Find the Right Path</div>
            <div class="next-step-desc">Even if oral appliance therapy isn't the right fit right now, we're committed to helping you find a solution that works for your situation.</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ DOCTOR ════════════════════════════════════════════ -->
    <section class="section section-light">
      <h2 class="section-title">About ${doctor.name}</h2>
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

    <!-- ══ SOFT CTA ═══════════════════════════════════════════ -->
    <section class="section section-dark" style="text-align:center;">
      <h2 class="section-title" style="color:#fff;">Have Questions?</h2>
      <p class="section-sub">Our team is happy to talk through your options. Give us a call — no pressure, no obligation.</p>
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

module.exports = { renderTYBT };
