import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { getProjectSocialImage } from '../src/data/projectSocialImage.js';

const siteUrl = 'https://connectwithprakash.com';
const siteName = 'Prakash Chaudhary';
const defaultImage = `${siteUrl}/assets/og-image.png`;
const distDir = 'dist';
const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8');
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);
const routes = new Set();

const writeRouteHead = async ({ route, title, description, image, publishedTime, type = 'article', noIndex = false }) => {
  if (routes.has(route)) throw new Error(`Duplicate content route: ${route}`);
  routes.add(route);

  const url = `${siteUrl}${route}`;
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const imageUrl = new URL(image || defaultImage, siteUrl).href;
  const head = [
    `<title>${escapeHtml(fullTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    ...(!noIndex ? [`<link rel="canonical" href="${escapeHtml(url)}" />`] : []),
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:image" content="${escapeHtml(imageUrl)}" />`,
    ...(publishedTime ? [`<meta property="article:published_time" content="${escapeHtml(publishedTime)}" />`] : []),
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />`,
  ].join('\n    ');
  const output = template
    .replace(/(<meta name="(?:robots|googlebot)" content=")[^"]*("\s*\/?>)/g,
      `$1${noIndex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}$2`)
    .replace('</head>', `    ${head}\n  </head>`);
  // Flat HTML lets Netlify serve the existing slashless canonical URL directly.
  const destination = path.join(distDir, route === '/' ? 'index.html' : `${route.slice(1)}.html`);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, output);
};

// Read literal page metadata from its owner rather than maintaining a second copy.
const pageFiles = ['Home', 'AboutPage', 'ProjectsPage', 'NewsPage', 'PublicationsPage',
  'WritingResearchPage', 'Blog', 'Resume', 'PersonalPage', 'BooksPage', 'ThoughtsPage', 'QuestionPage'];
for (const page of pageFiles) {
  const source = await fs.readFile(`src/pages/${page}.jsx`, 'utf8');
  const seo = source.match(/<SEO\s[\s\S]*?\/>/)?.[0];
  const route = seo?.match(/url="([^"]+)"/)?.[1];
  const description = seo?.match(/description="([^"]+)"/)?.[1];
  const title = page === 'Home' ? null : page === 'Resume' ? 'Resume' : seo?.match(/title="([^"]+)"/)?.[1];
  if (!route || !description || (page !== 'Home' && !title)) throw new Error(`Missing static page metadata: ${page}`);
  await writeRouteHead({ route, title, description, type: 'website' });
}
await writeRouteHead({ route: '/404', title: 'Page not found',
  description: 'This page could not be found.', type: 'website', noIndex: true });

const legacyRedirects = ['/books /personal/books 301', '/inquiry /personal/inquiry 301',
  '/question /personal/inquiry 301'];
const blogDir = 'src/content/blog';
for (const file of (await fs.readdir(blogDir)).filter(file => file.endsWith('.md'))) {
  const { data } = matter(await fs.readFile(path.join(blogDir, file), 'utf8'));
  if (!data.title || !data.description) throw new Error(`Missing article metadata: ${file}`);
  const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
  if (data.category === 'personal') legacyRedirects.push(`/blog/${slug} /personal/thoughts/${slug} 301`);
  await writeRouteHead({
    route: data.category === 'personal' ? `/personal/thoughts/${slug}` : `/blog/${slug}`,
    title: data.title,
    description: data.description,
    publishedTime: data.date,
  });
}

const projectDir = 'src/content/projects';
for (const file of (await fs.readdir(projectDir)).filter(file => file.endsWith('.md'))) {
  const { data } = matter(await fs.readFile(path.join(projectDir, file), 'utf8'));
  if (!data.id || !data.title || !data.shortDescription) throw new Error(`Missing project metadata: ${file}`);
  if (data.id !== file.replace(/\.md$/, '')) throw new Error(`Project ID does not match filename: ${file}`);
  await writeRouteHead({
    route: `/project/${data.id}`,
    title: data.title,
    description: data.shortDescription,
    image: getProjectSocialImage(data),
  });
}

await fs.writeFile(path.join(distDir, '_redirects'), `${legacyRedirects.join('\n')}\n`);
console.log(`Wrote static metadata for ${routes.size - 1} indexable routes and a noindex 404 page`);

const sitemapPath = path.join(distDir, 'sitemap.xml');
const sitemap = await fs.readFile(sitemapPath, 'utf8');
// The sitemap plugin defaults to build-time dates, which are not page modification dates.
await fs.writeFile(sitemapPath, sitemap.replace(/<lastmod>[^<]*<\/lastmod>/g, ''));
