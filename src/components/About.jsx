import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { FaBrain, FaRobot, FaRocket, FaEye, FaCog } from 'react-icons/fa';
import './About.css';

const TimelineDetails = ({
  itemKey,
  date,
  org,
  title,
  roleDate,
  isMobile,
  open,
  onToggle,
  children,
}) => (
  <details
    className="timeline-item glass-card"
    open={!isMobile || open}
    onToggle={(event) => onToggle(itemKey, event.currentTarget.open)}
  >
    <summary className="timeline-summary">
      <div className="timeline-date">{date}</div>
      {org && <p className="timeline-org">{org}</p>}
      {title && <h4>{title}</h4>}
      {roleDate && <span className="timeline-role-date">{roleDate}</span>}
      <span className="timeline-summary-toggle" aria-hidden="true">⌄</span>
    </summary>
    <div className="timeline-item-body">{children}</div>
  </details>
);

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [githubStats, setGithubStats] = useState({
    repos: 55,
    followers: 38,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [expandedTimelineItems, setExpandedTimelineItems] = useState({ fetch: true });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  const handleTimelineToggle = (itemKey, open) => {
    setExpandedTimelineItems(previous => ({ ...previous, [itemKey]: open }));
  };

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
              Senior Machine Learning Engineer building production AI systems
            </p>
          </motion.div>

          <div className="about-content">
            <motion.div className="about-text" variants={itemVariants}>
              <div className="glass-card about-card">
                <h3 className="gradient-text">
                  What I Do
                </h3>
                <p>
                  I'm a <strong>Senior Machine Learning Engineer</strong> at Fetch, where I work on
                  production AI systems built on <strong>LLMs</strong> and{' '}
                  <strong>multi-agent architectures</strong>. I shipped an{' '}
                  <strong>AI Shopping Assistant</strong> to a 200K-user experiment and worked on a
                  multi-agent matching framework that <strong>unlocked $165M in GMV</strong> with
                  LLM-as-a-Judge guardrails at 97% accuracy.
                </p>
                <p>
                  Over the past several years I've worked across{' '}
                  <strong>computer vision</strong>, <strong>multimodal and contrastive learning</strong>,
                  and <strong>NLP</strong> before specializing in agentic systems. These days I'm drawn
                  to the hard, unglamorous parts: evaluation loops that gate deploys, context that stays
                  within a token budget, and coordination protocols for agents that outlive a session -
                  work that shows up in the open as <strong>Agent Relay</strong> and{' '}
                  <strong>Lazyflow</strong>.
                </p>
                <p>
                  My path started in hardware, building autonomous robots for the{' '}
                  <strong>ABU Robocon</strong> international competition, then representation-learning
                  research at <strong>NASA-IMPACT</strong> during my{' '}
                  <strong>MS in Computer Science</strong>. Most of what I learn still ends up as an
                  open-source tool.
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
              <TimelineDetails
                itemKey="fetch"
                date="May 2024 - Present"
                org="Fetch - Remote (AI Labs)"
                isMobile={isMobile}
                open={expandedTimelineItems.fetch}
                onToggle={handleTimelineToggle}
              >
                <div className="timeline-roles">
                  <div className="timeline-role">
                    <h4>Senior Machine Learning Engineer</h4>
                    <span className="timeline-role-date">Jul 2026 - Present</span>
                    <p className="timeline-desc">
                      Working on Fetch's AI Shopping Assistant, a self-improving agentic system, with a focus on evaluation systems and supporting architecture.
                    </p>
                  </div>
                  <div className="timeline-role">
                    <h4>Machine Learning Engineer II</h4>
                    <span className="timeline-role-date">Jan 2026 - Jun 2026</span>
                    <p className="timeline-desc">
                      Built and shipped the AI Shopping Assistant to a 200K-user experiment, plus an end-to-end LLM evaluation system with CI/CD deploy gating that blocks releases on quality regression.
                    </p>
                  </div>
                  <div className="timeline-role">
                    <h4>Machine Learning Engineer</h4>
                    <span className="timeline-role-date">May 2024 - Dec 2025</span>
                    <p className="timeline-desc">
                      Led the Multi-Agent Matching Framework, improving match rates by 3.1-3.3 points and unlocking $165M in GMV with LLM-as-a-Judge guardrails at 97% accuracy.
                    </p>
                  </div>
                </div>
              </TimelineDetails>

              <TimelineDetails
                itemKey="nasa"
                date="2022 - 2024"
                title="Graduate Research Assistant"
                org="NASA-IMPACT"
                isMobile={isMobile}
                open={expandedTimelineItems.nasa}
                onToggle={handleTimelineToggle}
              >
                <p className="timeline-desc">
                  Research in Machine Learning and Natural Language Processing at NASA's Interagency Implementation and Advanced Concepts Team.
                </p>
              </TimelineDetails>

              <TimelineDetails
                itemKey="fusemachines"
                date="Feb 2020 - Mar 2024"
                org="Fusemachines Nepal - Kathmandu, Nepal"
                isMobile={isMobile}
                open={expandedTimelineItems.fusemachines}
                onToggle={handleTimelineToggle}
              >
                <div className="timeline-roles">
                  <div className="timeline-role">
                    <h4>Machine Learning Engineer Level III</h4>
                    <span className="timeline-role-date">Jan 2022 - May 2022</span>
                    <p className="timeline-desc">
                      Explored and quantified product cannibalization effects for retail fashion, delivering actionable insights for merchandising strategies.
                    </p>
                  </div>
                  <div className="timeline-role">
                    <h4>Machine Learning Engineer Level I</h4>
                    <span className="timeline-role-date">Jan 2021 - Dec 2021</span>
                    <p className="timeline-desc">
                      Led efforts to build an ensemble model classifying fashion products into Kate Spade's four customer segments using computer vision and SciPy optimization, achieving 62% accuracy.
                    </p>
                  </div>
                  <div className="timeline-role">
                    <h4>Machine Learning Engineer Associate</h4>
                    <span className="timeline-role-date">Feb 2020 - Dec 2020</span>
                    <p className="timeline-desc">
                      Developed an in-house recommendation system using a Factorization Machine model, AWS EC2, and Lambda, achieving ranking metrics comparable to AWS's recommendation engine.
                    </p>
                  </div>
                  <div className="timeline-role">
                    <h4>Lecturer &amp; Teaching Assistant</h4>
                    <span className="timeline-role-date">Mar 2022 - Mar 2024</span>
                    <p className="timeline-desc">
                      Taught data science, computer vision, machine learning, deep learning, and MLOps through Fusemachines AI Fellowship programs.
                    </p>
                  </div>
                </div>
              </TimelineDetails>

              <TimelineDetails
                itemKey="betterhalf"
                date="2019 - 2020"
                title="Machine Learning Engineer"
                org="Betterhalf.ai - Bangalore, India"
                isMobile={isMobile}
                open={expandedTimelineItems.betterhalf}
                onToggle={handleTimelineToggle}
              >
                <p className="timeline-desc">
                  Built LSTM-based NLP models for automated user profile generation, improving sign-up efficiency by 40%. Developed NSFW detection system for content moderation.
                </p>
              </TimelineDetails>

              <TimelineDetails
                itemKey="robotics"
                date="2016 - 2019"
                title="Robotics Team Member"
                org="Robotics Club, Pulchowk Campus - Tribhuvan University"
                isMobile={isMobile}
                open={expandedTimelineItems.robotics}
                onToggle={handleTimelineToggle}
              >
                <p className="timeline-desc">
                  Mentored junior members and competed in ABU Robocon, Asia-Pacific's premier international robotics competition (12-14 countries). Won ROHM Award (2019 Mongolia) for innovative four-legged robot design and Best Shuttlecock Award (2018 Vietnam). Developed control algorithms including double differential drive system for stable high-speed movement, kinematics, and navigation using ARM microcontrollers.
                </p>
              </TimelineDetails>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
