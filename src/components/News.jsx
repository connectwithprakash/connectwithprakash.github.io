import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { FaTrophy, FaChalkboardTeacher, FaRocket, FaGraduationCap } from 'react-icons/fa';
import { newsItems } from '../data/newsData';
import './News.css';

const iconMap = {
  rocket: <FaRocket />,
  trophy: <FaTrophy />,
  teaching: <FaChalkboardTeacher />,
  graduation: <FaGraduationCap />,
};

const News = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="news" className="section news">
      <div className="container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Latest Updates</h2>
            <p className="section-subtitle">
              A few recent notes from my work and projects
            </p>
          </motion.div>

          <div className="news-timeline">
            <div className="timeline-line" />
            {newsItems.slice(0, 3).map((item, index) => (
              <motion.div
                key={index}
                className="news-item"
                variants={itemVariants}
                whileHover={{ x: 10 }}
              >
                <div className="news-card glass-card">
                  <div className="news-icon-wrapper">
                    <motion.div
                      className="news-icon"
                      style={{ color: item.color }}
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      {iconMap[item.icon]}
                    </motion.div>
                  </div>

                  <div className="news-content">
                    <div className="news-date">{item.date}</div>
                    <h3 className="news-title">{item.title}</h3>
                    <p className="news-description">{item.description}</p>
                  </div>

                  <div className="news-glow" style={{ background: item.color }} />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="news-cta" variants={itemVariants}>
            <Link to="/news">
              <motion.button
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Updates
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default News;
