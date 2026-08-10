/**
 * ADMIN LISTING PAGE
 * Password-protected. Lists all doctors, variants, and page links.
 * Styled like the fixasmileguide reference.
 * Only this route requires Basic Auth — all LP/TY pages are public.
 */

const { getAllDoctors } = require('../../data/index');

function renderAdmin() {
  const doctors = getAllDoctors();

  const doctorSections = doctors.map(doctor => {
    const variantRows = Object.entries(doctor.variants).map(([vSlug, variant]) => {
      const lpUrl    = `/${doctor.slug}/${vSlug}`;
      const tyUrl    = `/${doctor.slug}/${vSlug}/thank-you`;
      const tyBtUrl  = `/${doctor.slug}/${vSlug}/thank-you-bt`;

      // City rows (if cities configured)
      const cityRows = (doctor.cities || []).map(city => {
        const cLpUrl   = `/${doctor.slug}/${vSlug}/${city.slug}`;
        const cTyUrl   = `/${doctor.slug}/${vSlug}/${city.slug}/thank-you`;
        const cTyBtUrl = `/${doctor.slug}/${vSlug}/${city.slug}/thank-you-bt`;
        return `
          <tr class="city-row">
            <td class="city-label">↳ ${city.label}</td>
            <td><a href="${cLpUrl}" target="_blank" class="link-lp">LP</a> <span class="url-text">${cLpUrl}</span></td>
            <td><a href="${cTyUrl}" target="_blank" class="link-ty">TY</a> <span class="url-text">${cTyUrl}</span></td>
            <td><a href="${cTyBtUrl}" target="_blank" class="link-bt">TY_BT</a> <span class="url-text">${cTyBtUrl}</span></td>
          </tr>`;
      }).join('');

      return `
        <tr class="variant-row">
          <td><span class="variant-badge">${vSlug.toUpperCase()}</span> ${variant.label}</td>
          <td><a href="${lpUrl}" target="_blank" class="link-lp">View LP</a> <span class="url-text">${lpUrl}</span></td>
          <td><a href="${tyUrl}" target="_blank" class="link-ty">View TY</a> <span class="url-text">${tyUrl}</span></td>
          <td><a href="${tyBtUrl}" target="_blank" class="link-bt">View TY_BT</a> <span class="url-text">${tyBtUrl}</span></td>
        </tr>
        ${cityRows}`;
    }).join('');

    return `
      <div class="doctor-section">
        <div class="doctor-header">
          <h2>${doctor.adminLabel || doctor.name}</h2>
          <span class="doctor-meta">${doctor.phone} · <a href="${doctor.website}" target="_blank">${doctor.website}</a></span>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Variant</th>
                <th>Landing Page</th>
                <th>Thank You</th>
                <th>Thank You (Below Target)</th>
              </tr>
            </thead>
            <tbody>${variantRows}</tbody>
          </table>
        </div>
      </div>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Admin — BreatheBetterTonight.com</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; background: #0D1B2A; color: #e2e8f0; min-height: 100vh; }
    a { color: inherit; text-decoration: none; }

    .admin-header {
      background: #0a1520;
      padding: 20px 24px;
      display: flex;
      align-items: center;
      gap: 16px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .admin-logo { height: 36px; }
    .admin-title { font-size: 1.1rem; font-weight: 800; color: #fff; }
    .admin-subtitle { font-size: 0.75rem; color: rgba(255,255,255,0.4); }
    .admin-badge {
      margin-left: auto;
      background: #00B4C8;
      color: #fff;
      font-size: 0.7rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 20px;
      letter-spacing: 0.05em;
    }

    .admin-body { padding: 32px 24px; max-width: 1100px; margin: 0 auto; }

    .doctor-section {
      background: #132030;
      border-radius: 12px;
      margin-bottom: 28px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.07);
    }
    .doctor-header {
      padding: 18px 24px;
      background: #0a1520;
      border-bottom: 1px solid rgba(255,255,255,0.07);
    }
    .doctor-header h2 { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 4px; }
    .doctor-meta { font-size: 0.78rem; color: rgba(255,255,255,0.45); }
    .doctor-meta a { color: #00B4C8; }

    .table-wrap { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
    thead tr { background: rgba(255,255,255,0.04); }
    th { padding: 10px 16px; text-align: left; font-weight: 600; color: rgba(255,255,255,0.5); font-size: 0.72rem; letter-spacing: 0.06em; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.07); }
    td { padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); vertical-align: middle; }
    .variant-row td:first-child { font-weight: 600; color: #e2e8f0; }
    .city-row td { background: rgba(0,0,0,0.15); }
    .city-label { color: rgba(255,255,255,0.45); font-size: 0.78rem; padding-left: 28px; }

    .variant-badge {
      display: inline-block;
      background: #00B4C8;
      color: #fff;
      font-size: 0.65rem;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 4px;
      margin-right: 6px;
      letter-spacing: 0.04em;
    }

    .link-lp, .link-ty, .link-bt {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 5px;
      font-weight: 700;
      font-size: 0.75rem;
      margin-right: 6px;
    }
    .link-lp  { background: #00B4C8; color: #fff; }
    .link-ty  { background: #22c55e; color: #fff; }
    .link-bt  { background: #f59e0b; color: #fff; }
    .url-text { font-size: 0.72rem; color: rgba(255,255,255,0.3); font-family: monospace; }

    .admin-footer { text-align: center; padding: 24px; font-size: 0.75rem; color: rgba(255,255,255,0.2); }

    @media (max-width: 600px) {
      .url-text { display: none; }
      .admin-body { padding: 16px; }
    }
  </style>
</head>
<body>
  <header class="admin-header">
    <img src="/assets/images/logo.png" alt="BBT" class="admin-logo" />
    <div>
      <div class="admin-title">BreatheBetterTonight.com</div>
      <div class="admin-subtitle">Landing Page Admin — Internal Use Only</div>
    </div>
    <span class="admin-badge">🔒 ADMIN</span>
  </header>

  <div class="admin-body">
    ${doctorSections}
  </div>

  <div class="admin-footer">
    BreatheBetterTonight.com · Admin Panel · ${new Date().getFullYear()}
  </div>
</body>
</html>`;
}

module.exports = { renderAdmin };
