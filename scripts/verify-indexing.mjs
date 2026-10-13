import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';

const siteUrl = 'https://connectwithprakash.com';
const sitemap = await fs.readFile('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.ok(urls.length > 0, 'Sitemap must contain URLs');
assert.equal(new Set(urls).size, urls.length, 'Sitemap URLs must be unique');
for (const url of urls) {
  assert.ok(url.startsWith(`${siteUrl}/`), `Non-canonical host: ${url}`);
  const route = new URL(url).pathname;
  assert.ok(route === '/' || !route.endsWith('/'), `Unexpected trailing slash: ${url}`);
  const file = path.join('dist', route === '/' ? 'index.html' : `${route.slice(1)}.html`);
  const html = await fs.readFile(file, 'utf8');
  assert.equal((html.match(/<title>/g) || []).length, 1, `Expected one title: ${url}`);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `Expected one canonical: ${url}`);
  assert.ok(html.includes(`rel="canonical" href="${url}"`), `Canonical mismatch: ${url}`);
  assert.ok(html.includes('<meta name="description" content="'), `Missing description: ${url}`);
  assert.ok(!html.includes('noindex'), `Indexable page contains noindex: ${url}`);
}
const notFound = await fs.readFile('dist/404.html', 'utf8');
assert.ok(notFound.includes('name="robots" content="noindex, follow"'));
assert.ok(!notFound.includes('rel="canonical"'));
assert.ok(!sitemap.includes(`${siteUrl}/404`));
const redirects = await fs.readFile('dist/_redirects', 'utf8');
assert.ok(redirects.includes('/books /personal/books 301'));
console.log(`Verified metadata and canonical URLs for ${urls.length} sitemap routes, legacy redirects, and the noindex 404 page.`);
