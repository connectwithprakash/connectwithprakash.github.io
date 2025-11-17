import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './Loader.css';

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let mounted = true;
    const checkpoints = {
      domReady: false,
      fontsLoaded: false,
      imagesLoaded: false,
      mounted: false,
    };

    const updateProgress = () => {
      const completed = Object.values(checkpoints).filter(Boolean).length;
      const total = Object.keys(checkpoints).length;
      const newProgress = (completed / total) * 100;

      if (mounted) {
        setProgress(newProgress);

        // Hide loader when all checkpoints are complete
        if (newProgress === 100) {
          setTimeout(() => {
            if (mounted) setIsLoading(false);
          }, 300); // Brief delay to show 100% completion
        }
      }
    };

    // Checkpoint 1: DOM ready (immediate)
    if (document.readyState === 'complete') {
      checkpoints.domReady = true;
      updateProgress();
    } else {
      window.addEventListener('load', () => {
        checkpoints.domReady = true;
        updateProgress();
      });
    }

    // Checkpoint 2: Fonts loaded
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        checkpoints.fontsLoaded = true;
        updateProgress();
      });
    } else {
      // Fallback if Fonts API not supported
      checkpoints.fontsLoaded = true;
      updateProgress();
    }

    // Checkpoint 3: Critical images loaded (favicon, hero images)
    const images = document.querySelectorAll('img[data-critical]');
    if (images.length === 0) {
      checkpoints.imagesLoaded = true;
      updateProgress();
    } else {
      let loadedImages = 0;
      images.forEach((img) => {
        if (img.complete) {
          loadedImages++;
        } else {
          img.addEventListener('load', () => {
            loadedImages++;
            if (loadedImages === images.length) {
              checkpoints.imagesLoaded = true;
              updateProgress();
            }
          });
          img.addEventListener('error', () => {
            loadedImages++;
            if (loadedImages === images.length) {
              checkpoints.imagesLoaded = true;
              updateProgress();
            }
          });
        }
      });
      if (loadedImages === images.length) {
        checkpoints.imagesLoaded = true;
        updateProgress();
      }
    }

    // Checkpoint 4: React mounted (slight delay to ensure hydration)
    setTimeout(() => {
      checkpoints.mounted = true;
      updateProgress();
    }, 100);

    // Safety timeout: force hide after 3 seconds max
    const safetyTimer = setTimeout(() => {
      if (mounted) setIsLoading(false);
    }, 3000);

    return () => {
      mounted = false;
      clearTimeout(safetyTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      className="loader-container"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loader-content">
        <motion.div
          className="loader-logo"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="gradient-text"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            PC
          </motion.h1>
        </motion.div>

        <motion.div className="loader-bar">
          <motion.div
            className="loader-progress"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </motion.div>

        <motion.p
          className="loader-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading Experience... {Math.round(progress)}%
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loader;
