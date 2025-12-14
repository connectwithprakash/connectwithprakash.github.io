import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { projectsData } from '../data/projectLoader';
import './Projects.css';

const getStatusOrDate = (project) => {
  if (project.status === 'in-progress') {
    return { text: 'In Progress', type: 'in-progress' };
  }
  if (project.endDate) {
    const date = new Date(project.endDate);
    return { text: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), type: 'date' };
  }
  if (project.status === 'completed') {
    return { text: 'Completed', type: 'completed' };
  }
  return null;
};

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Filter out the old personal website project, use data from projectsData
  const projects = projectsData.filter(p => p.id !== 'personal-website');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section id="projects" className="section projects">
      <div className="container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              Things I've built - from robotics competitions to production AI systems
            </p>
          </motion.div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className={`project-card glass-card ${project.featured ? 'featured' : ''}`}
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <Link to={`/project/${project.id}`} className="project-card-link">
                  <div className="project-card-badges">
                    {getStatusOrDate(project) && (
                      <div className={`project-card-status status-${getStatusOrDate(project).type}`}>
                        <span>{getStatusOrDate(project).text}</span>
                      </div>
                    )}
                    {project.featured && (
                      <div className="featured-badge">
                        <span>Featured</span>
                      </div>
                    )}
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
                    <h3 className="project-title">{project.title}</h3>
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

          <motion.div className="projects-cta" variants={itemVariants}>
            <p>Want to see more?</p>
            <motion.a
              href="https://github.com/connectwithprakash?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glass"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All 55+ Projects on GitHub
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
