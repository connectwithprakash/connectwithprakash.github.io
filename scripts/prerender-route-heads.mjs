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

const writeRouteHead = async ({ route, title, description, image, publishedTime }) => {
  if (routes.has(route)) throw new Error(`Duplicate content route: ${route}`);
  routes.add(route);

  const url = `${siteUrl}${route}`;
  const fullTitle = `${title} | ${siteName}`;
  const imageUrl = new URL(image || defaultImage, siteUrl).href;
  const head = [
    `<title>${escapeHtml(fullTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    '<meta property="og:type" content="article" />',
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
  const output = template.replace('</head>', `    ${head}\n  </head>`);
  const destination = path.join(distDir, route.slice(1), 'index.html');
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, output);
};

const blogDir = 'src/content/blog';
for (const file of (await fs.readdir(blogDir)).filter(file => file.endsWith('.md'))) {
  const { data } = matter(await fs.readFile(path.join(blogDir, file), 'utf8'));
  if (!data.title || !data.description) throw new Error(`Missing article metadata: ${file}`);
  const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
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

console.log(`Wrote static metadata for ${routes.size} article and project routes`);
