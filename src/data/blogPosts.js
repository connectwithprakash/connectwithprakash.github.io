import matter from 'gray-matter';

// Import all markdown files from the blog directory
const modules = import.meta.glob('../content/blog/*.md', {
  eager: true,
  as: 'raw'
});

// Process markdown files into blog post objects
export const blogPosts = Object.entries(modules).map(([path, content]) => {
  // Parse frontmatter and content using gray-matter
  const { data, content: markdownContent } = matter(content);

  // Extract filename from path (e.g., "2023-08-13-motivation.md" -> "motivation")
  const filename = path.split('/').pop();
  const id = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace('.md', '');

  return {
    id,
    title: data.title,
    date: data.date,
    description: data.description,
    tags: data.tags || [],
    category: data.category,
    content: markdownContent,
  };
});
