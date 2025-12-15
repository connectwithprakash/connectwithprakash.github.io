import matter from 'gray-matter';

// Import all markdown files from the projects directory
const modules = import.meta.glob('../content/projects/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
});

// Process markdown files into project objects
const unsortedProjects = Object.entries(modules).map(([path, content]) => {
  // Parse frontmatter and content using gray-matter
  const { data, content: markdownContent } = matter(content);

  return {
    id: data.id,
    title: data.title,
    shortDescription: data.shortDescription,
    category: data.category,
    status: data.status,
    startDate: data.startDate,
    endDate: data.endDate,
    importance: data.importance,
    featured: data.featured,
    tags: data.tags || [],
    gradient: data.gradient,
    thumbnail: data.thumbnail,
    heroImage: data.heroImage,
    showThumbnailInDetail: data.showThumbnailInDetail,
    github: data.github,
    demo: data.demo,
    relatedLinks: data.relatedLinks || [],
    relatedVideos: data.relatedVideos || [],
    images: data.images || [],
    installation: data.installation,
    content: markdownContent,
  };
});

// Sort projects by end date (most recent first)
// In-progress projects (no endDate) sort to top using future date
export const projectsData = unsortedProjects.sort((a, b) => {
  // Use endDate, or '9999-12' for in-progress (puts them at top), or startDate as fallback
  const dateA = a.endDate || (a.status === 'in-progress' ? '9999-12' : a.startDate) || '1900-01';
  const dateB = b.endDate || (b.status === 'in-progress' ? '9999-12' : b.startDate) || '1900-01';

  // Sort by date descending (most recent first)
  if (dateA !== dateB) {
    return dateB.localeCompare(dateA);
  }

  // If same date, sort by importance (lower number = higher priority)
  return (a.importance || 99) - (b.importance || 99);
});

// Helper functions
export const getProjectById = (id) => {
  return projectsData.find(project => project.id === id);
};

export const getFeaturedProjects = () => {
  return projectsData.filter(project => project.featured);
};

export const getProjectsByCategory = (category) => {
  return projectsData.filter(project => project.category === category);
};
