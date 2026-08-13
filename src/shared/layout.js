/**
 * SHARED LAYOUT
 * Wraps every page with the full HTML shell.
 * Injects: title, theme class, GA4/GTM/Pixel placeholders, content.
 */

const { renderChatLauncher } = require('./chat');

function layout({ title, theme = 'v1', designSystem = 'default', body, phone = '', phoneRaw = '' }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title>${title} | BreatheBetterTonight.com</title>

  <!-- ── Favicon ── -->
  <link rel="icon" type="image/png" href="/assets/images/logo.png" />

  <!-- ── Fonts ── -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

  <!-- ── Base styles ── -->
  <link rel="stylesheet" href="/assets/css/base.css" />
  <link rel="stylesheet" href="/assets/css/symptom-lp.css" />
  <link rel="stylesheet" href="/assets/css/design-systems-v3.css" />
  <link rel="stylesheet" href="/assets/css/chat-launcher.css" />

  <!-- ── Theme styles ── -->
  <link rel="stylesheet" href="/assets/css/theme-${theme}.css" />

  <!-- ════════════════════════════════════════════════
       TRACKING PLACEHOLDERS
       Replace the placeholder values below with your
       real IDs when ready. Do not remove the tags.
  ════════════════════════════════════════════════ -->

  <!-- Google Tag Manager — replace GTM-XXXXXXX -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXXXX');</script>

  <!-- Google Analytics GA4 — replace G-XXXXXXXXXX -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>

  <!-- Facebook Pixel — replace PIXEL_ID_HERE -->
  <script>
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'PIXEL_ID_HERE');
    fbq('track', 'PageView');
  </script>

  <!-- Mouseflow — replace MOUSEFLOW_ID_HERE -->
  <script type="text/javascript">
    window._mfq = window._mfq || [];
    (function() {
      var mf = document.createElement("script");
      mf.type = "text/javascript"; mf.defer = true;
      mf.src = "//cdn.mouseflow.com/projects/MOUSEFLOW_ID_HERE.js";
      document.getElementsByTagName("head")[0].appendChild(mf);
    })();
  </script>

</head>
<body class="theme-${theme} design-${designSystem}">

  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

  <!-- ── Sticky tap-to-call header ── -->
  <header class="sticky-header design-header" data-design-system="${designSystem}">
    <a href="tel:${phoneRaw}" class="header-phone top-phone">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
      ${phone}
    </a>
    <a href="#symptom-check" class="header-cta btn-primary">SYMPTOM CHECK</a>
  </header>

  <!-- ── Page content ── -->
  <main>
    ${body}
  </main>

  <!-- ── Footer ── -->
  <footer class="site-footer">
    <div class="footer-inner">
      <img src="/assets/images/logo.png" alt="Breathe Better Tonight" class="footer-logo" />
      <p class="footer-brand">BreatheBetterTonight.com</p>
      <p class="footer-tagline">Better Sleep. Better Health. Better You.</p>
      <div class="footer-links">
        <a href="/privacy-policy">Privacy Policy</a>
        <span>·</span>
        <a href="/terms-and-conditions">Terms &amp; Conditions</a>
      </div>
      <p class="footer-disclaimer">
        This website provides general symptom-awareness information and does not provide medical advice or a diagnosis. Consult a qualified healthcare professional about persistent sleep concerns.
      </p>
      <p class="footer-copy">© ${new Date().getFullYear()} BreatheBetterTonight.com — All rights reserved.</p>
    </div>
  </footer>

  ${renderChatLauncher({ phone, phoneRaw })}

  <!-- ── Base JS ── -->
  <script src="/assets/js/main.js"></script>
  <script src="/assets/js/chat-launcher.js"></script>

</body>
</html>`;
}

module.exports = { layout };
