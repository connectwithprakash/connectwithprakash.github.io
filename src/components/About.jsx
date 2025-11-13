import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBrain, FaRobot, FaChartLine, FaStar } from 'react-icons/fa';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    {
      icon: <FaBrain />,
      title: 'Machine Learning',
      description: 'Deep learning frameworks, neural networks, and production AI systems',
      gradient: 'var(--gradient-primary)',
    },
    {
      icon: <FaRobot />,
      title: 'Robotics',
      description: 'Autonomous systems, control algorithms, and embedded programming',
      gradient: 'var(--gradient-secondary)',
    },
    {
      icon: <FaChartLine />,
      title: 'Electronics',
      description: 'Circuit design, microcontrollers, and hardware-software integration',
      gradient: 'var(--gradient-tertiary)',
    },
    {
      icon: <FaStar />,
      title: 'Mathematics',
      description: 'Applied mathematics, optimization, and algorithmic problem solving',
      gradient: 'var(--gradient-quaternary)',
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
    <section id="about" className="section about">
      <div className="container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">About Me</h2>
            <p className="section-subtitle">
              Machine Learning Engineer building production AI systems
            </p>
          </motion.div>

          <div className="about-content">
            <motion.div className="about-text" variants={itemVariants}>
              <div className="glass-card about-card">
                <h3 className="gradient-text">
                  What I Do
                </h3>
                <p>
                  I build production AI systems focused on{' '}
                  <strong>Self-Supervised Learning</strong> and <strong>Multi-Agent Systems</strong>,
                  with over 5 years of experience delivering customized solutions.
                </p>
                <p>
                  Previously, I was a <strong>Graduate Research Assistant</strong> at{' '}
                  <strong>NASA-IMPACT</strong> (Interagency Implementation and Advanced Concepts Team)
                  while pursuing my <strong>MS in Computer Science</strong> at the University of Alabama
                  in Huntsville. My research focused on Machine Learning and Representation Learning.
                </p>
                <p>
                  I'm passionate about open source and education. My projects like{' '}
                  <strong>Norch</strong> (a PyTorch-like framework in NumPy) and{' '}
                  <strong>memory-optimized-agent</strong> (42% cost reduction) demonstrate my commitment
                  to making advanced ML concepts accessible and practical.
                </p>

                <div className="about-highlights">
                  <div className="highlight-item">
                    <span className="highlight-number gradient-text">55+</span>
                    <span className="highlight-label">GitHub Repositories</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-number gradient-text">27</span>
                    <span className="highlight-label">GitHub Stars</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-number gradient-text">38</span>
                    <span className="highlight-label">GitHub Followers</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="about-skills"
              variants={containerVariants}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="skill-card glass-card"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="skill-icon" style={{ background: skill.gradient }}>
                    {skill.icon}
                  </div>
                  <h4>{skill.title}</h4>
                  <p>{skill.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div className="education-section" variants={itemVariants}>
            <h3 className="subsection-title gradient-text">Career Journey</h3>
            <div className="timeline">
              <div className="timeline-item glass-card">
                <div className="timeline-date">Present</div>
                <h4>Machine Learning Engineer</h4>
                <p className="timeline-org">Fetch Rewards - Seattle, WA</p>
                <p className="timeline-desc">
                  Building production ML systems with focus on Self-Supervised Learning and Multi-Agent Systems. 5+ years of delivering customized AI solutions.
                </p>
              </div>

              <div className="timeline-item glass-card">
                <div className="timeline-date">2023</div>
                <h4>Graduate Research Assistant</h4>
                <p className="timeline-org">NASA-IMPACT, UAH</p>
                <p className="timeline-desc">
                  Research in Machine Learning and Representation Learning at NASA's Interagency Implementation and Advanced Concepts Team
                </p>
              </div>

              <div className="timeline-item glass-card">
                <div className="timeline-date">2023</div>
                <h4>MS in Computer Science</h4>
                <p className="timeline-org">University of Alabama in Huntsville</p>
                <p className="timeline-desc">
                  Advanced studies in Machine Learning, focusing on representation learning and AI systems
                </p>
              </div>

              <div className="timeline-item glass-card">
                <div className="timeline-date">2018</div>
                <h4>ABU Robocon 2018</h4>
                <p className="timeline-org">International Robotics Competition</p>
                <p className="timeline-desc">
                  Designed and built autonomous robots for ABU Robocon 2018 (Vietnam - Throwing Shuttlecock theme)
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
