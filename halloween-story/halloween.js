/* Halloween feature — host this alongside index.html and halloween.css.
   Runs inside the hosted feature. Full-page mode also requires halloween-parent.js on SNO. */
(function () {
  'use strict';
  function init() {
    const scene = document.querySelector('.sticky-scene');
    const steps = Array.from(document.querySelectorAll('.story-step'));
    if (!scene || !steps.length || document.body.dataset.halloweenBound) return;
    document.body.dataset.halloweenBound = 'true';
    const root = document.documentElement;
    const hero = document.querySelector('.hero');
    const action = document.querySelector('.scene-action');
    const hint = document.querySelector('.scene-hint');
    const soundButton = document.querySelector('#sound-toggle');
    const motionButton = document.querySelector('#motion-toggle');
    const count = document.querySelector('.scene-count');
    const name = document.querySelector('.scene-name');
    const links = Array.from(document.querySelectorAll('[data-nav]'));
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let motion = !preference.matches;
    let sound = false;
    let audio;
    let queued = false;
    let activeScene = 'porch';
    let activeStep = null;
    let manualUntil = 0;
    let closeTimer;
    let soundNotice = '';
    const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
    const ease = n => n * n * (3 - 2 * n);

    function setMotion(enabled) {
      motion = enabled;
      document.body.classList.toggle('motion-off', !motion);
      root.style.scrollBehavior = motion ? '' : 'auto';
      motionButton.setAttribute('aria-pressed', String(motion));
      motionButton.textContent = motion ? 'Motion on' : 'Motion off';
      schedule();
    }

    function update() {
      queued = false;
      const viewport = window.hhPageViewport;
      const viewportHeight = viewport ? viewport.height : window.innerHeight;
      const parentY = viewport ? viewport.y : 0;
      const scrollTop = viewport ? Math.max(0, parentY) : window.scrollY;
      const focusLine = viewportHeight * (window.innerWidth <= 620 ? .54 : .49);
      let chosen = steps[0];
      for (const step of steps) {
        if (step.getBoundingClientRect().top - parentY <= focusLine) chosen = step;
      }
      const nextScene = chosen.dataset.scene;
      if (chosen !== activeStep) {
        activeStep = chosen;
        manualUntil = 0;
        activeScene = nextScene;
        scene.dataset.currentScene = activeScene;
        name.textContent = chosen.dataset.label;
        count.textContent = ({ porch:'01 / 03', trunk:'02 / 03', neighborhood:'03 / 03' })[activeScene];
        action.innerHTML = ({
          porch:'Ring the doorbell <span aria-hidden="true">↗</span>',
          trunk:'Open the trunk <span aria-hidden="true">↗</span>',
          neighborhood:'Light up the neighborhood <span aria-hidden="true">✦</span>'
        })[activeScene];
        hint.textContent = ({
          porch:'Scroll to open the door, or give the bell a ring.',
          trunk:'A different doorstep. Scroll to see what’s inside.',
          neighborhood:'Different routes. A familiar Halloween feeling.'
        })[activeScene];
        links.forEach(link => {
          const selected = link.dataset.nav === activeScene;
          link.classList.toggle('active', selected);
          if (selected) link.setAttribute('aria-current','location');
          else link.removeAttribute('aria-current');
        });
      }
      const sameScene = steps.filter(step => step.dataset.scene === activeScene);
      const first = sameScene[0].getBoundingClientRect();
      const last = sameScene[sameScene.length - 1].getBoundingClientRect();
      let progress = ease(clamp((focusLine - (first.top - parentY)) / Math.max(1, last.bottom - first.top)));
      if (!motion || Date.now() < manualUntil) progress = 1;
      root.style.setProperty('--door-width', String(1 - .9 * progress));
      root.style.setProperty('--door-skew', (-9 * progress) + 'deg');
      root.style.setProperty('--trunk-lift', (-125 * progress) + 'px');
      root.style.setProperty('--trunk-scale', String(1 - .35 * progress));
      root.style.setProperty('--scene-progress', (100 * progress) + '%');
      const maximum = Math.max(1, (viewport ? document.body.offsetHeight : document.documentElement.scrollHeight) - viewportHeight);
      root.style.setProperty('--reading', (clamp(scrollTop / maximum) * 100) + '%');
      root.style.setProperty('--hero-shift', (motion ? clamp(scrollTop * .12, 0, hero.offsetHeight * .15) : 0) + 'px');
    }

    function schedule() {
      if (!queued) {
        queued = true;
        window.requestAnimationFrame(update);
      }
    }

    async function chime() {
      if (!sound) return;
      try {
        const Audio = window.AudioContext || window.webkitAudioContext;
        if (!Audio) throw new Error('Web Audio unavailable');
        audio = audio || new Audio();
        await audio.resume();
        if (audio.state !== 'running') throw new Error('Audio suspended');
        const start = audio.currentTime;
        for (const [frequency, delay] of [[659.25,0],[523.25,.42]]) {
          const oscillator = audio.createOscillator();
          const gain = audio.createGain();
          oscillator.type = 'sine';
          oscillator.frequency.value = frequency;
          gain.gain.setValueAtTime(0,start + delay);
          gain.gain.linearRampToValueAtTime(.1,start + delay + .025);
          gain.gain.exponentialRampToValueAtTime(.001,start + delay + .8);
          oscillator.connect(gain);
          gain.connect(audio.destination);
          oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
          oscillator.start(start + delay);
          oscillator.stop(start + delay + .85);
        }
      } catch (_) {
        soundNotice = ' Sound is unavailable in this browser.';
        hint.textContent += soundNotice;
      }
    }

    action.addEventListener('click', () => {
      if (activeScene === 'neighborhood') {
        scene.classList.toggle('neighborhood-lit');
        hint.textContent = scene.classList.contains('neighborhood-lit') ? 'A little light for the way home.' : 'Different routes. A familiar Halloween feeling.';
        return;
      }
      manualUntil = Date.now() + 3000;
      window.clearTimeout(closeTimer);
      update();
      hint.textContent = activeScene === 'porch' ? 'Happy Halloween! Keep scrolling to follow the story.' : 'A trunk full of treats. Keep scrolling to continue.';
      if (activeScene === 'porch') chime();
      closeTimer = window.setTimeout(schedule, 3050);
    });

    soundButton.addEventListener('click', () => {
      sound = !sound;
      soundButton.setAttribute('aria-pressed',String(sound));
      soundButton.innerHTML = (sound ? 'Sound on' : 'Sound off') + ' <span aria-hidden="true">♪</span>';
      if (sound) {
        hint.textContent = 'Sound is on. Click “Ring the doorbell” in the porch chapter to hear it.';
      }
    });
    motionButton.addEventListener('click', () => setMotion(!motion));
    if (preference.addEventListener) preference.addEventListener('change', event => setMotion(!event.matches));
    window.addEventListener('scroll', schedule, { passive:true });
    window.addEventListener('hh:viewport', schedule);
    window.addEventListener('resize', schedule);
    window.addEventListener('load', schedule);
    if (window.ResizeObserver) {
      const sizeObserver = new ResizeObserver(schedule);
      sizeObserver.observe(document.querySelector('main'));
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
    setMotion(motion);
    update();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
