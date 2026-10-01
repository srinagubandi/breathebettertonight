/**
 * Sitewide OpenPanel browser analytics snippet.
 * The client ID is designed to be public in browser-delivered markup; OpenPanel
 * server credentials are intentionally never included in this module or pages.
 */
const OPENPANEL_CLIENT_ID = '25a9bd63-591c-4974-91bd-da300e76e1dd';

function renderOpenPanelHead() {
  return `<!-- OpenPanel Analytics -->
<script>
  window.op=window.op||function(){var n=[];return new Proxy(function(){arguments.length&&n.push([].slice.call(arguments))},{get:function(t,r){return"q"===r?n:function(){n.push([r].concat([].slice.call(arguments)))}} ,has:function(t,r){return"q"===r}}) }();
  window.op('init', {
    clientId: '${OPENPANEL_CLIENT_ID}',
    trackScreenViews: true,
    trackOutgoingLinks: true,
    trackAttributes: true,
  });
</script>
<script src="https://openpanel.dev/op1.js" defer async></script>
<!-- End OpenPanel Analytics -->`;
}

module.exports = { OPENPANEL_CLIENT_ID, renderOpenPanelHead };
