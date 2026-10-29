/* Load THIS file on the SNO page, not inside the iframe. */
(function () {
  'use strict';
  const CHANNEL = 'collegian-halloween-page-v1';
  function init() {
    document.querySelectorAll('iframe[data-hh-page-scroll]').forEach(function (frame) {
      if (frame.dataset.hhParentBound) return;
      frame.dataset.hhParentBound = 'true';
      const origin = new URL(frame.src, location.href).origin;
      const wrapper = frame.closest('#hh-halloween-feature');
      const note = wrapper && wrapper.querySelector('[data-hh-fallback]');
      let connected = false;
      let queued = false;
      let measuredHeight = 0;
      let pendingScroll = 0;
      let scrollFrame = 0;
      // WordPress can insert paragraph markup into pasted style blocks.
      // Keep the frame's critical box styles independent of that formatting.
      frame.style.display = 'block';
      frame.style.width = '100%';
      frame.style.border = '0';
      frame.style.boxSizing = 'border-box';
      function send(type, values) {
        if (frame.contentWindow) frame.contentWindow.postMessage(
          Object.assign({ channel: CHANNEL, type: type }, values), origin);
      }
      function offset() {
        const value = Number(frame.dataset.topOffset || 0);
        return Number.isFinite(value) ? Math.max(0, Math.min(300, value)) : 0;
      }
      function state() {
        queued = false;
        const rect = frame.getBoundingClientRect();
        send('viewport', {
          y: -rect.top,
          height: window.innerHeight,
          width: rect.width,
          topOffset: offset()
        });
      }
      function schedule() {
        if (!queued) { queued = true; requestAnimationFrame(state); }
      }
      function scrollToPosition(top, behavior) {
        const target = Math.max(0, top);
        if (behavior === 'smooth') {
          window.scrollTo({ top: target, behavior: 'smooth' });
          return;
        }
        // Use Safari's numeric scrolling API, without a CSS smooth-scroll delay.
        const root = document.scrollingElement || document.documentElement;
        const previous = root.style.getPropertyValue('scroll-behavior');
        const priority = root.style.getPropertyPriority('scroll-behavior');
        root.style.setProperty('scroll-behavior', 'auto', 'important');
        window.scrollTo(0, target);
        if (previous) root.style.setProperty('scroll-behavior', previous, priority);
        else root.style.removeProperty('scroll-behavior');
      }
      function flushScroll() {
        scrollFrame = 0;
        const delta = pendingScroll;
        pendingScroll = 0;
        scrollToPosition(window.scrollY + delta);
        schedule();
      }
      window.addEventListener('message', function (event) {
        if (event.source !== frame.contentWindow || event.origin !== origin) return;
        const data = event.data;
        if (!data || data.channel !== CHANNEL) return;
        if (data.type === 'ready') { send('connect'); schedule(); }
        if (data.type === 'height' && Number.isFinite(data.height) && data.height > 0 && data.height < 100000) {
          const height = Math.ceil(data.height);
          if (height !== measuredHeight) {
            measuredHeight = height;
            frame.style.setProperty('height', height + 'px', 'important');
            frame.style.setProperty('min-height', '0', 'important');
            frame.style.setProperty('max-height', 'none', 'important');
          }
          connected = true;
          frame.dataset.hhPageConnected = 'true';
          if (note) note.hidden = true;
          schedule();
        }
        if (!connected) return;
        if (data.type === 'scroll-by' && Number.isFinite(data.delta)) {
          pendingScroll += Math.max(-5000, Math.min(5000, data.delta));
          if (!scrollFrame) scrollFrame = requestAnimationFrame(flushScroll);
        }
        if (data.type === 'scroll-to' && Number.isFinite(data.y)) {
          cancelAnimationFrame(scrollFrame);
          scrollFrame = 0;
          pendingScroll = 0;
          const frameTop = frame.getBoundingClientRect().top + window.scrollY;
          const within = Math.max(0, Math.min(measuredHeight, data.y));
          const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
          scrollToPosition(frameTop + within - offset(), data.smooth && !reduce ? 'smooth' : 'instant');
        }
      });
      frame.addEventListener('load', function () { connected = false; send('connect'); schedule(); });
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule, { passive: true });
      window.addEventListener('pageshow', schedule);
      // Changes above the iframe (including late-loading ads) change its position.
      if (window.ResizeObserver) new ResizeObserver(schedule).observe(document.body);
      let attempts = 0;
      const retry = setInterval(function () {
        send('connect'); schedule();
        if (++attempts >= 20 || connected) clearInterval(retry);
      }, 500);
      send('connect');
      schedule();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
