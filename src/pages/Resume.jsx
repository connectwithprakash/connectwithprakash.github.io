import { Children, createElement, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { FaDownload, FaPrint } from 'react-icons/fa';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import './Resume.css';

const modes = {
  resume: {
    label: 'Resume',
    subtitle: 'Targeted 2-page resume for job applications',
    file: '/resume.md',
    pdf: '/resume.pdf',
    downloadName: 'Prakash_Chaudhary_Resume.pdf',
    title: 'Resume',
  },
  cv: {
    label: 'Full CV',
    subtitle: 'Comprehensive CV with all projects and experience',
    file: '/cv.md',
    pdf: '/cv.pdf',
    downloadName: 'Prakash_Chaudhary_CV.pdf',
    title: 'Curriculum Vitae',
  },
};

const MONTH = '(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)';
const YEAR = `(?:${MONTH} )?\\d{4}`;
const DATE_RANGE = `${YEAR}(?: - (?:${YEAR}|Present))?`;
const datedEntryPattern = new RegExp(`^(.*?)\\s*\\|\\s*(${DATE_RANGE})$`);

const DateAlignedEntry = ({ children, as: Element, className }) => {
  const childNodes = Children.toArray(children);
  const text = childNodes.map(child => (typeof child === 'string' ? child : '')).join('');
  const match = text.match(datedEntryPattern);

  if (!match) return createElement(Element, { className }, children);

  const [title, date] = match.slice(1);
  const titleNodes = childNodes.length === 1
    ? title
    : [...childNodes.slice(0, -1), title];

  return createElement(
    Element,
    { className: 'resume-entry-row' },
    <>
      <span className="resume-entry-title">{titleNodes}</span>
      <span className="resume-entry-date">{date}</span>
    </>,
  );
};

const Resume = () => {
  const [activeMode, setActiveMode] = useState('resume');
  const [content, setContent] = useState({ resume: '', cv: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/resume.md').then((res) => res.text()),
      fetch('/cv.md').then((res) => res.text()),
    ])
      .then(([resumeText, cvText]) => {
        setContent({ resume: resumeText, cv: cvText });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading documents:', error);
        setLoading(false);
      });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const current = modes[activeMode];

  return (
    <div className="resume-page">
      <SEO
        title={current.title}
        description="ML Engineer with expertise in Agentic AI, MLOps, and Computer Vision. View my professional experience, skills, and education."
        keywords="Resume, ML Engineer, Machine Learning, AI Engineer, CV, Professional Experience"
        url="/resume"
      />
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: current.title },
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
            <span className="gradient-text">{current.title}</span>
          </h1>

          <div className="resume-toggle">
            {Object.entries(modes).map(([key, mode]) => (
              <button
                key={key}
                className={`resume-toggle-btn ${activeMode === key ? 'active' : ''}`}
                onClick={() => setActiveMode(key)}
              >
                {mode.label}
              </button>
            ))}
          </div>
          <p className="resume-subtitle">{current.subtitle}</p>

          <div className="resume-actions">
            <motion.a
              key={current.pdf}
              href={current.pdf}
              download={current.downloadName}
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
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="resume-content glass-card"
            >
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{
                  h3: ({ children, className }) => (
                    <DateAlignedEntry as="h3" className={className}>{children}</DateAlignedEntry>
                  ),
                  p: ({ children, className }) => (
                    <DateAlignedEntry as="p" className={className}>{children}</DateAlignedEntry>
                  ),
                }}
              >
                {content[activeMode]}
              </ReactMarkdown>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Resume;
