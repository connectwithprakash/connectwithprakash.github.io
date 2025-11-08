import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaTrophy, FaChalkboardTeacher, FaRocket, FaGraduationCap } from 'react-icons/fa';
import './News.css';

const News = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const newsItems = [
    {
      date: 'April 2024',
      icon: <FaTrophy />,
      title: 'Third Place in Graduate Poster Session',
      description: 'Won third place in the competitive Graduate Poster Session, showcasing innovative research in machine learning applications.',
      color: 'var(--neon-yellow)',
    },
    {
      date: 'September 2023',
      icon: <FaChalkboardTeacher />,
      title: 'Teaching Assistant - AI Fellowship',
      description: 'Appointed as Teaching Assistant for the AI Fellowship program in Latin America, mentoring the next generation of AI engineers.',
      color: 'var(--neon-purple)',
    },
    {
      date: 'August 2023',
      icon: <FaRocket />,
      title: 'Joined NASA-IMPACT Lab',
      description: 'Started position as Graduate Research Assistant at NASA\'s Interagency Implementation and Advanced Concepts Team.',
      color: 'var(--neon-blue)',
    },
    {
      date: 'January 2023',
      icon: <FaGraduationCap />,
      title: 'Computer Vision Lecturer',
      description: 'Delivered comprehensive Computer Vision course curriculum for Fusemachines AI Fellowship program.',
      color: 'var(--neon-green)',
    },
  ];

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
            <h2 className="section-title">Latest News</h2>
            <p className="section-subtitle">
              Recent achievements and milestones in my journey
            </p>
          </motion.div>

          <div className="news-timeline">
            <div className="timeline-line" />
            {newsItems.map((item, index) => (
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
                      {item.icon}
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
    </section>
  );
};

export default News;
