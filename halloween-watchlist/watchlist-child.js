/* Report the content's natural height to the verified embedding parent. */
(() => {
  'use strict';
  if (window.parent === window) return;
  const channel = 'collegian-movie-watchlist:v1';
  const root = document.getElementById('halloween-video-watchlist');
  if (!root) return;
  let parentOrigin;
  let connected = false;
  try {
    const url = new URL(document.referrer);
    if (url.protocol === 'https:' || url.protocol === 'http:') parentOrigin = url.origin;
  } catch (_) { /* Wait for a source-verified handshake if referrer is absent. */ }
  let frame;
  function scheduleMeasurement() {
    if (!parentOrigin || frame !== undefined) return;
    frame = window.requestAnimationFrame(() => {
      frame = undefined;
      // Measure the app, not document.scrollHeight: the viewport may still have
      // the previous, taller review's height and must be allowed to shrink.
      const height = Math.ceil(root.getBoundingClientRect().height);
      if (height > 0) window.parent.postMessage({channel, type:'height', height}, parentOrigin);
    });
  }
  window.addEventListener('message', event => {
    if (event.source !== window.parent || !event.data || event.data.channel !== channel || event.data.type !== 'request-size') return;
    if (event.origin === 'null' || (parentOrigin && event.origin !== parentOrigin)) return;
    parentOrigin = event.origin;
    connected = true;
    scheduleMeasurement();
  });
  // A content-sized iframe has no scroll range of its own. Keep reading keys
  // moving the outer page while leaving button activation and zoom native.
  window.addEventListener('keydown', event => {
    if (!connected || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target;
    if (target.isContentEditable || target.closest('input,textarea,select,[contenteditable="true"]')) return;
    if ((event.key === ' ' || event.key === 'Enter') && target.closest('button,a,summary')) return;
    const directions = {ArrowDown:45, ArrowUp:-45, PageDown:1, PageUp:-1, ' ':event.shiftKey ? -1 : 1};
    if (Object.prototype.hasOwnProperty.call(directions, event.key)) {
      event.preventDefault();
      window.parent.postMessage({channel, type:'scroll', delta:directions[event.key], page:!event.key.startsWith('Arrow')}, parentOrigin);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      window.parent.postMessage({channel, type:'scroll-edge', edge:event.key === 'Home' ? 'start' : 'end'}, parentOrigin);
    }
  });
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(scheduleMeasurement).observe(root);
  window.addEventListener('resize', scheduleMeasurement);
  window.addEventListener('load', scheduleMeasurement);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(scheduleMeasurement);
  scheduleMeasurement();
})();
