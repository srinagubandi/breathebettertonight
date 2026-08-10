/**
 * BreatheBetterTonight.com — Express Server
 * ═══════════════════════════════════════════════════════════════
 * Routes are auto-generated from doctor config files.
 * To add a doctor: create src/data/dr-[slug].js and register
 * it in src/data/index.js. No changes needed here.
 * ═══════════════════════════════════════════════════════════════
 */

require('dotenv').config();

const express = require('express');
const path    = require('path');

const { getAllRoutes, getDoctorBySlug } = require('./src/data/index');
const { renderLP }    = require('./src/pages/lp/template');
const { renderTY }    = require('./src/pages/ty/template');
const { renderTYBT }  = require('./src/pages/ty-bt/template');
const { renderAdmin } = require('./src/pages/admin/template');

const app  = express();
const PORT = process.env.PORT || 8080;

// ── Static assets ────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ── Static pages ─────────────────────────────────────────────
app.get('/privacy-policy', (req, res) => {
  res.send(privacyPage());
});
app.get('/terms', (req, res) => {
  res.send(termsPage());
});

// ── Admin route (Basic Auth protected) ───────────────────────
app.get('/admin', (req, res) => {
  const adminUser = process.env.ADMIN_USER || 'bbt-admin';
  const adminPass = process.env.ADMIN_PASS || 'changeme';

  const auth = req.headers['authorization'];
  if (!auth || !auth.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="BBT Admin"');
    return res.status(401).send('Authentication required.');
  }

  const [user, pass] = Buffer.from(auth.slice(6), 'base64').toString().split(':');
  if (user !== adminUser || pass !== adminPass) {
    res.set('WWW-Authenticate', 'Basic realm="BBT Admin"');
    return res.status(401).send('Invalid credentials.');
  }

  res.send(renderAdmin());
});

// ── Auto-generate all LP / TY / TY-BT routes ─────────────────
// Reads from src/data/index.js — zero manual route registration needed.
const allRoutes = getAllRoutes();

allRoutes.forEach(route => {
  app.get(route.path, (req, res) => {
    const doctor = getDoctorBySlug(route.doctorSlug);
    if (!doctor) return res.status(404).send('Doctor not found.');

    try {
      if (route.type === 'lp') {
        return res.send(renderLP(doctor, route.variantSlug, route.citySlug));
      }
      if (route.type === 'ty') {
        return res.send(renderTY(doctor, route.variantSlug, route.citySlug));
      }
      if (route.type === 'ty-bt') {
        return res.send(renderTYBT(doctor, route.variantSlug, route.citySlug));
      }
    } catch (err) {
      console.error(`Route error [${route.path}]:`, err.message);
      return res.status(500).send('Page error. Please try again.');
    }
  });
});

// ── Root redirect to admin ────────────────────────────────────
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html><html><head><meta charset="UTF-8"/>
  <title>BreatheBetterTonight.com</title>
  <style>body{font-family:sans-serif;background:#0D1B2A;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center;}
  a{color:#00B4C8;}</style></head><body>
  <div><img src="/assets/images/logo.png" style="width:80px;margin:0 auto 20px;" /><br/>
  <strong>BreatheBetterTonight.com</strong><br/><br/>
  <a href="/admin">Admin Panel</a></div></body></html>`);
});

// ── 404 ───────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).send(`<!DOCTYPE html><html><head><meta charset="UTF-8"/>
  <title>Page Not Found</title>
  <style>body{font-family:sans-serif;background:#0D1B2A;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center;}
  a{color:#00B4C8;}</style></head><body>
  <div><h1>404</h1><p>Page not found.</p><a href="/">Home</a></div></body></html>`);
});

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`BreatheBetterTonight.com running on port ${PORT}`);
  console.log(`Auto-registered ${allRoutes.length} routes from doctor configs.`);
});

// ── Minimal static pages ──────────────────────────────────────
function privacyPage() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Privacy Policy — BreatheBetterTonight.com</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet"/>
  <style>body{font-family:Inter,sans-serif;max-width:700px;margin:40px auto;padding:0 20px;color:#374151;line-height:1.7;}
  h1{color:#0D1B2A;}a{color:#00B4C8;}</style></head><body>
  <h1>Privacy Policy</h1>
  <p>Last updated: ${new Date().toLocaleDateString()}</p>
  <p>BreatheBetterTonight.com is a lead generation service that connects patients with licensed dental providers. We collect contact information submitted through our forms solely to facilitate introductions between patients and dental professionals.</p>
  <p>We do not sell your personal information to third parties. Information submitted is shared only with the dental provider associated with the landing page you visited.</p>
  <p>This site uses Google Analytics, Google Tag Manager, and Facebook Pixel for anonymous traffic analysis. These tools may use cookies.</p>
  <p>For questions, contact us at <a href="mailto:info@breathebettertonight.com">info@breathebettertonight.com</a>.</p>
  <p><a href="javascript:history.back()">← Back</a></p>
  </body></html>`;
}

function termsPage() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Terms of Service — BreatheBetterTonight.com</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet"/>
  <style>body{font-family:Inter,sans-serif;max-width:700px;margin:40px auto;padding:0 20px;color:#374151;line-height:1.7;}
  h1{color:#0D1B2A;}a{color:#00B4C8;}</style></head><body>
  <h1>Terms of Service</h1>
  <p>Last updated: ${new Date().toLocaleDateString()}</p>
  <p>By using BreatheBetterTonight.com you agree to these terms. This website provides general health information and connects patients with dental providers. It does not provide medical advice or diagnosis.</p>
  <p>Submitting a form on this site constitutes a request for a consultation. You may be contacted by the dental provider associated with the page you visited.</p>
  <p>Results vary. Insurance coverage is not guaranteed. Always consult a qualified healthcare provider before beginning any treatment.</p>
  <p><a href="javascript:history.back()">← Back</a></p>
  </body></html>`;
}
