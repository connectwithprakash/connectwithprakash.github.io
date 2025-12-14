import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { projectsData } from '../data/projectLoader';
import './ProjectsPage.css';

const getStatusOrDate = (project) => {
  if (project.status === 'in-progress') {
    return { text: 'In Progress', type: 'in-progress' };
  }
  if (project.endDate) {
    const dateStr = project.endDate.length === 7 ? `${project.endDate}-01` : project.endDate;
    const date = new Date(dateStr);
    return { text: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), type: 'date' };
  }
  if (project.status === 'completed') {
    return { text: 'Completed', type: 'completed' };
  }
  return null;
};

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'featured', label: 'Featured' },
  { id: 'agentic-ai', label: 'Agentic AI' },
  { id: 'mlops', label: 'MLOps' },
  { id: 'computer-vision', label: 'Computer Vision' },
  { id: 'robotics', label: 'Robotics' },
  { id: 'security', label: 'Security' },
];

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredProjects = projectsData
    .filter(p => p.id !== 'personal-website')
    .filter(p => {
      if (activeCategory === 'all') return true;
      if (activeCategory === 'featured') return p.featured === true;
      return p.category === activeCategory;
    })
    .sort((a, b) => a.importance - b.importance);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="projects-page">
      <div className="container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className="projects-page-header" variants={itemVariants}>
            <h1 className="projects-page-title">All Projects</h1>
            <p className="projects-page-subtitle">
              Explore my complete portfolio - from production AI systems to open-source tools
            </p>
          </motion.div>

          <motion.div className="category-filters" variants={itemVariants}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-filter ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          <motion.div className="projects-count" variants={itemVariants}>
            <p>Showing {filteredProjects.length} {activeCategory === 'all' ? 'projects' : activeCategory === 'featured' ? 'featured projects' : `${categories.find(c => c.id === activeCategory)?.label.toLowerCase()} projects`}</p>
          </motion.div>

          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`project-card glass-card ${project.featured ? 'featured' : ''}`}
                whileHover={{ y: -8 }}
              >
                <Link to={`/project/${project.id}`} className="project-card-link">
                  <div className="project-card-header">
                    <div className="project-card-badges">
                      {getStatusOrDate(project) && (
                        <div className={`project-card-status status-${getStatusOrDate(project).type}`}>
                          {getStatusOrDate(project).text}
                        </div>
                      )}
                      {project.featured && (
                        <div className="featured-badge">
                          Featured
                        </div>
                      )}
                    </div>
                    <h3 className="project-title">{project.title}</h3>
                  </div>

                  {project.thumbnail && (
                    <div className="project-thumbnail">
                      <img src={project.thumbnail} alt={project.title} />
                    </div>
                  )}
                  {!project.thumbnail && (
                    <div className="project-gradient" style={{ background: project.gradient }} />
                  )}

                  <div className="project-content">
                    <p className="project-description">{project.shortDescription}</p>
                    <div className="project-tags">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="project-tag">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="project-tag">+{project.tags.length - 3}</span>
                      )}
                    </div>

                    <div className="project-links">
                      <motion.button
                        className="project-link-btn primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.preventDefault()}
                      >
                        <span>View Details</span>
                        <FaExternalLinkAlt />
                      </motion.button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsPage;
