import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
import { preview } from 'vite';

const siteUrl = process.env.VERIFY_SITE_URL;
const sitemap = siteUrl
  ? await (await fetch(`${siteUrl}/sitemap.xml`)).text()
  : await fs.readFile('dist/sitemap.xml', 'utf8');
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname);
const server = siteUrl ? null : await preview({ configFile: false, preview: { host: '127.0.0.1', port: 0, strictPort: true, open: false } });
const origin = siteUrl || `http://127.0.0.1:${server.httpServer.address().port}`;
const screenshots = process.env.PRERENDER_SCREENSHOTS;
if (screenshots) await fs.mkdir(screenshots, { recursive: true });
let browser;
try {
  browser = await chromium.launch();
  const staticContext = await browser.newContext({ javaScriptEnabled: false, colorScheme: 'dark' });
  const interactiveContext = await browser.newContext({ colorScheme: 'dark', reducedMotion: 'reduce' });
  for (const context of [staticContext, interactiveContext]) {
    await context.route('**/*', request => new URL(request.request().url()).origin === origin ? request.continue() : request.abort());
  }
  const staticPage = await staticContext.newPage();
  const interactivePage = await interactiveContext.newPage();
  const errors = [];
  interactivePage.on('pageerror', error => errors.push(error.message));
  const report = [];
  for (const route of routes) {
    await staticPage.goto(`${origin}${route}`, { waitUntil: 'networkidle' });
    const content = staticPage.locator('#prerender-content #page-content');
    assert.ok((await content.textContent()).trim().length > 100, `Missing static content: ${route}`);
    assert.ok(await content.locator('h1, h2').first().isVisible(), `Static heading hidden: ${route}`);
    assert.equal(await staticPage.locator('link[rel="canonical"]').getAttribute('href'), new URL(route, 'https://connectwithprakash.com').href);
    errors.length = 0;
    await interactivePage.goto(`${origin}${route}`, { waitUntil: 'networkidle' });
    await interactivePage.waitForSelector('#prerender-content', { state: 'detached' });
    assert.ok(await interactivePage.locator('#root #page-content h1, #root #page-content h2').first().isVisible(), `Interactive heading hidden: ${route}`);
    assert.deepEqual(errors, [], `Interactive errors: ${route}`);
    assert.equal(await interactivePage.locator('#page-content').count(), 1, `Duplicate page content: ${route}`);
    report.push({ route, static: 'passed', interactive: 'passed' });
  }
  // Script delivery failure must leave the static page usable.
  const blocked = await browser.newContext({ colorScheme: 'dark' });
  await blocked.route('**/*.js', request => request.abort());
  const blockedPage = await blocked.newPage();
  await blockedPage.goto(`${origin}/personal/books`);
  assert.ok(await blockedPage.locator('#prerender-content').isVisible());
  assert.ok(await blockedPage.getByText('The Psychology of Money', { exact: true }).isVisible());

  await interactivePage.goto(`${origin}/personal/books`);
  await interactivePage.waitForSelector('#prerender-content', { state: 'detached' });
  const themeButton = interactivePage.getByRole('button', { name: /switch to light mode/i });
  await themeButton.click();
  await interactivePage.waitForFunction(() => document.documentElement.classList.contains('light'));
  await interactivePage.getByRole('link', { name: 'Back to professional portfolio' }).click();
  await interactivePage.waitForURL(`${origin}/`);
  await interactivePage.locator('a[href="/projects"]').first().click();
  await interactivePage.waitForURL(`${origin}/projects`);
  await interactivePage.getByRole('heading', { name: 'All Projects', exact: true }).waitFor({ state: 'visible' });
  assert.ok(await interactivePage.getByRole('heading', { name: 'All Projects', exact: true }).isVisible());

  for (const width of [375, 390, 1440]) {
    await interactivePage.setViewportSize({ width, height: 900 });
    await interactivePage.goto(`${origin}/personal/books`);
    await interactivePage.waitForSelector('#prerender-content', { state: 'detached' });
    assert.ok(await interactivePage.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Horizontal overflow at ${width}px`);
    if (screenshots) await interactivePage.screenshot({ path: path.join(screenshots, `books-${width}.png`), fullPage: false });
  }
  if (screenshots) {
    await fs.writeFile(path.join(screenshots, 'verification.json'), JSON.stringify(report, null, 2));
    await staticPage.goto(`${origin}/blog/tool-as-code-vs-react`);
    await staticPage.screenshot({ path: path.join(screenshots, 'article-no-javascript.png'), fullPage: false });
  }
  console.log(`Verified all ${report.length} sitemap pages with JavaScript disabled and enabled; script-failure fallback, theme switching, client navigation, and responsive Books layouts passed.`);
} finally {
  await browser?.close();
  if (server) await new Promise(resolve => server.httpServer.close(resolve));
}
