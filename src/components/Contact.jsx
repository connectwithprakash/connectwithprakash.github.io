import { Link } from 'react-router-dom';
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaMedium,
  FaYoutube,
  FaDiscord,
  FaCalendarAlt,
} from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const socialLinks = [
    {
      name: 'Email',
      icon: <FaEnvelope />,
      url: 'mailto:connectwithprakash@gmail.com',
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

  return (
    <section id="contact" className="contact">
      <div className="container">
        <footer className="footer">
          <p>
            &copy; {new Date().getFullYear()}{' '}
            <Link
              className="footer-name-link"
              to="/personal"
              aria-label="Open personal space"
            >
              Prakash Chaudhary
            </Link>
            . Built with React + Vite.
          </p>
          <div className="footer-utility-links">
            <div className="footer-connection-links" aria-label="Connection links">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="footer-connection-link"
                  aria-label={link.name}
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
