/** Shared identity-led dentist profile for public LPs; never add unverified biographical claims. */
const { escapeHtml } = require('./escape');
const { medicalIcon } = require('./medical-icons');

function renderDentistProfile({ practice, doctorName, credentials, locationLabel }) {
  if (!practice || practice.showPracticeName === false || practice.showDentistProfile === false) return '';
  const safeDoctorName = escapeHtml(doctorName || practice.doctorName || 'Your local dentist');
  const safeCredentials = escapeHtml(credentials || practice.credentials || 'Dental credentials');
  const safePracticeName = escapeHtml(practice.publicName || practice.campaignDestination || 'Local practice');
  const safeLocation = escapeHtml(locationLabel || practice.serviceLabel || 'your local area');
  const showDentistPhoto = practice.showDentistPhoto !== false;
  const approvedPortrait = showDentistPhoto && practice.portraitStatus === 'Approved for publication' && practice.portraitUrl;
  const safePortraitUrl = approvedPortrait ? escapeHtml(practice.portraitUrl) : '';
  const safePortraitAlt = escapeHtml(practice.portraitAlt || `${practice.doctorName || 'Doctor'} portrait`);
  const portrait = showDentistPhoto
    ? (approvedPortrait
      ? `<figure class="dentist-photo dentist-photo-approved"><img src="${safePortraitUrl}" alt="${safePortraitAlt}"/></figure>`
      : `<figure class="dentist-photo-placeholder" role="img" aria-label="Doctor photo placeholder for ${safeDoctorName}">
          <span class="dentist-photo-illustration">${medicalIcon('portrait')}</span>
          <figcaption><strong>Doctor photo</strong><small>Portrait placeholder</small></figcaption>
        </figure>`)
    : '';
  const profileParagraphs = Array.isArray(practice.doctorBio)
    ? practice.doctorBio
    : [practice.doctorBio || 'Discuss sleep-related concerns, next steps, and whether an oral-appliance conversation may fit your care plan.'];
  const profileCopy = profileParagraphs
    .filter(Boolean)
    .map((paragraph, index) => `<p${index === 0 ? ' class="dentist-profile-lead"' : ''}>${escapeHtml(paragraph)}</p>`)
    .join('');
  const profileSectionClass = `dentist-profile-section${practice.key === 'pantego-dental' ? ' dentist-profile-pantego' : ''}`;

  return `<section class="${profileSectionClass}" aria-labelledby="about-dentist-heading">
    <div class="landing-container dentist-profile-layout">
      <div class="dentist-profile-intro${showDentistPhoto ? ' dentist-profile-intro-with-photo' : ''}">
        ${portrait}
        <div class="dentist-profile-copy">
          <p class="landing-eyebrow landing-eyebrow-dark">About the dentist</p>
          <h2 id="about-dentist-heading">${safeDoctorName}</h2>
          <div class="dentist-profile-bio">${profileCopy}</div>
        </div>
      </div>
      <ul class="dentist-credential-list" aria-label="Dentist credentials and practice details">
        <li><span class="dentist-credential-icon">${medicalIcon('credential')}</span><span><small>Credential</small><strong>${safeCredentials}</strong></span></li>
        <li><span class="dentist-credential-icon">${medicalIcon('dentist')}</span><span><small>Practice</small><strong>${safePracticeName}</strong></span></li>
        <li><span class="dentist-credential-icon">${medicalIcon('followup')}</span><span><small>Local care</small><strong>Serving ${safeLocation}</strong></span></li>
      </ul>
    </div>
  </section>`;
}

module.exports = { renderDentistProfile };
