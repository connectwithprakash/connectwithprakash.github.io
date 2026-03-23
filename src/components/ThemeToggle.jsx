import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="theme-toggle-switch"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.div
        className="toggle-track"
        animate={{
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="toggle-thumb"
          animate={{
            x: isDark ? 0 : 28,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <motion.div
            className="toggle-icon"
            animate={{
              rotate: isDark ? 0 : 360,
              scale: 1,
            }}
            transition={{ duration: 0.5 }}
          >
            {isDark ? (
              <FaMoon className="moon-icon" />
            ) : (
              <FaSun className="sun-icon" />
            )}
          </motion.div>
        </motion.div>

        <div className="toggle-icons-bg">
          <FaMoon className="moon-bg" />
          <FaSun className="sun-bg" />
        </div>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
