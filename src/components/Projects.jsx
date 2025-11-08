import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: 'Memory-Optimized Agent',
      description: 'Production-ready AI context management using semantic similarity - 42% cost reduction with <12ms filtering. Features LangGraph workflows, FastAPI, PostgreSQL with pgvector.',
      tags: ['Python', 'LangGraph', 'FastAPI', 'PostgreSQL', 'AI'],
      gradient: 'var(--gradient-primary)',
      featured: true,
      github: 'https://github.com/connectwithprakash/memory-optimized-agent',
      demo: 'https://github.com/connectwithprakash/memory-optimized-agent#readme',
    },
    {
      title: 'Norch',
      description: 'A simple PyTorch-like deep learning library built entirely with NumPy. Implements neural network layers, activation functions, loss functions, and optimizers for educational purposes.',
      tags: ['Python', 'NumPy', 'Deep Learning', 'Jupyter'],
      gradient: 'var(--gradient-secondary)',
      featured: true,
      github: 'https://github.com/connectwithprakash/norch',
      demo: 'https://github.com/connectwithprakash/norch',
    },
    {
      title: 'ABU Robocon 2018',
      description: 'Autonomous robots designed and built for the ABU Robocon 2018 international competition. Features advanced control systems and embedded programming.',
      tags: ['C++', 'Robotics', 'Embedded', 'Competition'],
      gradient: 'var(--gradient-tertiary)',
      featured: false,
      github: 'https://github.com/connectwithprakash/ABU-Robocon-2018',
      demo: 'https://github.com/connectwithprakash/ABU-Robocon-2018',
    },
    {
      title: 'Data Science Cookiecutter',
      description: 'Boilerplate project setup for data science projects. Provides structured template for reproducible research and standardized workflows.',
      tags: ['Python', 'Data Science', 'Template', 'Best Practices'],
      gradient: 'var(--gradient-quaternary)',
      featured: false,
      github: 'https://github.com/connectwithprakash/datascience_cookiecutter',
      demo: 'https://github.com/connectwithprakash/datascience_cookiecutter',
    },
    {
      title: 'Pibrary',
      description: 'Collection of reusable Python scripts and modules. Contains utilities and helper functions useful across multiple projects.',
      tags: ['Python', 'Library', 'Utilities', 'Tools'],
      gradient: 'var(--gradient-cosmic)',
      featured: false,
      github: 'https://github.com/connectwithprakash/pibrary',
      demo: 'https://github.com/connectwithprakash/pibrary',
    },
    {
      title: 'Personal Website',
      description: 'My personal portfolio website showcasing projects, publications, and professional experience. Built with modern web technologies.',
      tags: ['HTML', 'CSS', 'JavaScript', 'Portfolio'],
      gradient: 'var(--gradient-primary)',
      featured: false,
      github: 'https://github.com/connectwithprakash/connectwithprakash.github.io',
      demo: 'https://www.connectwithprakash.com',
    },
  ];

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
              Innovative solutions at the intersection of AI and real-world problems
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
                <div className="project-gradient" style={{ background: project.gradient }} />

                <div className="project-content">
                  {project.featured && (
                    <div className="featured-badge">
                      <span>Featured</span>
                    </div>
                  )}

                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="project-links">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub />
                      <span>Code</span>
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaExternalLinkAlt />
                      <span>View</span>
                    </motion.a>
                  </div>
                </div>
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
