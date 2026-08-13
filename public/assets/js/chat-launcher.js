// Shared chat launcher behavior. The panel can later hand off to CHAT_PROVIDER_URL.
(() => {
  const launcher = document.querySelector('.chat-launcher');
  const panel = document.querySelector('.chat-panel');
  const close = document.querySelector('.chat-close');

  if (!launcher || !panel) return;

  const setOpen = (open) => {
    panel.hidden = !open;
    launcher.setAttribute('aria-expanded', String(open));
    if (open) (close || panel).focus();
  };

  launcher.addEventListener('click', () => setOpen(panel.hidden));
  if (close) close.addEventListener('click', () => setOpen(false));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) {
      setOpen(false);
      launcher.focus();
    }
  });
})();
