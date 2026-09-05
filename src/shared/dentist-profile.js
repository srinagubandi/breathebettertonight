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
  const photoPlaceholder = showDentistPhoto ? (approvedPortrait ? `<figure class="dentist-photo-placeholder dentist-photo-approved"><img src="${safePortraitUrl}" alt="${safePortraitAlt}" style="display:block;width:100%;height:104px;object-fit:cover;object-position:center"/><figcaption><strong>Approved doctor portrait</strong><small>Practice-provided image</small></figcaption></figure>` : `<figure class="dentist-photo-placeholder" role="img" aria-label="Doctor photo placeholder for ${safeDoctorName}">
          <span class="dentist-photo-illustration">${medicalIcon('portrait')}</span>
          <figcaption><strong>Doctor photo</strong><small>Portrait placeholder</small></figcaption>
        </figure>`) : '';
  const profileNote = escapeHtml(practice.doctorBio || 'Discuss sleep-related concerns, next steps, and whether an oral-appliance conversation may fit your care plan.');
  return `<section class="dentist-profile-section" aria-labelledby="about-dentist-heading">
    <div class="landing-container dentist-profile-layout">
      <div class="dentist-profile-intro${showDentistPhoto ? ' dentist-profile-intro-with-photo' : ''}">
        ${photoPlaceholder}
        <div class="dentist-profile-copy">
          <p class="landing-eyebrow landing-eyebrow-dark">About the dentist</p>
          <h2 id="about-dentist-heading">${safeDoctorName}</h2>
          <p>${profileNote}</p>
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
