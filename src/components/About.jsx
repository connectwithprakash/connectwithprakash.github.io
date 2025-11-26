import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBrain, FaRobot, FaRocket, FaEye } from 'react-icons/fa';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
                <div className="timeline-date">2024 - Present</div>
                <h4>Machine Learning Engineer - AI Labs</h4>
                <p className="timeline-org">Fetch Rewards - Seattle, WA</p>
                <p className="timeline-desc">
                  Leading AI innovation, automation, and LLM enablement initiatives. Building production multi-agent systems and ML solutions driving measurable business impact.
                </p>
              </div>

              <div className="timeline-item glass-card">
                <div className="timeline-date">2022 - 2024</div>
                <h4>MS in Computer Science</h4>
                <p className="timeline-org">University of Alabama in Huntsville</p>
                <p className="timeline-desc">
                  Graduated with 4.0 GPA. Advanced studies in Deep Learning, AI, and Algorithm Design. Inducted into Phi Kappa Phi Honor Society.
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
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
