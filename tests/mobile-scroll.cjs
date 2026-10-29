// Optional development regression check: node tests/mobile-scroll.cjs
// Requires Playwright with Chromium and WebKit installed. No site build step.
const { chromium, webkit } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../halloween-story');
const hosted = 'https://navrajd.com/collegian-interactives/halloween-story/';
const parent = 'https://fscollegian.com/__halloween_scroll_test__';

async function gesture(frame, cancelable, fingers = 1) {
  return frame.evaluate(({ cancelable, fingers }) => {
    const prevented = [];
    for (const [type, y] of [['touchstart', 600], ['touchmove', 500], ['touchmove', 400], ['touchcancel', 400]]) {
      const event = new Event(type, { bubbles: true, cancelable: type === 'touchmove' ? cancelable : true });
      const points = type === 'touchcancel' ? [] : Array.from({ length: fingers }, (_, i) => ({ clientX: 170 + i * 40, clientY: y }));
      Object.defineProperty(event, 'touches', { value: points });
      document.body.dispatchEvent(event);
      prevented.push(event.defaultPrevented);
    }
    return prevented;
  }, { cancelable, fingers });
}

(async () => {
  for (const engine of [webkit, chromium]) {
    const browser = await engine.launch({ headless: true, ...(engine === chromium && process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {}) });
    try {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.route('https://fonts.googleapis.com/**', route => route.abort());
      await page.route(hosted + '**', async route => {
        const name = new URL(route.request().url()).pathname.split('/').pop() || 'index.html';
        assert(['index.html', 'halloween.css', 'halloween.js', 'halloween-child.js', 'halloween-parent.js'].includes(name));
        await route.fulfill({ path: path.join(root, name), contentType: name.endsWith('.js') ? 'application/javascript' : name.endsWith('.css') ? 'text/css' : 'text/html' });
      });
      await page.route(parent, route => route.fulfill({ contentType: 'text/html', body: `<!doctype html><html style="scroll-behavior:smooth"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="margin:0"><header style="height:80px">Native site header</header><iframe data-hh-page-scroll data-top-offset="80" src="${hosted}" width="100%" height="900"></iframe><footer style="height:200px">Native site footer</footer><script src="${hosted}halloween-parent.js" defer></script></body></html>` }));
      await page.goto(parent);
      await page.locator('iframe[data-hh-page-connected="true"]').waitFor();
      const child = page.frames().find(frame => frame.url().startsWith(hosted));
      await child.evaluate(() => document.fonts.ready);
      // Allow the frame's final font/layout height report to settle.
      await page.waitForTimeout(100);
      const reset = async () => {
        await page.evaluate(() => {
          document.documentElement.style.scrollBehavior = 'auto';
          window.scrollTo(0, 100);
        });
        await page.waitForTimeout(50);
        return page.evaluate(() => scrollY);
      };
      for (const cancelable of [true, false]) {
        const before = await reset();
        const prevented = await gesture(child, cancelable);
        await page.waitForFunction(y => scrollY - y >= 190, before, { timeout: 2500 });
        assert(Math.abs(await page.evaluate(() => scrollY) - before - 200) < 5, 'Both touch deltas must accumulate');
        assert.equal(await child.evaluate(() => scrollY), 0, 'Only the outer page scrolls');
        assert.equal(prevented[1], cancelable);
      }
      const beforePinch = await reset();
      assert((await gesture(child, true, 2)).every(value => !value), 'Do not cancel multi-touch zoom');
      await page.waitForTimeout(50);
      assert.equal(await page.evaluate(() => scrollY), beforePinch);
      assert.equal(await child.locator('html').evaluate(el => getComputedStyle(el).touchAction), 'pinch-zoom');
      for (const chapter of ['porch', 'trunk', 'neighborhood']) {
        await child.locator(`[data-nav="${chapter}"]`).evaluate(el => el.click());
        await child.waitForFunction(name => document.querySelector('.sticky-scene').dataset.currentScene === name, chapter);
      }
      if (engine === chromium) {
        await reset();
        const session = await page.context().newCDPSession(page);
        await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 195, y: 650, id: 1 }] });
        for (let y = 620; y >= 260; y -= 30) {
          await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 195, y, id: 1 }] });
          await page.waitForTimeout(20);
        }
        await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
        await page.waitForFunction(() => scrollY > 300);
        assert.equal(await child.evaluate(() => scrollY), 0);
      }
      await page.goto(hosted);
      await page.locator('body[data-halloween-bound="true"]').waitFor();
      assert.equal(await page.locator('[data-source-paragraph]').count(), 16);
      assert.equal(await page.locator('.brand, footer').count(), 0);
      await page.evaluate(() => scrollTo(0, 500));
      await page.waitForFunction(() => scrollY >= 500);
      await page.locator('#motion-toggle').click();
      assert.equal(await page.locator('#motion-toggle').getAttribute('aria-pressed'), 'true');
      assert.deepEqual(errors, []);
      console.log(`PASS ${engine.name()}: cancelable/non-cancelable touch, accumulated deltas, pinch preservation, chapters, standalone, reporting and controls`);
    } finally { await browser.close(); }
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
