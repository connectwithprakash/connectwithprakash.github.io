import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../data/projectLoader';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import './ProjectsPage.css';

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'featured', label: 'Featured' },
  { id: 'agentic-ai', label: 'Agentic AI' },
  { id: 'mlops', label: 'MLOps' },
  { id: 'developer-tools', label: 'Developer Tools' },
  { id: 'mobile-apps', label: 'Mobile Apps' },
  { id: 'computer-vision', label: 'Computer Vision' },
  { id: 'robotics', label: 'Robotics' },
  { id: 'security', label: 'Security' },
];

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = projectsData
    .filter(p => p.id !== 'personal-website')
    .filter(p => {
      if (activeCategory === 'all') return true;
      if (activeCategory === 'featured') return p.featured === true;
      return p.category === activeCategory;
    })
    .sort((a, b) => a.importance - b.importance);

  return (
    <div className="projects-page">
      <SEO
        title="Projects"
        description="Explore my portfolio of AI and ML projects - from production systems to open-source tools in Agentic AI, MLOps, and Computer Vision."
        keywords="AI Projects, Machine Learning Portfolio, MLOps, Computer Vision Projects, Agentic AI"
        url="/projects"
      />
      <StructuredData
        type="collection"
        collection={{
          title: 'Projects - Prakash Chaudhary',
          description: 'Portfolio of AI and ML projects including Agentic AI systems, MLOps pipelines, and Computer Vision applications.',
          url: '/projects',
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Projects' },
        ]}
      />
      <div className="container">
        <div className="projects-page-header">
          <h1 className="projects-page-title">All Projects</h1>
          <p className="projects-page-subtitle">
            Explore my complete portfolio - from production AI systems to open-source tools
          </p>
        </div>

        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-filter ${activeCategory === category.id ? 'active' : ''}`}
              aria-pressed={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="projects-count">
          <p>Showing {filteredProjects.length} {activeCategory === 'all' ? 'projects' : activeCategory === 'featured' ? 'featured projects' : `${categories.find(c => c.id === activeCategory)?.label.toLowerCase()} projects`}</p>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className={`project-card glass-card ${project.featured ? 'featured' : ''}`}
              whileHover={{ y: -8 }}
            >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
