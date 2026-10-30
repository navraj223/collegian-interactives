/* Load this script on the OUTER SNO/WordPress page, not inside the iframe. */
(() => {
  'use strict';
  const channel = 'collegian-movie-watchlist:v1';
  const selector = 'iframe[data-movie-watchlist]';
  const registered = new WeakSet();
  function frameOrigin(iframe) {
    try { return new URL(iframe.src, window.location.href).origin; }
    catch (_) { return undefined; }
  }
  function requestSize(iframe) {
    const origin = frameOrigin(iframe);
    if (origin && origin !== 'null' && iframe.contentWindow) {
      iframe.contentWindow.postMessage({channel, type:'request-size'}, origin);
    }
  }
  function initialize() {
    document.querySelectorAll(selector).forEach(iframe => {
      if (registered.has(iframe)) return;
      registered.add(iframe);
      iframe.style.display = 'block';
      iframe.style.width = '100%';
      iframe.style.border = '0';
      iframe.addEventListener('load', () => requestSize(iframe));
      requestSize(iframe);
    });
  }
  window.addEventListener('message', event => {
    const data = event.data;
    if (!data || data.channel !== channel) return;
    const iframe = Array.from(document.querySelectorAll(selector)).find(frame => frame.contentWindow === event.source);
    if (!iframe || event.origin !== frameOrigin(iframe)) return;
    if (data.type === 'scroll' && Number.isFinite(data.delta)) {
      const delta = Math.max(-1000, Math.min(1000, data.delta)) * (data.page ? window.innerHeight * .85 : 1);
      window.scrollBy({top:delta, behavior:'instant'});
      return;
    }
    if (data.type === 'scroll-edge' && (data.edge === 'start' || data.edge === 'end')) {
      const top = iframe.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({top:data.edge === 'start' ? 0 : top + iframe.offsetHeight - window.innerHeight, behavior:'instant'});
      return;
    }
    if (data.type !== 'height' || !Number.isFinite(data.height)) return;
    const height = Math.ceil(data.height);
    if (height < 1 || height > 100000) return;
    if (iframe.getAttribute('height') !== String(height)) iframe.setAttribute('height', String(height));
    if (iframe.style.height !== height+'px') iframe.style.height = height+'px';
  });
  window.addEventListener('resize', () => {
    document.querySelectorAll(selector).forEach(requestSize);
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, {once:true});
  else initialize();
})();
