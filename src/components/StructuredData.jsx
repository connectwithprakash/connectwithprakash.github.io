/**
 * StructuredData Component for JSON-LD Schema Markup
 *
 * Implements structured data following Google's 2025 best practices:
 * - Uses JSON-LD format (Google's recommended approach)
 * - Uses @graph to combine multiple schemas in one script
 * - Links entities with @id references
 * - Includes sameAs for social profiles (E-E-A-T signals)
 */

const SITE_URL = 'https://connectwithprakash.com';
const SITE_NAME = 'Prakash Chaudhary';

// Person entity - central to the knowledge graph
const personData = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Prakash Chaudhary',
  jobTitle: 'ML Engineer',
  description: 'ML Engineer with 5+ years of experience specializing in Agentic AI, MLOps, and Computer Vision',
  url: SITE_URL,
  image: `${SITE_URL}/assets/og-image.png`,
  sameAs: [
    'https://www.linkedin.com/in/connectwithprakash/',
    'https://github.com/connectwithprakash',
    'https://twitter.com/connectwprakash',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Fetch Rewards',
    url: 'https://www.fetchrewards.com',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'University of Alabama in Huntsville',
  },
  knowsAbout: [
    'Machine Learning',
    'Agentic AI',
    'Multi-Agent Systems',
    'MLOps',
    'Computer Vision',
    'LangGraph',
    'Python',
    'Deep Learning',
  ],
};

// WebSite schema - enables sitelinks search box
const websiteData = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: 'Portfolio of Prakash Chaudhary - ML Engineer specializing in Agentic AI, MLOps, and Computer Vision',
  publisher: {
    '@id': `${SITE_URL}/#person`,
  },
};

/**
 * Generate BreadcrumbList schema
 * @param {Array} items - [{name: string, url: string}]
 */
const generateBreadcrumbs = (items) => {
  if (!items || items.length === 0) return null;

  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${SITE_URL}${item.url}` : undefined,
    })),
  };
};

/**
 * Generate Article schema for blog posts
 */
const generateArticle = ({ title, description, url, datePublished, dateModified, image }) => ({
  '@type': 'Article',
  '@id': `${SITE_URL}${url}/#article`,
  headline: title,
  description: description,
  url: `${SITE_URL}${url}`,
  datePublished: datePublished,
  dateModified: dateModified || datePublished,
  image: image || `${SITE_URL}/assets/og-image.png`,
  author: { '@id': `${SITE_URL}/#person` },
  publisher: { '@id': `${SITE_URL}/#person` },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${SITE_URL}${url}`,
  },
});

/**
 * Generate ProfilePage schema (Google recommended for creator profiles)
 */
const generateProfilePage = (url = '/') => ({
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}${url}/#profilepage`,
  url: `${SITE_URL}${url}`,
  name: `${SITE_NAME} - ML Engineer Portfolio`,
  mainEntity: { '@id': `${SITE_URL}/#person` },
});

/**
 * Generate SoftwareSourceCode schema for projects
 * This helps Google understand technical projects better
 */
const generateProject = ({ title, description, url, dateCreated, dateModified, tags, github, image }) => ({
  '@type': 'SoftwareSourceCode',
  '@id': `${SITE_URL}${url}/#project`,
  name: title,
  description: description,
  url: `${SITE_URL}${url}`,
  dateCreated: dateCreated,
  dateModified: dateModified || dateCreated,
  image: image || `${SITE_URL}/assets/og-image.png`,
  author: { '@id': `${SITE_URL}/#person` },
  creator: { '@id': `${SITE_URL}/#person` },
  programmingLanguage: tags?.filter(tag =>
    ['Python', 'JavaScript', 'TypeScript', 'React', 'PyTorch', 'TensorFlow'].includes(tag)
  ) || [],
  keywords: tags?.join(', '),
  ...(github && { codeRepository: github }),
});

/**
 * Generate CollectionPage schema for listing pages
 */
const generateCollectionPage = ({ title, description, url }) => ({
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}${url}/#collectionpage`,
  name: title,
  description: description,
  url: `${SITE_URL}${url}`,
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#person` },
});

/**
 * StructuredData Component
 *
 * @param {Object} props
 * @param {string} props.type - 'home' | 'article' | 'project' | 'collection' | 'page'
 * @param {Array} props.breadcrumbs - [{name, url}]
 * @param {Object} props.article - Article data for blog posts
 * @param {Object} props.project - Project data for project pages
 * @param {Object} props.collection - Collection data for listing pages
 */
const StructuredData = ({ type = 'page', breadcrumbs, article, project, collection }) => {
  const graph = [];

  // Homepage: Person + WebSite + ProfilePage
  if (type === 'home') {
    graph.push(personData);
    graph.push(websiteData);
    graph.push(generateProfilePage('/'));
  }

  // Blog posts: Person + Article
  if (type === 'article' && article) {
    graph.push(personData);
    graph.push(generateArticle(article));
  }

  // Projects: Person + SoftwareSourceCode
  if (type === 'project' && project) {
    graph.push(personData);
    graph.push(generateProject(project));
  }

  // Collection pages (Projects listing, Blog listing)
  if (type === 'collection' && collection) {
    graph.push(personData);
    graph.push(generateCollectionPage(collection));
  }

  // Breadcrumbs for all pages that provide them
  if (breadcrumbs && breadcrumbs.length > 0) {
    graph.push(generateBreadcrumbs(breadcrumbs));
  }

  if (graph.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default StructuredData;
export { generateBreadcrumbs, generateArticle, personData, SITE_URL };
