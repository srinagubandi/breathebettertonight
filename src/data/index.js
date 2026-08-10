/**
 * DOCTOR REGISTRY
 * ═══════════════════════════════════════════════════════════════
 * HOW TO ADD A NEW DOCTOR:
 *   1. Create src/data/dr-[slug].js (copy dr-lay.js as template)
 *   2. require() it below and add to the exports array
 *   All routes, pages, and admin listing auto-generate. Done.
 * ═══════════════════════════════════════════════════════════════
 */

const drLay = require('./dr-lay');
// const drPrada   = require('./dr-prada');    // Uncomment when ready
// const drManesh  = require('./dr-manesh');   // Uncomment when ready
// const drManmode = require('./dr-manmode');  // Uncomment when ready

// Master list — order determines display order in admin listing
const doctors = [
  drLay,
  // drPrada,
  // drManesh,
  // drManmode,
];

/**
 * Returns all doctors
 */
function getAllDoctors() {
  return doctors;
}

/**
 * Returns a single doctor by slug
 * @param {string} slug  e.g. 'dr-lay'
 */
function getDoctorBySlug(slug) {
  return doctors.find(d => d.slug === slug) || null;
}

/**
 * Returns all route definitions across all doctors.
 * Each route: { path, doctorSlug, variantSlug, citySlug|null, type }
 * type: 'lp' | 'ty' | 'ty-bt'
 */
function getAllRoutes() {
  const routes = [];

  for (const doctor of doctors) {
    for (const [variantSlug, variant] of Object.entries(doctor.variants)) {

      // ── Without city (base variant routes) ──────────────────
      routes.push({
        path:        `/${doctor.slug}/${variantSlug}`,
        doctorSlug:  doctor.slug,
        variantSlug,
        citySlug:    null,
        type:        'lp',
      });
      routes.push({
        path:        `/${doctor.slug}/${variantSlug}/thank-you`,
        doctorSlug:  doctor.slug,
        variantSlug,
        citySlug:    null,
        type:        'ty',
      });
      routes.push({
        path:        `/${doctor.slug}/${variantSlug}/thank-you-bt`,
        doctorSlug:  doctor.slug,
        variantSlug,
        citySlug:    null,
        type:        'ty-bt',
      });

      // ── With city (city-specific routes) ────────────────────
      if (doctor.cities && doctor.cities.length > 0) {
        for (const city of doctor.cities) {
          routes.push({
            path:        `/${doctor.slug}/${variantSlug}/${city.slug}`,
            doctorSlug:  doctor.slug,
            variantSlug,
            citySlug:    city.slug,
            type:        'lp',
          });
          routes.push({
            path:        `/${doctor.slug}/${variantSlug}/${city.slug}/thank-you`,
            doctorSlug:  doctor.slug,
            variantSlug,
            citySlug:    city.slug,
            type:        'ty',
          });
          routes.push({
            path:        `/${doctor.slug}/${variantSlug}/${city.slug}/thank-you-bt`,
            doctorSlug:  doctor.slug,
            variantSlug,
            citySlug:    city.slug,
            type:        'ty-bt',
          });
        }
      }
    }
  }

  return routes;
}

/**
 * Resolves the display city label for a given doctor + citySlug.
 * Falls back to doctor.city if no citySlug provided.
 */
function resolveCityLabel(doctor, citySlug) {
  if (!citySlug) {
    // Default to first city in the cities array, or fall back to state
    const firstCity = (doctor.cities || [])[0];
    return firstCity ? firstCity.label : (doctor.city || doctor.state || '');
  }
  const cityObj = (doctor.cities || []).find(c => c.slug === citySlug);
  return cityObj ? cityObj.label : citySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Resolves the phone number for a given doctor + citySlug.
 * City-level phone (call tracking) overrides doctor default.
 */
function resolvePhone(doctor, citySlug) {
  if (citySlug) {
    const cityObj = (doctor.cities || []).find(c => c.slug === citySlug);
    if (cityObj && cityObj.phone) return cityObj.phone;
  }
  return doctor.phone;
}

module.exports = {
  getAllDoctors,
  getDoctorBySlug,
  getAllRoutes,
  resolveCityLabel,
  resolvePhone,
};
