/**
 * Shared chat launcher.
 *
 * Current behavior: a fully functional, accessible on-site panel opens on every
 * page. When a vendor URL is supplied as CHAT_PROVIDER_URL, the “Start chat”
 * action opens that provider in a new tab. Until then, the panel provides a
 * transparent fallback and a tap-to-call option without simulating a live agent.
 */
function renderChatLauncher({ phone, phoneRaw }) {
  const chatProviderUrl = process.env.CHAT_PROVIDER_URL || '';
  const providerAction = chatProviderUrl
    ? `<a class="chat-provider-link" href="${chatProviderUrl}" target="_blank" rel="noopener">Start chat</a>`
    : `<p class="chat-provider-note">Live chat will connect here once the preferred chat provider is added.</p>`;

  return `
    <section class="chat-widget" aria-label="Chat support">
      <button class="chat-launcher" type="button" aria-expanded="false" aria-controls="chat-panel">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v11a3 3 0 0 1-3 3H9l-5 3V4Zm2 2v11.3L8.4 16H17a1 1 0 0 0 1-1V6H6Zm3 3h6v2H9V9Zm0 4h4v2H9v-2Z"/></svg>
        <span class="chat-launcher-label">Chat</span>
      </button>
      <div class="chat-panel" id="chat-panel" role="dialog" aria-modal="false" aria-labelledby="chat-panel-title" hidden>
        <div class="chat-panel-head">
          <div>
            <p class="chat-panel-kicker">Breathe Better Tonight</p>
            <h2 id="chat-panel-title">Questions about your sleep symptoms?</h2>
          </div>
          <button class="chat-close" type="button" aria-label="Close chat">×</button>
        </div>
        <p class="chat-panel-copy">Use this space to connect a compliant chat provider when you are ready. For now, the office can be reached by phone.</p>
        ${providerAction}
        <a class="chat-call-link" href="tel:${phoneRaw}">Call ${phone}</a>
        <p class="chat-panel-disclaimer">Chat is not a substitute for medical advice or emergency care.</p>
      </div>
    </section>`;
}

module.exports = { renderChatLauncher };
