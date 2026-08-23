import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaMedium,
  FaYoutube,
  FaDiscord,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://linkedin.com/in/connectwithprakash',
      username: 'in/connectwithprakash',
      color: '#0077b5',
    },
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: 'https://github.com/connectwithprakash',
      username: '@connectwithprakash',
      color: 'var(--text-primary)',
    },

    {
      name: 'Medium',
      icon: <FaMedium />,
      url: 'https://medium.com/@connectwithprakash',
      username: '@connectwithprakash',
      color: '#00ab6c',
    },
    {
      name: 'YouTube',
      icon: <FaYoutube />,
      url: 'https://www.youtube.com/@connectwithprakash',
      username: '@connectwithprakash',
      color: '#ff0000',
    },
    {
      name: 'Discord',
      icon: <FaDiscord />,
      url: 'https://discord.com/users/connectwithprakash',
      username: 'connectwithprakash',
      color: '#5865f2',
    },
    {
      name: 'Topmate',
      icon: <FaCalendarAlt />,
      url: 'https://topmate.io/connectwithprakash',
      username: 'Book a Call',
      color: '#6366f1',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="contact" className="section contact">
      <div className="container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Let's Connect</h2>
            <p className="section-subtitle">
              Where to find me and follow my work
            </p>
          </motion.div>

          <div className="contact-content">
            <motion.div className="contact-info" variants={itemVariants}>
              <div className="glass-card contact-card">
                <div className="contact-card-header">
                  <h3 className="gradient-text">Email me</h3>
                  <p>
                    I work on AI, robotics, and technical systems. Email is the best way to reach me.
                  </p>
                </div>

                <a className="primary-contact-link" href="mailto:connectwithprakash@gmail.com">
                  <FaEnvelope />
                  <span>connectwithprakash@gmail.com</span>
                </a>

                <div className="contact-details">
                  <div className="contact-detail-item">
                    <div className="detail-icon">
                      <FaMapMarkerAlt />
                    </div>
                    <div className="detail-content">
                      <h4>Location</h4>
                      <p>Fort Worth, TX</p>
                    </div>
                  </div>

                </div>

                <div className="availability-badge">
                  <span className="status-dot"></span>
                  <span>Open to Conversation</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="social-links-section" variants={itemVariants}>
              <h3 className="social-links-title">Find me online</h3>
              <div className="social-links-grid">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card glass-card"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="social-card-icon" style={{ color: link.color }}>
                    {link.icon}
                  </div>
                  <div className="social-card-content">
                    <h4>{link.name}</h4>
                    <p>{link.username}</p>
                  </div>
                  <div className="social-card-glow" style={{ background: link.color }} />
                </motion.a>
              ))}
              </div>
            </motion.div>
          </div>

          <motion.div className="footer" variants={itemVariants}>
            <p>
              &copy; {new Date().getFullYear()}{' '}
              <Link
                className="footer-name-link"
                to="/personal"
                aria-label="Open personal space"
              >
                Prakash Chaudhary
              </Link>
              . Built with React + Vite, with assistance from coding agents.
            </p>
            <div className="footer-links">
              <a href="#home">Back to Top ↑</a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
