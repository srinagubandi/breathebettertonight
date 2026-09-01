const { getAllDoctors } = require('../../data/index');

const statuses = ['New', 'Contacted', 'Scheduled', 'Closed'];

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function statusOptions(current) {
  return statuses.map((status) => `<option value="${status}"${current === status ? ' selected' : ''}>${status}</option>`).join('');
}

function leadRows(leads) {
  if (!leads.length) return '<tr><td colspan="5" class="empty">No inquiries have been received yet. New requests will appear here.</td></tr>';
  return leads.map((lead) => {
    const date = new Date(lead.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
    const statusClass = escapeHtml(lead.status).toLowerCase();
    const safeId = escapeHtml(lead.id);
    return `<tr>
      <td><strong>${escapeHtml(lead.name)}</strong><span class="muted">${escapeHtml(date)}</span></td>
      <td><a href="tel:${escapeHtml(lead.phone.replace(/\D/g, ''))}">${escapeHtml(lead.phone)}</a><a class="muted" href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td>
      <td>${escapeHtml(lead.inquiryType)}<span class="muted">Prefers ${escapeHtml(lead.contactMethod)}</span></td>
      <td><span class="status ${statusClass}">${escapeHtml(lead.status)}</span></td>
      <td><form class="update-form" action="/admin/leads/${encodeURIComponent(lead.id)}/status" method="post"><label class="sr-only" for="status-${safeId}">Update status for ${escapeHtml(lead.name)}</label><select id="status-${safeId}" name="status">${statusOptions(lead.status)}</select><button type="submit">Save</button></form></td>
    </tr>`;
  }).join('');
}

function doctorSections() {
  return getAllDoctors().map((doctor) => {
    const rows = Object.entries(doctor.variants).map(([slug, variant]) => {
      const lp = `/${doctor.slug}/${slug}`;
      const ty = `${lp}/thank-you`;
      const bt = `${lp}/thank-you-bt`;
      const cities = (doctor.cities || []).map((city) => {
        const cityLp = `${lp}/${city.slug}`;
        return `<tr class="city"><td>↳ ${escapeHtml(city.label)}</td><td><a href="${cityLp}" target="_blank" rel="noreferrer">Landing page</a></td><td><a href="${cityLp}/thank-you" target="_blank" rel="noreferrer">Thank you</a></td><td><a href="${cityLp}/thank-you-bt" target="_blank" rel="noreferrer">Helpful step</a></td></tr>`;
      }).join('');
      return `<tr><td><strong>${escapeHtml(slug.toUpperCase())}</strong> ${escapeHtml(variant.label)}</td><td><a href="${lp}" target="_blank" rel="noreferrer">Landing page</a></td><td><a href="${ty}" target="_blank" rel="noreferrer">Thank you</a></td><td><a href="${bt}" target="_blank" rel="noreferrer">Helpful step</a></td></tr>${cities}`;
    }).join('');
    return `<section class="card legacy"><div class="card-heading"><div><p class="kicker">Existing assets</p><h2>${escapeHtml(doctor.adminLabel || doctor.name)}</h2></div><a href="${escapeHtml(doctor.website)}" target="_blank" rel="noreferrer">Practice website</a></div><div class="table-wrap"><table><thead><tr><th>Variant</th><th>Landing Page</th><th>Thank You</th><th>Below Target</th></tr></thead><tbody>${rows}</tbody></table></div></section>`;
  }).join('');
}

function renderAdmin({ leads = [], summary = {}, storage = { persistent: false } } = {}) {
  const storageNotice = storage.persistent
    ? '<p class="storage good">Lead storage is configured for a persistent location.</p>'
    : '<p class="storage warning">Lead storage is using the application filesystem. Configure <code>LEADS_FILE</code> to a mounted persistent volume before relying on it for production lead capture.</p>';
  const metric = (value, label) => `<article class="metric"><strong>${value || 0}</strong><span>${label}</span></article>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex,nofollow" />
  <meta name="referrer" content="no-referrer" />
  <title>Admin Dashboard | Breathe Better Tonight</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,600;9..144,700&display=swap" rel="stylesheet" />
  <style>
    :root{--navy:#0d1b2a;--navy2:#17364b;--teal:#008fa0;--mist:#eaf7f7;--ink:#173044;--muted:#637984;--line:#d9e6e8;--white:#fff}*{box-sizing:border-box}body{margin:0;background:#f4f8f9;color:var(--ink);font-family:'DM Sans',system-ui,sans-serif;line-height:1.45}a{color:#007e8e;font-weight:700}.admin-header{background:var(--navy);color:#fff}.header-inner,.admin-body{width:min(1240px,calc(100% - 40px));margin:0 auto}.header-inner{display:flex;align-items:center;justify-content:space-between;gap:22px;padding:18px 0}.identity{display:flex;align-items:center;gap:13px}.identity img{width:40px;height:40px;object-fit:contain}.identity strong{display:block;font-family:Fraunces,serif;font-size:1.18rem}.identity span{color:#a6c5ce;font-size:.78rem}.badge{border:1px solid rgba(124,227,233,.4);border-radius:999px;padding:7px 11px;color:#b8f0f1;font-size:.7rem;font-weight:700;letter-spacing:.09em;text-transform:uppercase}.admin-body{padding:40px 0 60px}h1,h2{margin:0;color:var(--navy);font-family:Fraunces,serif;line-height:1.1;letter-spacing:-.03em}h1{font-size:clamp(2rem,4vw,3rem)}h2{font-size:1.35rem}.intro{margin-bottom:27px}.intro p{max-width:720px;margin:11px 0 0;color:var(--muted)}.kicker{margin:0 0 6px;color:var(--teal);font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase}.metrics{display:grid;grid-template-columns:repeat(5,1fr);gap:13px;margin-bottom:25px}.metric{padding:18px;border:1px solid var(--line);border-radius:12px;background:var(--white)}.metric strong{display:block;color:var(--navy);font-size:1.9rem;line-height:1}.metric span{color:var(--muted);font-size:.72rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase}.card{overflow:hidden;margin-bottom:28px;border:1px solid var(--line);border-radius:14px;background:var(--white);box-shadow:0 8px 24px rgba(15,56,69,.05)}.card-heading{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:23px 25px;border-bottom:1px solid var(--line)}.storage{margin:0;padding:13px 16px;font-size:.86rem}.good{color:#146044;background:#e8f8ef}.warning{color:#765000;background:#fff6df}.warning code{font-weight:700}.table-wrap{overflow-x:auto}table{width:100%;border-collapse:collapse;font-size:.87rem}th{padding:12px 16px;background:#f8fbfc;color:var(--muted);font-size:.71rem;letter-spacing:.07em;text-align:left;text-transform:uppercase}td{padding:16px;border-top:1px solid var(--line);vertical-align:top}td strong{display:block;color:var(--navy)}.muted{display:block;margin-top:3px;color:var(--muted);font-size:.78rem;font-weight:400}.status{display:inline-block;border-radius:999px;padding:5px 9px;font-size:.74rem;font-weight:700}.new{color:#006974;background:#dff8fa}.contacted{color:#425786;background:#eaf0ff}.scheduled{color:#0b6b4d;background:#def9ed}.closed{color:#5d6266;background:#eceff1}.update-form{display:flex;gap:7px}select,button{height:35px;border-radius:6px;font:inherit;font-size:.8rem}select{border:1px solid #bdced4;padding:0 7px;color:var(--ink);background:#fff}button{border:0;padding:0 11px;color:#fff;background:var(--teal);font-weight:700;cursor:pointer}.empty{padding:28px;color:var(--muted);text-align:center}.city td{color:#536c79;background:#f8fbfc;font-size:.82rem}.admin-footer{padding:24px 0;color:#7795a0;background:var(--navy);font-size:.78rem;text-align:center}.sr-only{position:absolute;width:1px;height:1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}@media(max-width:780px){.header-inner,.admin-body{width:min(100% - 28px,1240px)}.admin-body{padding-top:28px}.metrics{grid-template-columns:repeat(2,1fr)}.metrics .metric:first-child{grid-column:1/-1}.card-heading{align-items:flex-start;flex-direction:column;padding:20px}td,th{padding:13px}.update-form{min-width:175px}}
  </style>
</head>
<body>
  <header class="admin-header"><div class="header-inner"><div class="identity"><img src="/assets/images/logo.png" alt="" /><div><strong>Breathe Better Tonight</strong><span>National website administration</span></div></div><span class="badge">Protected area</span></div></header>
  <main class="admin-body">
    <div class="intro"><p class="kicker">Lead management</p><h1>New requests, all in one place.</h1><p>Review general inquiries, follow up through the visitor’s preferred method, and update each request as it progresses.</p></div>
    <section class="metrics" aria-label="Lead status summary">${metric(summary.total, 'Total inquiries')}${metric(summary.New, 'New')}${metric(summary.Contacted, 'Contacted')}${metric(summary.Scheduled, 'Scheduled')}${metric(summary.Closed, 'Closed')}</section>
    <section class="card"><div class="card-heading"><div><p class="kicker">Inquiry dashboard</p><h2>Form submissions</h2></div></div>${storageNotice}<div class="table-wrap"><table><thead><tr><th>Visitor / submitted</th><th>Contact details</th><th>Request</th><th>Status</th><th>Update</th></tr></thead><tbody>${leadRows(leads)}</tbody></table></div></section>
    ${doctorSections()}
  </main>
  <footer class="admin-footer">Breathe Better Tonight · Protected administration · ${new Date().getFullYear()}</footer>
</body>
</html>`;
}

module.exports = { renderAdmin };
