import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import './Navigation.css';

const MotionLink = motion(Link);

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'news', 'projects', 'publications', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id) => {
    if (!isHomePage) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'news', label: 'News' },
    { id: 'projects', label: 'Projects' },
    { id: 'publications', label: 'Publications' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      className={`navigation ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <MotionLink
          to="/"
          aria-label="Go to homepage"
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="gradient-text">Prakash</span>
        </MotionLink>

        <ul className="nav-menu">
          {navItems.map((item, index) => (
            <motion.li
              key={item.id}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                className={`nav-link ${activeSection === item.id && isHomePage ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
                {activeSection === item.id && isHomePage && (
                  <motion.div
                    className="active-indicator"
                    layoutId="activeIndicator"
                  />
                )}
              </button>
            </motion.li>
          ))}
          <motion.li
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: navItems.length * 0.1 }}
          >
            <Link
              to="/blog"
              className={`nav-link ${location.pathname.startsWith('/blog') ? 'active' : ''}`}
            >
              Blog
              {location.pathname.startsWith('/blog') && (
                <motion.div
                  className="active-indicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          </motion.li>
          <motion.li
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (navItems.length + 1) * 0.1 }}
          >
            <Link
              to="/resume"
              className={`nav-link ${location.pathname === '/resume' ? 'active' : ''}`}
            >
              Resume
              {location.pathname === '/resume' && (
                <motion.div
                  className="active-indicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          </motion.li>

        </ul>

        <ThemeToggle />

        <motion.a
          href="#contact"
          className="btn btn-primary nav-cta"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('contact');
          }}
        >
          Get in Touch
        </motion.a>

        <motion.button
          className="mobile-menu-toggle"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="mobile-menu-list">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    className={`mobile-nav-link ${activeSection === item.id && isHomePage ? 'active' : ''}`}
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
              >
                <Link
                  to="/blog"
                  className={`mobile-nav-link ${location.pathname.startsWith('/blog') ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
              </motion.li>
              <motion.li
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navItems.length + 1) * 0.05 }}
              >
                <Link
                  to="/resume"
                  className={`mobile-nav-link ${location.pathname === '/resume' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Resume
                </Link>
              </motion.li>

              <motion.li
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navItems.length + 4) * 0.05 }}
                style={{ padding: '0.75rem 1rem 1rem' }}
              >
                <button
                  className="btn btn-primary mobile-cta"
                  onClick={() => scrollToSection('contact')}
                  style={{ width: '100%' }}
                >
                  Get in Touch
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
