import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaMedium, FaYoutube } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/connectwithprakash', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/connectwithprakash', label: 'LinkedIn' },

    { icon: <FaMedium />, url: 'https://medium.com/@connectwithprakash', label: 'Medium' },
    { icon: <FaYoutube />, url: 'https://www.youtube.com/@connectwithprakash', label: 'YouTube' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="gradient-orb orb-2"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="gradient-orb orb-3"
          animate={{
            x: [0, 50, 0],
            y: [0, -100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="hero-title" variants={itemVariants}>
            <span className="gradient-text">Senior Machine Learning Engineer</span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            I work on agentic systems and the infrastructure around them.
          </motion.p>

          <motion.p className="hero-description" variants={itemVariants}>
            I’m interested in the layers that help agents get built, connected, evaluated, deployed,
            and improved over time.
          </motion.p>

          <motion.div className="hero-socials" variants={itemVariants}>
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
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          variants={floatingVariants}
          initial="initial"
          animate="animate"
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
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="scroll-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
