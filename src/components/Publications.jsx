import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaFileAlt, FaQuoteLeft } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';
import './Publications.css';

const Publications = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const publications = [
    {
      title: 'Advanced Machine Learning Techniques for Satellite Imagery Analysis',
      authors: 'Prakash Chaudhary, et al.',
      venue: 'IEEE Conference on Computer Vision and Pattern Recognition',
      year: '2024',
      type: 'Conference',
      citations: 42,
    },
    {
      title: 'Neural Networks for Time Series Forecasting in Climate Data',
      authors: 'Prakash Chaudhary, T. Mukherjee',
      venue: 'Journal of Machine Learning Research',
      year: '2024',
      type: 'Journal',
      citations: 28,
    },
    {
      title: 'Hybrid Recommendation Systems: A Comprehensive Survey',
      authors: 'Prakash Chaudhary, et al.',
      venue: 'ACM Computing Surveys',
      year: '2023',
      type: 'Journal',
      citations: 67,
    },
    {
      title: 'Real-time Object Detection for Autonomous Systems',
      authors: 'Prakash Chaudhary',
      venue: 'International Conference on Robotics and Automation',
      year: '2023',
      type: 'Conference',
      citations: 35,
    },
    {
      title: 'Transfer Learning in Medical Image Analysis',
      authors: 'Prakash Chaudhary, et al.',
      venue: 'Medical Image Analysis Journal',
      year: '2023',
      type: 'Journal',
      citations: 51,
    },
  ];

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
    <section id="publications" className="section publications">
      <div className="container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Publications</h2>
            <p className="section-subtitle">
              Contributing to the advancement of AI through research
            </p>
          </motion.div>

          <motion.div className="publications-stats" variants={itemVariants}>
            <div className="stat-card glass-card">
              <div className="stat-icon">
                <FaFileAlt />
              </div>
              <div className="stat-content">
                <div className="stat-number gradient-text">15+</div>
                <div className="stat-label">Publications</div>
              </div>
            </div>

            <div className="stat-card glass-card">
              <div className="stat-icon">
                <FaQuoteLeft />
              </div>
              <div className="stat-content">
                <div className="stat-number gradient-text">200+</div>
                <div className="stat-label">Citations</div>
              </div>
            </div>

            <div className="stat-card glass-card">
              <div className="stat-icon">
                <SiGooglescholar />
              </div>
              <div className="stat-content">
                <div className="stat-number gradient-text">12</div>
                <div className="stat-label">h-index</div>
              </div>
            </div>
          </motion.div>

          <div className="publications-list">
            {publications.map((pub, index) => (
              <motion.div
                key={index}
                className="publication-card glass-card"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className="publication-type">
                  <span className={pub.type.toLowerCase()}>{pub.type}</span>
                </div>

                <h3 className="publication-title">{pub.title}</h3>

                <div className="publication-meta">
                  <p className="publication-authors">{pub.authors}</p>
                  <p className="publication-venue">
                    {pub.venue} • {pub.year}
                  </p>
                </div>

                <div className="publication-footer">
                  <div className="publication-citations">
                    <FaQuoteLeft />
                    <span>{pub.citations} citations</span>
                  </div>

                  <div className="publication-links">
                    <motion.a
                      href={`https://scholar.google.com/scholar?q=${encodeURIComponent(pub.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pub-link-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Search
                    </motion.a>
                    <motion.a
                      href={`https://scholar.google.com/scholar?q=${encodeURIComponent(pub.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pub-link-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="publications-cta" variants={itemVariants}>
            <p>View my complete research profile</p>
            <motion.a
              href="https://scholar.google.com/citations?user=zYlOgbgAAAAJ"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SiGooglescholar />
              <span>Google Scholar</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Publications;
