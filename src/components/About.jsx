import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { FaBrain, FaRobot, FaRocket, FaEye, FaCog } from 'react-icons/fa';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [githubStats, setGithubStats] = useState({
    repos: 55,
    followers: 38,
  });

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        const userResponse = await fetch('https://api.github.com/users/connectwithprakash');
        const userData = await userResponse.json();

        setGithubStats({
          repos: userData.public_repos,
          followers: userData.followers,
        });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      }
    };

    fetchGithubStats();
  }, []);

  const skills = [
    {
      icon: <FaBrain />,
      title: 'LLM & Generative AI',
      description: 'Production LLM systems with RAG pipelines, fine-tuning (LoRA), prompt engineering, and embeddings. Building multimodal agents for real-world applications.',
      gradient: 'var(--gradient-primary)',
    },
    {
      icon: <FaRobot />,
      title: 'AI Agents & Automation',
      description: 'Multi-agent workflows using LangGraph, human-in-the-loop systems, LLM-as-a-Judge evaluation, and autonomous decision-making agents driving business impact.',
      gradient: 'var(--gradient-secondary)',
    },
    {
      icon: <FaRocket />,
      title: 'ML Engineering & MLOps',
      description: 'End-to-end ML pipelines from research to production. Model deployment on AWS (ECS/Fargate), monitoring, optimization, and scaling ML systems for millions of users.',
      gradient: 'var(--gradient-tertiary)',
    },
    {
      icon: <FaEye />,
      title: 'Computer Vision & NLP',
      description: 'Deep learning for vision tasks, NLP, hierarchical classification, and multimodal contrastive learning combining images and time-series data.',
      gradient: 'var(--gradient-quaternary)',
    },
    {
      icon: <FaCog />,
      title: 'Robotics & Autonomous Systems',
      description: 'Control systems, kinematics, and navigation algorithms for autonomous robots. Embedded programming with ARM microcontrollers and hardware-software integration.',
      gradient: 'var(--gradient-primary)',
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
                  <strong>LLMs</strong> and <strong>Multi-Agent Systems</strong>.
                  Recently shipped an <strong>AI Shopping Assistant</strong> serving a 200K-user experiment,
                  with over 5 years of experience delivering ML solutions that drive business impact.
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
                    <span className="highlight-number gradient-text">{githubStats.repos}</span>
                    <span className="highlight-label">GitHub Repositories</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-number gradient-text">{githubStats.followers}</span>
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
            <h3 className="subsection-title gradient-text">Work Experience</h3>
            <div className="timeline">
              <div className="timeline-item glass-card">
                <div className="timeline-date">2024 - Present</div>
                <h4>Machine Learning Engineer - AI Labs</h4>
                <p className="timeline-org">Fetch Rewards - Remote</p>
                <p className="timeline-desc">
                  Leading AI innovation, automation, and LLM enablement initiatives. Building production multi-agent systems and ML solutions driving measurable business impact.
                </p>
              </div>

              <div className="timeline-item glass-card">
                <div className="timeline-date">2022 - 2024</div>
                <h4>Graduate Research Assistant</h4>
                <p className="timeline-org">NASA-IMPACT</p>
                <p className="timeline-desc">
                  Research in Machine Learning and Natural Language Processing at NASA's Interagency Implementation and Advanced Concepts Team.
                </p>
              </div>

              <div className="timeline-item glass-card">
                <div className="timeline-date">2020 - 2022</div>
                <h4>Machine Learning Engineer</h4>
                <p className="timeline-org">Fusemachines Inc. - New York City, NY</p>
                <p className="timeline-desc">
                  Developed production ML systems for fashion retail, including sales forecasting, recommendation systems, and computer vision solutions.
                </p>
              </div>

              <div className="timeline-item glass-card">
                <div className="timeline-date">2019 - 2020</div>
                <h4>Machine Learning Engineer</h4>
                <p className="timeline-org">Betterhalf.ai - Bangalore, India</p>
                <p className="timeline-desc">
                  Built LSTM-based NLP models for automated user profile generation, improving sign-up efficiency by 40%. Developed NSFW detection system for content moderation.
                </p>
              </div>

              <div className="timeline-item glass-card">
                <div className="timeline-date">2016 - 2019</div>
                <h4>Robotics Team Member</h4>
                <p className="timeline-org">Robotics Club, Pulchowk Campus - Tribhuvan University</p>
                <p className="timeline-desc">
                  Mentored junior members and competed in ABU Robocon, Asia-Pacific's premier international robotics competition (12-14 countries). Won ROHM Award (2019 Mongolia) for innovative four-legged robot design and Best Shuttlecock Award (2018 Vietnam). Developed control algorithms including double differential drive system for stable high-speed movement, kinematics, and navigation using ARM microcontrollers.
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
