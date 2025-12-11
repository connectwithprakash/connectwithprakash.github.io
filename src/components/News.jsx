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
      date: 'December 2025',
      icon: <FaRocket />,
      title: 'Launched AI Shopping Assistant Alpha',
      description: 'Shipped multimodal AI Shopping Assistant to 10,000 external users (iOS/Android), enabling natural language product discovery and purchase optimization through production multi-agent system.',
      color: 'var(--neon-green)',
    },
    {
      date: 'October 2024',
      icon: <FaRocket />,
      title: 'Launched Multi-Agent Product Matching System',
      description: 'Deployed async matching framework with LLM-as-a-Judge achieving 15% full automation, improving match rates by 3.1-3.3 percentage points and unlocking $165M in GMV.',
      color: 'var(--neon-purple)',
    },
    {
      date: 'August 2024',
      icon: <FaRocket />,
      title: 'Joined Fetch Rewards AI Labs',
      description: 'Became part of AI Labs tiger team, leading AI innovation, automation, and LLM enablement initiatives across the organization.',
      color: 'var(--neon-blue)',
    },
    {
      date: 'May 2024',
      icon: <FaRocket />,
      title: 'Joined Fetch Rewards',
      description: 'Started as Machine Learning Engineer in Seattle, WA, building production AI systems and multi-agent workflows.',
      color: 'var(--neon-purple)',
    },
    {
      date: 'May 2024',
      icon: <FaGraduationCap />,
      title: 'Graduated with MS in Computer Science',
      description: 'Graduated from University of Alabama in Huntsville with perfect 4.0 GPA and inducted into Phi Kappa Phi Honor Society.',
      color: 'var(--neon-green)',
    },
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
      description: 'Appointed as Teaching Assistant for the AI Fellowship program in Latin America, mentoring 50+ students in Data Science.',
      color: 'var(--neon-purple)',
    },
    {
      date: 'August 2022',
      icon: <FaRocket />,
      title: 'Joined NASA-IMPACT Lab',
      description: 'Started position as Graduate Research Assistant at NASA\'s Interagency Implementation and Advanced Concepts Team.',
      color: 'var(--neon-blue)',
    },
    {
      date: 'February 2020',
      icon: <FaRocket />,
      title: 'Joined Fusemachines as ML Engineer',
      description: 'Started as Machine Learning Engineer in New York City, developing production ML systems for fashion retail, including sales forecasting, recommendation systems, and computer vision solutions.',
      color: 'var(--neon-purple)',
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
