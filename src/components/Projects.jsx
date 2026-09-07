import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import { projectsData } from '../data/projectLoader';
import './Projects.css';

const Projects = () => {
  // Show only featured projects, sorted by importance
  const projects = projectsData
    .filter(p => p.id !== 'personal-website' && p.featured === true)
    .sort((a, b) => a.importance - b.importance)
    .slice(0, 3);

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
          initial={false}
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              Things I've built - from robotics competitions to production AI systems
            </p>
          </motion.div>

          <div className="projects-grid">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className={`project-card glass-card ${project.featured ? 'featured' : ''}`}
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          <motion.div className="projects-cta" variants={itemVariants}>
            <p>Want to see more?</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/projects" className="btn btn-primary">View all projects</Link>
              <motion.a
                href="https://github.com/connectwithprakash?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-glass"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                GitHub (55+ repos)
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
