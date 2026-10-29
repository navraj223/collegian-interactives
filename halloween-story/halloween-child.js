/* Full-page iframe mode. Standalone and unconnected embeds keep their normal scrolling. */
(function () {
  'use strict';
  if (window.parent === window) return;
  const CHANNEL = 'collegian-halloween-page-v1';
  const allowed = new Set(['https://fscollegian.com', 'https://www.fscollegian.com', location.origin]);
  const root = document.documentElement;
  let parentOrigin = '';
  let active = false;
  let queued = false;
  let lastHeight = 0;
  let touch = null;
  let momentum = 0;
  function send(type, values) {
    if (parentOrigin) window.parent.postMessage(Object.assign({ channel: CHANNEL, type: type }, values), parentOrigin);
  }
  function topOf(element) {
    let top = 0;
    for (let node = element; node; node = node.offsetParent) top += node.offsetTop;
    return top;
  }
  function clamp(value, maximum) { return Math.max(0, Math.min(Math.max(0, maximum), value)); }
  function render() {
    queued = false;
    if (!active || !window.hhPageViewport) return;
    const view = window.hhPageViewport;
    const nav = document.querySelector('.chapter-nav');
    const scene = document.querySelector('.sticky-scene');
    const column = document.querySelector('.scene-column');
    const layout = document.querySelector('.story-layout');
    const bar = document.querySelector('.reading-progress');
    const height = Math.ceil(document.body.offsetHeight);
    if (height !== lastHeight) { lastHeight = height; send('height', { height: height }); }
    const navHeight = nav ? nav.offsetHeight : 0;
    if (nav) {
      nav.style.transform = 'translateY(' + clamp(view.y + view.topOffset - topOf(nav), height - topOf(nav) - navHeight) + 'px)';
    }
    if (scene && column && layout) {
      const base = topOf(column);
      const limit = topOf(layout) + layout.offsetHeight - base - scene.offsetHeight - 20;
      scene.style.transform = 'translateY(' + clamp(view.y + view.topOffset + navHeight + (window.innerWidth <= 620 ? 0 : 12) - base, limit) + 'px)';
    }
    if (bar) bar.style.transform = 'translateY(' + clamp(view.y + view.topOffset, height - 3) + 'px)';
    window.dispatchEvent(new Event('hh:viewport'));
  }
  function schedule() {
    if (!queued) { queued = true; requestAnimationFrame(render); }
  }
  window.addEventListener('message', function (event) {
    if (event.source !== window.parent || !allowed.has(event.origin)) return;
    const data = event.data;
    if (!data || data.channel !== CHANNEL) return;
    if (data.type === 'connect') {
      parentOrigin = event.origin;
      if (!active) {
        active = true;
        root.classList.add('hh-page-scroll');
        window.scrollTo(0, 0);
      }
      send('height', { height: Math.ceil(document.body.offsetHeight) });
    }
    if (data.type === 'viewport' && active && event.origin === parentOrigin &&
        [data.y, data.height, data.width, data.topOffset].every(Number.isFinite) &&
        data.height > 0 && data.height < 10000) {
      window.hhPageViewport = {
        y: data.y,
        height: data.height,
        width: data.width,
        topOffset: Math.max(0, Math.min(300, data.topOffset))
      };
      const value = data.height + 'px';
      if (root.style.getPropertyValue('--hh-viewport-height') !== value) root.style.setProperty('--hh-viewport-height', value);
      schedule();
    }
  });
  // Forward wheel gestures to the real page; Ctrl-wheel remains browser zoom.
  window.addEventListener('wheel', function (event) {
    if (!active || !window.hhPageViewport || event.ctrlKey || event.defaultPrevented || !event.cancelable) return;
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    const factor = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? window.hhPageViewport.height : 1;
    event.preventDefault();
    cancelAnimationFrame(momentum);
    send('scroll-by', { delta: event.deltaY * factor });
  }, { passive: false });
  // Touch gestures scroll the main document, including a short inertial finish.
  document.addEventListener('touchstart', function (event) {
    cancelAnimationFrame(momentum);
    if (!active || event.touches.length !== 1) { touch = null; return; }
    const point = event.touches[0];
    touch = { x: point.clientX, y: point.clientY, time: performance.now(), speed: 0, vertical: null };
  }, { passive: true });
  document.addEventListener('touchmove', function (event) {
    if (!active || !touch || event.touches.length !== 1) return;
    const point = event.touches[0];
    const delta = touch.y - point.clientY;
    const now = performance.now();
    if (touch.vertical === null && Math.abs(delta) + Math.abs(touch.x - point.clientX) > 5) touch.vertical = Math.abs(delta) >= Math.abs(touch.x - point.clientX);
    if (!touch.vertical) return;
    // Safari may deliver non-cancelable moves after it classifies a gesture.
    // That prevents cancellation, not forwarding to the outer document.
    if (event.cancelable) event.preventDefault();
    touch.speed = .6 * touch.speed + .4 * delta / Math.max(1, now - touch.time);
    touch.y = point.clientY;
    touch.time = now;
    send('scroll-by', { delta: delta });
  }, { passive: false, capture: true });
  document.addEventListener('touchend', function () {
    if (!touch) return;
    let speed = touch.vertical && performance.now() - touch.time < 100 ? Math.max(-2.5, Math.min(2.5, touch.speed)) : 0;
    touch = null;
    let previous = performance.now();
    function coast(now) {
      const elapsed = Math.min(32, now - previous);
      previous = now;
      speed *= Math.pow(.94, elapsed / 16.7);
      if (Math.abs(speed) < .025) return;
      send('scroll-by', { delta: speed * elapsed });
      momentum = requestAnimationFrame(coast);
    }
    if (speed) momentum = requestAnimationFrame(coast);
  }, { passive: true });
  document.addEventListener('touchcancel', function () { touch = null; cancelAnimationFrame(momentum); }, { passive: true });
  function editable(element) { return element && (element.isContentEditable || element.closest('input,textarea,select,[contenteditable="true"]')); }
  window.addEventListener('keydown', function (event) {
    if (!active || !window.hhPageViewport || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || editable(event.target)) return;
    if ((event.key === ' ' || event.key === 'Enter') && event.target.closest('button,a,summary')) return;
    const page = window.hhPageViewport.height * .85;
    const deltas = { ArrowDown: 45, ArrowUp: -45, PageDown: page, PageUp: -page, ' ': event.shiftKey ? -page : page };
    if (Object.prototype.hasOwnProperty.call(deltas, event.key)) {
      event.preventDefault(); send('scroll-by', { delta: deltas[event.key] });
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault(); send('scroll-to', { y: event.key === 'Home' ? 0 : document.body.offsetHeight });
    }
  });
  document.addEventListener('click', function (event) {
    if (!active || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    let target;
    try { target = document.getElementById(decodeURIComponent(link.hash.slice(1))); } catch (_) { return; }
    if (!target) return;
    event.preventDefault();
    const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    send('scroll-to', { y: Math.max(0, topOf(target) - margin), smooth: !document.body.classList.contains('motion-off') });
  });
  window.addEventListener('resize', schedule);
  window.addEventListener('load', schedule);
  if (window.ResizeObserver) new ResizeObserver(schedule).observe(document.body);
  if (document.fonts) document.fonts.ready.then(schedule);
  // Readiness announcement uses only known destinations; no wildcard messages.
  try {
    const referrerOrigin = new URL(document.referrer).origin;
    if (allowed.has(referrerOrigin)) window.parent.postMessage({ channel: CHANNEL, type: 'ready' }, referrerOrigin);
  } catch (_) { /* The parent's load handshake also works without a referrer. */ }
})();
