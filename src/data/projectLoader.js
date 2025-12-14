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
    github: data.github,
    demo: data.demo,
    relatedLinks: data.relatedLinks || [],
    relatedVideos: data.relatedVideos || [],
    images: data.images || [],
    installation: data.installation,
    content: markdownContent,
  };
});

// Sort projects by date (most recent first)
// Uses startDate for sorting, falls back to endDate, then importance
export const projectsData = unsortedProjects.sort((a, b) => {
  const dateA = a.startDate || a.endDate || '1900-01';
  const dateB = b.startDate || b.endDate || '1900-01';

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
