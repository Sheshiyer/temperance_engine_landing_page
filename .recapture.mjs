import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const errors = [];
page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
page.on('console', m => { if (m.type() === 'error') errors.push(`console: ${m.text()}`); });

await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

// Helper: scroll the features section to viewport center so the
// IntersectionObserver (threshold 0.22) reliably fires, then wait for
// the entrance animations (~180ms line delay + 900ms line duration +
// 120ms card delay + 700ms card duration ≈ 1900ms) to settle.
async function scrollFeaturesAndSettle() {
  await page.evaluate(() => {
    const sec = document.querySelector('.features');
    if (sec) sec.scrollIntoView({ block: 'center', behavior: 'instant' });
  });
  await page.waitForTimeout(2200);
}

// 1. Hero (no scroll)
await page.screenshot({ path: '/tmp/te-desktop-hero.png', fullPage: false });

// 2. Features — bring section into view, wait for entrance, capture
await scrollFeaturesAndSettle();
await page.screenshot({ path: '/tmp/te-desktop-features-cards.png', fullPage: false });

// 3. Full page (now that IO has fired, scroll back to top so layout is normal)
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(200);
await page.screenshot({ path: '/tmp/te-desktop-full.png', fullPage: true });

// 4. Hover one card to verify ambient triggers (cards now visible)
await scrollFeaturesAndSettle();
await page.evaluate(() => {
  const cards = document.querySelectorAll('.card');
  if (cards[0]) cards[0].dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
});
await page.waitForTimeout(700);
await page.screenshot({ path: '/tmp/te-desktop-hover.png', fullPage: false });

console.log('errors:', JSON.stringify(errors));
await browser.close();
