import { motion } from 'framer-motion';
import { FaTrophy, FaChalkboardTeacher, FaRocket, FaGraduationCap } from 'react-icons/fa';
import { newsItems } from '../data/newsData';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import './NewsPage.css';

const iconMap = {
  rocket: <FaRocket />,
  trophy: <FaTrophy />,
  teaching: <FaChalkboardTeacher />,
  graduation: <FaGraduationCap />,
};

const NewsPage = () => {
  return (
    <div className="news-page">
      <SEO
        title="News"
        description="Career timeline - achievements, milestones, and highlights from my journey in AI and Machine Learning."
        keywords="Career News, Achievements, ML Engineer Journey, AI Milestones"
        url="/news"
      />
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'News' },
        ]}
      />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="news-page-header">
            <h1 className="news-page-title">All News</h1>
            <p className="news-page-subtitle">
              My complete journey - achievements, milestones, and career highlights
            </p>
          </div>

          <div className="news-timeline">
            <div className="timeline-line" />
            {newsItems.map((item, index) => (
              <motion.div
                key={index}
                className="news-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
        </motion.div>
      </div>
    </div>
  );
};

export default NewsPage;
