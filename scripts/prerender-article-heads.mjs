import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const siteUrl = 'https://connectwithprakash.com';
const siteName = 'Prakash Chaudhary';
const defaultImage = `${siteUrl}/assets/og-image.png`;
const contentDir = 'src/content/blog';
const distDir = 'dist';
const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8');
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);
const files = (await fs.readdir(contentDir)).filter(file => file.endsWith('.md'));
const routes = new Set();

for (const file of files) {
  const { data } = matter(await fs.readFile(path.join(contentDir, file), 'utf8'));
  if (!data.title || !data.description) throw new Error(`Missing article metadata: ${file}`);
  const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
  const route = data.category === 'personal' ? `/personal/thoughts/${slug}` : `/blog/${slug}`;
  if (routes.has(route)) throw new Error(`Duplicate article route: ${route}`);
  routes.add(route);

  const url = `${siteUrl}${route}`;
  const title = `${data.title} | ${siteName}`;
  const image = defaultImage;
  const head = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(data.description)}" />`,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    '<meta property="og:type" content="article" />',
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(data.description)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta property="article:published_time" content="${escapeHtml(data.date)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(data.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
  ].join('\n    ');
  const output = template.replace('</head>', `    ${head}\n  </head>`);
  const destination = path.join(distDir, route.slice(1), 'index.html');
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, output);
}

console.log(`Wrote static metadata for ${routes.size} article routes`);
