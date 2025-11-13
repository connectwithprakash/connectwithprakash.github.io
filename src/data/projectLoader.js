import matter from 'gray-matter';

// Import all markdown files from the projects directory
const modules = import.meta.glob('../content/projects/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
});

// Process markdown files into project objects
export const projectsData = Object.entries(modules).map(([path, content]) => {
  // Parse frontmatter and content using gray-matter
  const { data, content: markdownContent } = matter(content);

  return {
    id: data.id,
    title: data.title,
    shortDescription: data.shortDescription,
    category: data.category,
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
