import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaMedium, FaYoutube } from 'react-icons/fa';
import useDecorativeMotion from '../hooks/useDecorativeMotion';
import './Hero.css';

const Hero = () => {
  const decorativeMotion = useDecorativeMotion();
  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/connectwithprakash', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/connectwithprakash', label: 'LinkedIn' },

    { icon: <FaMedium />, url: 'https://medium.com/@connectwithprakash', label: 'Medium' },
    { icon: <FaYoutube />, url: 'https://www.youtube.com/@connectwithprakash', label: 'YouTube' },
  ];

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, 12, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <motion.div
          className="gradient-orb orb-1"
          animate={decorativeMotion ? {
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          } : undefined}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="gradient-orb orb-2"
          animate={decorativeMotion ? {
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.3, 1],
          } : undefined}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="gradient-orb orb-3"
          animate={decorativeMotion ? {
            x: [0, 50, 0],
            y: [0, -100, 0],
            scale: [1, 1.1, 1],
          } : undefined}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container">
        <div className="hero-content">
          <p className="hero-eyebrow">Prakash Chaudhary</p>
          <h1 className="hero-title">
            <span className="gradient-text">Senior Machine Learning Engineer</span>
          </h1>

          <p className="hero-role">
            Tech Lead, Agentic Infrastructure
          </p>

          <p className="hero-subtitle">
            I work on agentic systems and the infrastructure around them.
          </p>

          <p className="hero-description">
            I’m interested in the layers that help agents get built, connected, evaluated, deployed,
            and improved over time.
          </p>

          <div className="hero-cta">
            <Link to="/projects" className="btn btn-primary">Explore my work →</Link>
            <Link to="/about" className="btn btn-glass">About me</Link>
          </div>

          <div className="hero-socials">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div
          className="hero-visual"
          variants={floatingVariants}
          initial={decorativeMotion ? 'initial' : false}
          animate={decorativeMotion ? 'animate' : undefined}
        >
          <div className="visual-card glass-card">
            <div className="code-snippet">
              <div className="code-line">
                <span className="code-keyword">const</span>{' '}
                <span className="code-variable">focus</span> ={' '}
                <span className="code-string">"Agentic Infrastructure"</span>;
              </div>
              <div className="code-line">
                <span className="code-keyword">const</span>{' '}
                <span className="code-variable">mission</span> ={' '}
                <span className="code-string">"Build, evaluate, improve"</span>;
              </div>
              <div className="code-line">
                <span className="code-keyword">while</span> (
                <span className="code-variable">systemsEvolve</span>) {'{'}
              </div>
              <div className="code-line code-indent">
                <span className="code-function">evaluate</span>();
              </div>
              <div className="code-line code-indent">
                <span className="code-function">build</span>();
              </div>
              <div className="code-line code-indent">
                <span className="code-function">improve</span>();
              </div>
              <div className="code-line">{'}'}</div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={decorativeMotion ? { opacity: 0, y: -10 } : false}
        animate={decorativeMotion ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="scroll-arrow"
          animate={decorativeMotion ? { y: [0, 10, 0] } : undefined}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
