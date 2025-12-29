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
import { SiGooglescholar } from 'react-icons/si';
import './Contact.css';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const socialLinks = [
    {
      name: 'Email',
      icon: <FaEnvelope />,
      url: 'mailto:connectwithprakash@gmail.com',
      username: 'connectwithprakash@gmail.com',
      color: 'var(--neon-blue)',
    },
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
      name: 'Google Scholar',
      icon: <SiGooglescholar />,
      url: 'https://scholar.google.com/citations?user=zYlOgbgAAAAJ',
      username: 'View Publications',
      color: '#4285f4',
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
              Always open to discussing new opportunities and collaborations
            </p>
          </motion.div>

          <div className="contact-content">
            <motion.div className="contact-info" variants={itemVariants}>
              <div className="glass-card contact-card">
                <div className="contact-card-header">
                  <h3 className="gradient-text">Get In Touch</h3>
                  <p>
                    Machine Learning Engineer at Fetch Rewards. Always excited to discuss
                    AI, robotics, and innovative tech projects. Let's connect!
                  </p>
                </div>

                <div className="contact-details">
                  <div className="contact-detail-item">
                    <div className="detail-icon">
                      <FaMapMarkerAlt />
                    </div>
                    <div className="detail-content">
                      <h4>Location</h4>
                      <p>San Francisco, CA</p>
                    </div>
                  </div>

                  <div className="contact-detail-item">
                    <div className="detail-icon">
                      <FaEnvelope />
                    </div>
                    <div className="detail-content">
                      <h4>Email</h4>
                      <a href="mailto:connectwithprakash@gmail.com">connectwithprakash@gmail.com</a>
                    </div>
                  </div>
                </div>

                <div className="availability-badge">
                  <span className="status-dot"></span>
                  <span>Open to Collaboration</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="social-links-grid"
              variants={containerVariants}
            >
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
            </motion.div>
          </div>

          <motion.div className="footer" variants={itemVariants}>
            <p>&copy; {new Date().getFullYear()} Prakash Chaudhary. Built with React + Vite and Claude Code.</p>
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
