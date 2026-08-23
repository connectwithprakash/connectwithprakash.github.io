import { motion } from 'framer-motion';

import { FaFileAlt, FaQuoteLeft } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';
import WritingResearchTabs from './WritingResearchTabs';
import './Publications.css';

const Publications = () => {
  const publications = [
    {
      title: 'Search disaster victims using sound source localization',
      authors: 'A Khanal, D Chand, P Chaudhary, S Timilsina, SP Panday, A Shakya, et al.',
      venue: 'ISCRAM 2020 Conference Proceedings · pp. 1022–1030',
      year: '2020',
      type: 'Conference Paper',
      citations: 8,
      url: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=zYlOgbgAAAAJ&citation_for_view=zYlOgbgAAAAJ:u5HHmVD_uO8C',
      secondaryUrl: 'https://arxiv.org/abs/2103.06049',
    },
    {
      title: 'Spectral deconvolution using machine learning for determining material compositions in mixed samples',
      authors: 'Prakash Chaudhary',
      venue: 'Master\'s thesis, University of Alabama in Huntsville',
      year: '2024',
      type: 'Thesis',
      url: 'https://louis.uah.edu/uah-theses/676',
      secondaryUrl: 'https://louis.uah.edu/cgi/viewcontent.cgi?article=1679&context=uah-theses',
    },
  ];
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
        <div>
          <WritingResearchTabs active="research" />
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Research</h2>
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
                <div className="stat-number gradient-text">2</div>
                <div className="stat-label">Research works</div>
              </div>
            </div>

            <div className="stat-card glass-card">
              <div className="stat-icon">
                <FaQuoteLeft />
              </div>
              <div className="stat-content">
                <div className="stat-number gradient-text">8</div>
                <div className="stat-label">Citations</div>
              </div>
            </div>

            <div className="stat-card glass-card">
              <div className="stat-icon">
                <SiGooglescholar />
              </div>
              <div className="stat-content">
                <div className="stat-number gradient-text">1</div>
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
                    {pub.citations ? (
                      <>
                        <FaQuoteLeft />
                        <span>{pub.citations} citations</span>
                      </>
                    ) : (
                      <span>{pub.type === 'Thesis' ? 'UAH thesis' : pub.venue}</span>
                    )}
                  </div>

                  <div className="publication-links">
                    <motion.a
                      href={pub.url || `https://scholar.google.com/scholar?q=${encodeURIComponent(pub.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pub-link-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View
                    </motion.a>
                    <motion.a
                      href={pub.secondaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pub-link-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {pub.type === 'Thesis' ? 'PDF' : 'arXiv'}
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
        </div>
      </div>
    </section>
  );
};

export default Publications;
