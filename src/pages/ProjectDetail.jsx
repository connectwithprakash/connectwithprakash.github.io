import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaYoutube } from 'react-icons/fa';
import { getProjectById } from '../data/projectsData';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getProjectById(id);

  if (!project) {
    return (
      <div className="project-detail-page">
        <div className="container">
          <div className="project-not-found">
            <h1>Project Not Found</h1>
            <p>The project you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn-primary">Go Home</Link>
          </div>
        </div>
      </div>
    );
  }

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
    <div className="project-detail-page">
      <div className="container">
        <motion.div
          className="project-detail"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Back Button */}
          <motion.button
            className="back-button"
            variants={itemVariants}
            onClick={() => navigate('/')}
            whileHover={{ x: -5 }}
          >
            <FaArrowLeft />
            <span>Back to Projects</span>
          </motion.button>

          {/* Project Header */}
          <motion.div className="project-header" variants={itemVariants}>
            {project.thumbnail && (
              <div className="project-hero-image">
                <img src={project.thumbnail} alt={project.title} />
              </div>
            )}
            <div className="project-header-content">
              <div className="project-category-badge">{project.category}</div>
              <h1 className="project-title">{project.title}</h1>
              <p className="project-short-desc">{project.shortDescription}</p>

              <div className="project-tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="project-tag">{tag}</span>
                ))}
              </div>

              <div className="project-links">
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub />
                    <span>View Code</span>
                  </motion.a>
                )}
                {project.demo && !project.demo.includes('youtube') && (
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-glass"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt />
                    <span>Live Demo</span>
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Project Content */}
          <div className="project-content">
            {/* Overview */}
            {project.overview && (
              <motion.section className="project-section glass-card" variants={itemVariants}>
                <h2 className="gradient-text">Overview</h2>
                <div className="project-text" dangerouslySetInnerHTML={{ __html: project.overview.replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>') }} />
              </motion.section>
            )}

            {/* Demo Video */}
            {project.demo && project.demo.includes('youtube') && (
              <motion.section className="project-section glass-card" variants={itemVariants}>
                <h2 className="gradient-text">Demo</h2>
                <div className="project-video-wrapper">
                  <iframe
                    width="100%"
                    height="500"
                    src={project.demo}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`${project.title} Demo`}
                  />
                </div>
              </motion.section>
            )}

            {/* Related Videos */}
            {project.relatedVideos && project.relatedVideos.length > 0 && (
              <motion.section className="project-section glass-card" variants={itemVariants}>
                <h2 className="gradient-text">Videos</h2>
                <div className="project-videos-grid">
                  {project.relatedVideos.map((video, index) => (
                    <div key={index} className="project-video-item">
                      <div className="project-video-wrapper">
                        <iframe
                          width="100%"
                          height="315"
                          src={video.url}
                          frameBorder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={video.caption}
                        />
                      </div>
                      <p className="video-caption">{video.caption}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Methodology */}
            {project.methodology && (
              <motion.section className="project-section glass-card" variants={itemVariants}>
                <h2 className="gradient-text">Methodology</h2>
                <div className="project-text" dangerouslySetInnerHTML={{ __html: project.methodology.replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>') }} />
              </motion.section>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <motion.section className="project-section glass-card" variants={itemVariants}>
                <h2 className="gradient-text">Key Features</h2>
                <ul className="project-features-list">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* Technologies */}
            {project.technologies && (
              <motion.section className="project-section glass-card" variants={itemVariants}>
                <h2 className="gradient-text">Technologies</h2>
                <div className="technologies-grid">
                  {project.technologies.languages && (
                    <div className="tech-category">
                      <h3>Languages</h3>
                      <div className="tech-items">
                        {project.technologies.languages.map((tech, i) => (
                          <span key={i} className="tech-item">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.technologies.frameworks && (
                    <div className="tech-category">
                      <h3>Frameworks</h3>
                      <div className="tech-items">
                        {project.technologies.frameworks.map((tech, i) => (
                          <span key={i} className="tech-item">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.technologies.databases && (
                    <div className="tech-category">
                      <h3>Databases</h3>
                      <div className="tech-items">
                        {project.technologies.databases.map((tech, i) => (
                          <span key={i} className="tech-item">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.technologies.tools && (
                    <div className="tech-category">
                      <h3>Tools</h3>
                      <div className="tech-items">
                        {project.technologies.tools.map((tech, i) => (
                          <span key={i} className="tech-item">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.technologies.hardware && (
                    <div className="tech-category">
                      <h3>Hardware</h3>
                      <div className="tech-items">
                        {project.technologies.hardware.map((tech, i) => (
                          <span key={i} className="tech-item">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.technologies.algorithms && (
                    <div className="tech-category">
                      <h3>Algorithms</h3>
                      <div className="tech-items">
                        {project.technologies.algorithms.map((tech, i) => (
                          <span key={i} className="tech-item">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.section>
            )}

            {/* Screenshots/Images */}
            {project.images && project.images.length > 0 && (
              <motion.section className="project-section glass-card" variants={itemVariants}>
                <h2 className="gradient-text">Screenshots</h2>
                <div className="project-images-grid">
                  {project.images.map((image, index) => (
                    <div key={index} className="project-image-item">
                      <img src={image.path} alt={image.caption} />
                      {image.caption && <p className="image-caption">{image.caption}</p>}
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Challenges */}
            {project.challenges && (
              <motion.section className="project-section glass-card" variants={itemVariants}>
                <h2 className="gradient-text">Challenges & Solutions</h2>
                <p className="project-text">{project.challenges}</p>
              </motion.section>
            )}

            {/* Future Directions */}
            {project.futureDirections && (
              <motion.section className="project-section glass-card" variants={itemVariants}>
                <h2 className="gradient-text">Future Directions</h2>
                <p className="project-text">{project.futureDirections}</p>
              </motion.section>
            )}

            {/* Related Links */}
            {project.relatedLinks && project.relatedLinks.length > 0 && (
              <motion.section className="project-section glass-card" variants={itemVariants}>
                <h2 className="gradient-text">Related Links</h2>
                <div className="related-links">
                  {project.relatedLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="related-link"
                    >
                      {link.title} <FaExternalLinkAlt />
                    </a>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Installation */}
            {project.installation && (
              <motion.section className="project-section glass-card" variants={itemVariants}>
                <h2 className="gradient-text">Installation</h2>
                <pre className="installation-code"><code>{project.installation}</code></pre>
              </motion.section>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
