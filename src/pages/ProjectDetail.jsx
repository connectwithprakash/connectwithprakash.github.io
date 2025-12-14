import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import { getProjectById } from '../data/projectLoader';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MermaidDiagram from '../components/MermaidDiagram';
import './ProjectDetail.css';

const formatProjectDate = (startDate, endDate, status) => {
  if (!startDate) return null;

  const formatDate = (dateStr) => {
    // Handle YYYY-MM format (append day to make valid date)
    const normalizedDate = dateStr.length === 7 ? `${dateStr}-01` : dateStr;
    const date = new Date(normalizedDate);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : (status === 'in-progress' ? 'Present' : null);

  return end ? `${start} - ${end}` : start;
};

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
              <div className="project-badges">
                <div className="project-category-badge">{project.category}</div>
                {project.status && (
                  <div className={`project-status-badge status-${project.status}`}>
                    {project.status === 'in-progress' ? 'In Progress' : 'Completed'}
                  </div>
                )}
                {formatProjectDate(project.startDate, project.endDate, project.status) && (
                  <div className="project-date-badge">
                    {formatProjectDate(project.startDate, project.endDate, project.status)}
                  </div>
                )}
              </div>
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
            {/* Main Content from Markdown */}
            {project.content && (
              <motion.section className="project-section glass-card" variants={itemVariants}>
                <div className="project-markdown">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code: ({ node, inline, className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : '';

                        if (!inline && language === 'mermaid') {
                          return <MermaidDiagram chart={String(children).replace(/\n$/, '')} />;
                        }

                        return (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      }
                    }}
                  >
                    {project.content}
                  </ReactMarkdown>
                </div>
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
                    style={{ border: 0 }}
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
                          style={{ border: 0 }}
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
