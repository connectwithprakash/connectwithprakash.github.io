import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import './Navigation.css';

const MotionLink = motion(Link);

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuToggleRef = useRef(null);
  const firstMobileNavRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const menuToggle = mobileMenuToggleRef.current;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const focusFirstItem = () => firstMobileNavRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = [...document.querySelectorAll('#mobile-navigation a, #mobile-navigation button')];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    requestAnimationFrame(focusFirstItem);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      menuToggle?.focus();
    };
  }, [mobileMenuOpen]);

  const scrollToContact = () => {
    navigate({ pathname: '/', hash: '#contact' });
    setMobileMenuOpen(false);
  };

  const isActiveRoute = (to) => (
    to === '/writing'
      ? location.pathname === '/writing'
        || location.pathname.startsWith('/blog')
        || location.pathname.startsWith('/publications')
      : location.pathname === to
  );

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'News', to: '/news' },
    { label: 'Projects', to: '/projects' },
    { label: 'Writing & Research', to: '/writing' },
    { label: 'Resume', to: '/resume' },
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
              key={item.to}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link className={`nav-link ${isActiveRoute(item.to) ? 'active' : ''}`} to={item.to}>
                {item.label}
                {isActiveRoute(item.to) && <motion.div className="active-indicator" layoutId="activeIndicator" />}
              </Link>
            </motion.li>
          ))}
        </ul>

        <ThemeToggle />

        <motion.a
          href="#contact"
          className="btn btn-primary nav-cta"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(event) => {
            event.preventDefault();
            scrollToContact();
          }}
        >
          Get in Touch
        </motion.a>

        <motion.button
          ref={mobileMenuToggleRef}
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
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="mobile-menu-list">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.to}
                  initial={false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    ref={index === 0 ? firstMobileNavRef : undefined}
                    className={`mobile-nav-link ${isActiveRoute(item.to) ? 'active' : ''}`}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                className="mobile-menu-cta-item"
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navItems.length + 1) * 0.05 }}
              >
                <button className="btn btn-primary mobile-cta" onClick={scrollToContact} style={{ width: '100%' }}>
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
