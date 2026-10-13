import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
import { preview } from 'vite';

const distDir = 'dist';
const sitemap = await fs.readFile(path.join(distDir, 'sitemap.xml'), 'utf8');
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname);
const server = await preview({ configFile: false, preview: { host: '127.0.0.1', port: 0, strictPort: true, open: false } });
const origin = `http://127.0.0.1:${server.httpServer.address().port}`;
let browser;
try {
  browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: 'dark', reducedMotion: 'reduce' });
  // Capture only repository-owned content; do not freeze third-party responses or contact comment services.
  await context.route('**/*', request => new URL(request.request().url()).origin === origin ? request.continue() : request.abort());
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const route of routes) {
    errors.length = 0;
    await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => document.querySelector('#page-content h1, #page-content h2') &&
      !document.querySelector('.route-loading, .resume-loading'));
    await page.waitForFunction(() => [...document.querySelectorAll('.mermaid-diagram')].every(element => element.querySelector('svg')));
    // Trigger the existing intersection-observer entrances throughout the page.
    await page.evaluate(async () => {
      for (let top = 0; top < document.documentElement.scrollHeight; top += 800) {
        window.scrollTo(0, top);
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(700);
    assert.deepEqual(errors, [], `Browser error on ${route}`);
    const captured = await page.evaluate(() => {
      const root = document.getElementById('root').cloneNode(true);
      root.querySelectorAll('iframe, script:not([type="application/ld+json"])').forEach(element => element.remove());
      // Off-screen entrance animations must not hide static content without JavaScript.
      root.querySelectorAll('[style]').forEach(element => {
        if (element instanceof HTMLElement) {
          if (element.style.opacity) element.style.opacity = '1';
          if (/translate/.test(element.style.transform)) element.style.removeProperty('transform');
        }
      });
      const styles = [...document.querySelectorAll('head link[rel="stylesheet"]')].map(element => {
        const link = element.cloneNode(true);
        const url = new URL(link.href);
        if (url.origin === location.origin) link.setAttribute('href', url.pathname);
        return link.outerHTML;
      });
      return { html: root.innerHTML, text: root.textContent, styles };
    });
    assert.ok(captured.text.length > 200, `Missing content on ${route}`);
    const file = path.join(distDir, route === '/' ? 'index.html' : `${route.slice(1)}.html`);
    const template = await fs.readFile(file, 'utf8');
    assert.ok(template.includes('<div id="root"></div>'), `Unexpected template on ${route}`);
    const existingStyles = new Set([...template.matchAll(/<link[^>]+rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g)].map(match => match[1]));
    const additionalStyles = captured.styles.filter(style => !existingStyles.has(style.match(/href="([^"]+)"/)?.[1]));
    const html = template
      .replace('<html lang="en">', '<html lang="en" class="dark">')
      .replace('</head>', `${additionalStyles.join('\n')}\n<style id="prerender-handoff">#prerender-content ~ #root { display: none; }</style>\n</head>`)
      .replace('<div id="root"></div>', `<div id="prerender-content" data-route="${route}">${captured.html}</div>\n<div id="root"></div>`);
    await fs.writeFile(file, html);
    console.log(`Pre-rendered ${route} (${captured.text.length} text characters)`);
  }
  console.log(`Pre-rendered content for all ${routes.length} sitemap pages.`);
} finally {
  await browser?.close();
  await new Promise(resolve => server.httpServer.close(resolve));
}
