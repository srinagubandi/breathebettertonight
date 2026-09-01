function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const pageLinks = [
  { href: '/', label: 'Home', key: 'home' },
  { href: '/symptom-check', label: 'Symptom Check', key: 'symptoms' },
  { href: '/about', label: 'About', key: 'about' },
  { href: '/faq', label: 'FAQ', key: 'faq' },
];

function siteShell({ title, description, active, body }) {
  const navigation = pageLinks.map((link) => (
    `<a href="${link.href}"${active === link.key ? ' aria-current="page"' : ''}>${link.label}</a>`
  )).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="robots" content="index,follow" />
  <meta name="theme-color" content="#0d1b2a" />
  <title>${escapeHtml(title)} | Breathe Better Tonight</title>
  <link rel="icon" type="image/png" href="/assets/images/logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,600;9..144,700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/assets/css/site.css" />
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <header class="site-header">
    <div class="site-container nav-wrap">
      <a class="brand" href="/" aria-label="Breathe Better Tonight home">
        <img src="/assets/images/logo.png" alt="" width="44" height="44" />
        <span><strong>Breathe Better</strong><em>Tonight</em></span>
      </a>
      <nav class="main-nav" aria-label="Primary navigation">${navigation}</nav>
      <a class="nav-cta" href="/contact">Get Started <span aria-hidden="true">→</span></a>
    </div>
  </header>
  <main id="main-content">${body}</main>
  <footer class="site-footer">
    <div class="site-container footer-grid">
      <div>
        <a class="brand footer-brand" href="/">
          <img src="/assets/images/logo.png" alt="" width="40" height="40" />
          <span><strong>Breathe Better</strong><em>Tonight</em></span>
        </a>
        <p>Clear, practical information for people ready to start a conversation about better sleep.</p>
      </div>
      <div class="footer-links" aria-label="Footer navigation">
        <a href="/symptom-check">Symptom Check</a>
        <a href="/about">About</a>
        <a href="/faq">FAQ</a>
        <a href="/contact">Contact</a>
      </div>
      <div class="footer-legal">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-and-conditions">Terms &amp; Conditions</a>
        <p>Information only. This site does not provide medical advice, diagnosis, or emergency services.</p>
      </div>
    </div>
    <div class="site-container footer-bottom">© ${new Date().getFullYear()} Breathe Better Tonight. All rights reserved.</div>
  </footer>
</body>
</html>`;
}

function button(href, text, variant = 'primary') {
  return `<a class="button button-${variant}" href="${href}">${text} <span aria-hidden="true">→</span></a>`;
}

function homePage() {
  const body = `
    <section class="hero">
      <div class="hero-media" aria-hidden="true"></div>
      <div class="hero-overlay" aria-hidden="true"></div>
      <div class="site-container hero-content">
        <p class="eyebrow light">A calmer way to start</p>
        <h1>Better sleep starts with a <em>better conversation.</em></h1>
        <p class="hero-copy">Breathe Better Tonight provides straightforward symptom awareness and a simple way to request a private conversation with a participating practice.</p>
        <div class="hero-actions">${button('/contact', 'Request a conversation')}${button('/symptom-check', 'Explore common signs', 'ghost')}</div>
        <p class="hero-note">No diagnosis. No pressure. Just a practical next step.</p>
      </div>
    </section>

    <section class="intro-section section-space">
      <div class="site-container split-intro">
        <p class="eyebrow">Recognize the pattern</p>
        <div>
          <h2>Rest can look normal from the outside and still leave you exhausted.</h2>
          <p>Snoring, pauses in breathing, gasping, restless nights, and low daytime energy can all be worth discussing. These signs may have more than one cause, and an appropriate clinical evaluation can help clarify what comes next.</p>
          ${button('/symptom-check', 'See common sleep signs', 'text')}
        </div>
      </div>
    </section>

    <section class="signal-section section-space">
      <div class="site-container">
        <div class="section-heading">
          <p class="eyebrow">Common signs</p>
          <h2>Notice what keeps showing up.</h2>
          <p>These patterns are not a diagnosis. They are a useful reason to begin a conversation.</p>
        </div>
        <div class="signal-grid">
          <article class="signal-card"><span class="signal-number">01</span><h3>Loud or frequent snoring</h3><p>Especially when it affects someone else’s sleep, too.</p></article>
          <article class="signal-card"><span class="signal-number">02</span><h3>Waking gasping or choking</h3><p>A sudden nighttime sensation that deserves attention.</p></article>
          <article class="signal-card"><span class="signal-number">03</span><h3>Not feeling rested</h3><p>Waking tired even after what felt like a full night.</p></article>
          <article class="signal-card"><span class="signal-number">04</span><h3>Daytime sleepiness</h3><p>Difficulty staying alert, focused, or energized throughout the day.</p></article>
        </div>
      </div>
    </section>

    <section class="steps-section section-space">
      <div class="site-container two-column">
        <div><p class="eyebrow">How it works</p><h2>A clearer next step, in three simple parts.</h2></div>
        <ol class="steps-list">
          <li><span>1</span><div><h3>Review the signs</h3><p>Use the symptom check to notice what feels familiar. It is designed for awareness, not diagnosis.</p></div></li>
          <li><span>2</span><div><h3>Send a general request</h3><p>Tell us whether you are seeking an appointment, a symptom conversation, or general information.</p></div></li>
          <li><span>3</span><div><h3>Discuss your options</h3><p>A participating practice can follow up using your preferred contact method.</p></div></li>
        </ol>
      </div>
    </section>

    <section class="cta-band">
      <div class="site-container cta-band-inner"><div><p class="eyebrow light">Ready when you are</p><h2>Start a private conversation about better sleep.</h2></div>${button('/contact', 'Get started')}</div>
    </section>`;
  return siteShell({ title: 'Better Sleep Starts Here', description: 'Symptom awareness and a simple next step for conversations about sleep.', active: 'home', body });
}

function symptomPage() {
  const body = `
    <section class="page-hero page-hero-blue"><div class="site-container narrow"><p class="eyebrow light">Symptom awareness</p><h1>Start with the signs you can recognize.</h1><p>Sleep symptoms can have more than one cause. If they persist, a qualified healthcare professional can help you determine the appropriate evaluation pathway.</p></div></section>
    <section class="section-space"><div class="site-container symptom-layout">
      <div class="symptom-list">
        <article><span>01</span><div><h2>Snoring that is loud or frequent</h2><p>Particularly when it regularly interrupts another person’s sleep.</p></div></article>
        <article><span>02</span><div><h2>Observed pauses in breathing</h2><p>Periods of quiet or a noticeable break between breaths during sleep.</p></div></article>
        <article><span>03</span><div><h2>Gasping, choking, or shortness of breath</h2><p>Sudden nighttime sensations that wake you or a partner.</p></div></article>
        <article><span>04</span><div><h2>Waking unrefreshed</h2><p>Feeling tired, foggy, or headachy despite spending enough time in bed.</p></div></article>
        <article><span>05</span><div><h2>Excessive daytime sleepiness</h2><p>Struggling to stay alert, focused, or energized during usual daily activities.</p></div></article>
      </div>
      <aside class="callout-card"><p class="eyebrow">A practical next step</p><h2>Bring the pattern to a conversation.</h2><p>A sleep study or home sleep test may be part of the diagnostic process. A practice can help you understand what is appropriate for your situation.</p>${button('/contact', 'Request a conversation')}</aside>
    </div></section>
    <section class="disclaimer"><div class="site-container">This information is for general symptom awareness only. It is not medical advice and is not a substitute for a clinical evaluation. In an emergency, call 911 or seek immediate local care.</div></section>`;
  return siteShell({ title: 'Symptom Check', description: 'Learn about common sleep-related symptoms and practical next steps.', active: 'symptoms', body });
}

function aboutPage() {
  const body = `
    <section class="page-hero page-hero-light"><div class="site-container narrow"><p class="eyebrow">About Breathe Better Tonight</p><h1>Useful information. A private next step. No pressure.</h1><p>We make it easier for people to recognize common sleep concerns and request a conversation with a participating practice.</p></div></section>
    <section class="section-space"><div class="site-container story-grid"><div><p class="eyebrow">Our purpose</p><h2>Help people move from uncertainty to an informed conversation.</h2></div><div><p>Sleep concerns are personal. Many people are unsure whether what they are experiencing is worth mentioning, or where to begin. Breathe Better Tonight provides simple, non-diagnostic context and a straightforward way to reach out.</p><p>We work with participating practices that can help visitors discuss questions, understand the next step, and identify an appropriate evaluation pathway. Each practice is independently responsible for its clinical services and patient care.</p></div></div></section>
    <section class="principles-section section-space"><div class="site-container"><p class="eyebrow">What guides us</p><div class="principles-grid"><article><h3>Clarity</h3><p>Plain language that helps visitors understand common signs without overstating what they mean.</p></article><article><h3>Privacy</h3><p>A short form that gathers only the contact details needed to begin a conversation.</p></article><article><h3>Choice</h3><p>A flexible request process for appointments, symptom conversations, or general information.</p></article></div></div></section>`;
  return siteShell({ title: 'About', description: 'Learn how Breathe Better Tonight helps visitors start informed conversations about sleep.', active: 'about', body });
}

function faqPage() {
  const questions = [
    ['Is this a diagnosis?', 'No. Breathe Better Tonight provides general symptom-awareness information. Only a qualified healthcare professional can diagnose a health condition.'],
    ['What happens after I send a request?', 'Your request is placed in a secure administrative dashboard for a participating practice to review. The practice can follow up using the contact method you select.'],
    ['Do I need to know what treatment I want?', 'No. The form is designed for people seeking an appointment, a conversation about symptoms, or general information.'],
    ['Will I need a sleep study?', 'A sleep study or home sleep test may be part of an appropriate evaluation pathway. A qualified provider can explain whether it is relevant to your circumstances.'],
    ['What information do you collect?', 'The form asks for your name, telephone number, email address, reason for inquiry, preferred contact method, and consent to be contacted. Please do not include detailed medical information in the form.'],
  ];
  const items = questions.map(([question, answer]) => `<details><summary>${question}<span aria-hidden="true">+</span></summary><p>${answer}</p></details>`).join('');
  const body = `<section class="page-hero page-hero-light"><div class="site-container narrow"><p class="eyebrow">Frequently asked questions</p><h1>Clear answers before you take the next step.</h1><p>Here is what to expect from the information on this site and from sending a general request.</p></div></section><section class="section-space"><div class="site-container faq-layout"><div class="faq-list-site">${items}</div><aside class="callout-card"><p class="eyebrow">Still have a question?</p><h2>We are here to help you get started.</h2><p>Send a general inquiry, and a participating practice can follow up by phone or email.</p>${button('/contact', 'Contact us')}</aside></div></section>`;
  return siteShell({ title: 'Frequently Asked Questions', description: 'Answers to common questions about Breathe Better Tonight and requesting a conversation.', active: 'faq', body });
}

function contactForm({ values = {}, errors = {} } = {}) {
  const value = (key) => escapeHtml(values[key] || '');
  const error = (key) => errors[key] ? `<p class="field-error" id="${key}-error">${escapeHtml(errors[key])}</p>` : '';
  const invalid = (key) => errors[key] ? ` aria-invalid="true" aria-describedby="${key}-error"` : '';
  const selected = (option) => values.inquiryType === option ? ' selected' : '';
  const checked = (option) => values.contactMethod === option ? ' checked' : '';
  const consentChecked = values.consent === 'on' ? ' checked' : '';
  const fieldErrors = Object.keys(errors).filter((key) => key !== 'form');
  const errorSummary = errors.form
    ? `<div class="form-alert" role="alert"><strong>${escapeHtml(errors.form)}</strong></div>`
    : fieldErrors.length ? `<div class="form-alert" role="alert"><strong>Please review the highlighted fields.</strong><p>All form fields below are required.</p></div>` : '';

  return `<form class="contact-form" action="/contact" method="post" novalidate>
    ${errorSummary}
    <div class="website-field" aria-hidden="true"><label>Company <input tabindex="-1" autocomplete="off" name="company" /></label></div>
    <div class="form-row">
      <div class="field"><label for="name">Full name</label><input id="name" name="name" type="text" autocomplete="name" value="${value('name')}" required${invalid('name')} />${error('name')}</div>
      <div class="field"><label for="phone">Phone number</label><input id="phone" name="phone" type="tel" autocomplete="tel" value="${value('phone')}" required${invalid('phone')} />${error('phone')}</div>
    </div>
    <div class="field"><label for="email">Email address</label><input id="email" name="email" type="email" autocomplete="email" value="${value('email')}" required${invalid('email')} />${error('email')}</div>
    <div class="field"><label for="inquiryType">What would you like help with?</label><select id="inquiryType" name="inquiryType" required${invalid('inquiryType')}><option value="">Select one</option><option${selected('Appointment request')}>Appointment request</option><option${selected('Sleep symptom consultation')}>Sleep symptom consultation</option><option${selected('General information')}>General information</option></select>${error('inquiryType')}</div>
    <fieldset class="field"><legend>Preferred contact method</legend><div class="radio-row"><label><input type="radio" name="contactMethod" value="Phone" required${checked('Phone')}${invalid('contactMethod')} /> Phone</label><label><input type="radio" name="contactMethod" value="Email" required${checked('Email')}${invalid('contactMethod')} /> Email</label></div>${error('contactMethod')}</fieldset>
    <div class="consent-wrap"><label><input type="checkbox" name="consent" required${consentChecked}${invalid('consent')} /> <span>I agree to be contacted about this general inquiry by my selected method. I understand this form is not for emergencies and I will not include detailed medical information.</span></label>${error('consent')}</div>
    <button class="button button-primary button-submit" type="submit">Send my request <span aria-hidden="true">→</span></button>
    <p class="form-note">By submitting, you agree to our <a href="/privacy-policy">Privacy Policy</a>. Please call 911 or seek immediate local care in an emergency.</p>
  </form>`;
}

function contactPage(options = {}) {
  const body = `<section class="contact-hero"><div class="site-container contact-grid"><div><p class="eyebrow light">Start here</p><h1>Take the next step at your own pace.</h1><p>Send a brief, general request. A participating practice can respond by phone or email to help you explore an appointment, discuss symptoms, or find information.</p><div class="contact-benefits"><p><span>✓</span> Clear, general questions only</p><p><span>✓</span> Choose how you want to be contacted</p><p><span>✓</span> No diagnosis or treatment advice through this form</p></div></div><div class="form-card"><p class="eyebrow">Request a conversation</p><h2>How can we help?</h2>${contactForm(options)}</div></div></section>`;
  return siteShell({ title: 'Get Started', description: 'Request an appointment, a sleep symptom conversation, or general information.', active: 'contact', body });
}

function thankYouPage() {
  const body = `<section class="thank-you-section"><div class="site-container narrow center"><div class="success-mark" aria-hidden="true">✓</div><p class="eyebrow">Request received</p><h1>Thank you for reaching out.</h1><p class="lead-copy">Your general request has been received. A participating practice can follow up using the contact method you selected.</p><div class="next-steps"><div><span>1</span><p>Your inquiry is reviewed in the protected administrative dashboard.</p></div><div><span>2</span><p>A practice can use your preferred method to follow up.</p></div><div><span>3</span><p>You can discuss questions and the appropriate next step.</p></div></div>${button('/', 'Return to the home page', 'secondary')}<p class="form-note">If you are experiencing an emergency, call 911 or seek immediate local care.</p></div></section>`;
  return siteShell({ title: 'Thank You', description: 'Your Breathe Better Tonight request has been received.', active: 'contact', body });
}

function privacyPage() {
  const body = `<section class="page-hero page-hero-light"><div class="site-container narrow"><p class="eyebrow">Privacy Policy</p><h1>Your privacy matters.</h1><p>Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p></div></section><section class="legal-section section-space"><div class="site-container narrow legal-copy"><p>Breathe Better Tonight collects the information you voluntarily provide through the contact form: your name, phone number, email address, reason for inquiry, preferred contact method, and consent to be contacted. Please do not submit detailed medical, insurance, or other sensitive information through the form.</p><h2>How we use information</h2><p>We use submitted information only to review a general inquiry and enable appropriate follow-up by a participating practice. We do not use the form to provide diagnosis, treatment, or emergency services.</p><h2>How information is stored</h2><p>Form submissions are stored in a protected administrative area. Access is restricted to authorized users responsible for reviewing and responding to inquiries.</p><h2>Your choices</h2><p>You may ask a participating practice not to contact you further. If you have a privacy question, contact the practice that follows up with you.</p></div></section>`;
  return siteShell({ title: 'Privacy Policy', description: 'Breathe Better Tonight privacy information.', active: '', body });
}

function termsPage() {
  const body = `<section class="page-hero page-hero-light"><div class="site-container narrow"><p class="eyebrow">Terms &amp; Conditions</p><h1>Important information about using this site.</h1><p>Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p></div></section><section class="legal-section section-space"><div class="site-container narrow legal-copy"><h2>Informational purpose</h2><p>Breathe Better Tonight provides general symptom-awareness information. It does not provide medical advice, diagnosis, treatment recommendations, or emergency services. Health concerns should be discussed with a qualified healthcare professional.</p><h2>No emergency use</h2><p>Do not use this site or its contact form for urgent or emergency needs. If you believe you are experiencing an emergency, call 911 or seek immediate local care.</p><h2>Participating practices</h2><p>Participating practices are independently responsible for their own services, communications, clinical decisions, and patient care. Submitting a request does not create a patient-provider relationship.</p><h2>Contact form</h2><p>By submitting a general request, you authorize follow-up through the contact method you select. Do not include detailed health information, insurance information, or other sensitive information in the form.</p></div></section>`;
  return siteShell({ title: 'Terms & Conditions', description: 'Terms for using Breathe Better Tonight.', active: '', body });
}

module.exports = {
  aboutPage,
  contactPage,
  faqPage,
  homePage,
  privacyPage,
  symptomPage,
  thankYouPage,
  termsPage,
};
