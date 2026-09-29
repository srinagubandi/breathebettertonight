/**
 * Sitewide Google Tag Manager snippets.
 * Keep the user-supplied container in one module so every rendered document
 * receives one head script and one body fallback without configuration drift.
 */
const GTM_CONTAINER_ID = 'GTM-MQH2FBWX';

function renderGoogleTagManagerHead() {
  return `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');</script>
<!-- End Google Tag Manager -->`;
}

function renderGoogleTagManagerBody() {
  return `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`;
}

module.exports = {
  GTM_CONTAINER_ID,
  renderGoogleTagManagerHead,
  renderGoogleTagManagerBody,
};
