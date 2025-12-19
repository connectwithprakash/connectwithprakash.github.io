import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { FaDownload, FaPrint } from 'react-icons/fa';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import './Resume.css';

const Resume = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/resume.md')
      .then((res) => res.text())
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading resume:', error);
        setLoading(false);
      });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-page">
      <SEO
        title="Resume"
        description="ML Engineer with expertise in Agentic AI, MLOps, and Computer Vision. View my professional experience, skills, and education."
        keywords="Resume, ML Engineer, Machine Learning, AI Engineer, CV, Professional Experience"
        url="/resume"
      />
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Resume' },
        ]}
      />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="resume-header"
        >
          <h1 className="resume-title">
            <span className="gradient-text">Resume</span>
          </h1>
          <div className="resume-actions">
            <motion.a
              href="/resume.pdf"
              download="Prakash_Chaudhary_Resume.pdf"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload />
              <span>Download PDF</span>
            </motion.a>
            <motion.button
              onClick={handlePrint}
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPrint />
              <span>Print</span>
            </motion.button>
          </div>
        </motion.div>

        {loading ? (
          <div className="resume-loading">
            <div className="loader-spinner"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="resume-content glass-card"
          >
            <ReactMarkdown>{content}</ReactMarkdown>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Resume;
