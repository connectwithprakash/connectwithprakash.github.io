import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaAward, FaTrophy } from 'react-icons/fa';
import './Education.css';

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const education = [
    {
      date: '2022 - 2024',
      icon: <FaGraduationCap />,
      degree: 'Master of Science in Computer Science',
      institution: 'University of Alabama in Huntsville',
      location: 'Huntsville, AL',
      details: 'GPA: 4.0 | Thesis on Spectral Deconvolution using Machine Learning',
      achievements: [
        'Inducted into Phi Kappa Phi Honor Society (top 10% of graduates)',
        'Third Place in Graduate Poster Session (April 2024)',
        'Relevant Courses: Deep Learning, Survey AI, Algorithm, Big Data Computing',
      ],
      color: 'var(--neon-purple)',
    },
    {
      date: '2020 - 2021',
      icon: <FaAward />,
      degree: 'MicroMasters in Statistics and Data Science',
      institution: 'MITx on edX',
      location: 'Online',
      details: 'Grade: B | MIT Professional Certificate Program',
      achievements: [
        'Completed 4 graduate-level courses: Probability, Statistics, Machine Learning, Data Analysis',
        'Rigorous program equivalent to one semester of MIT\'s on-campus master\'s program',
      ],
      color: 'var(--neon-blue)',
    },
    {
      date: '2015 - 2020',
      icon: <FaTrophy />,
      degree: 'Bachelor of Engineering in Electronics and Communications',
      institution: 'Pulchowk Campus, Tribhuvan University',
      location: 'Lalitpur, Nepal',
      details: 'Senior Project: Sound Source Localization for Disaster Victim Search',
      achievements: [
        'Best Project Poster Award - Department of Electronics and Computer Engineering (2020)',
        'Published research at ISCRAM 2020 international conference',
        'Relevant Courses: AI, Digital Signal Processing, Data Structures & Algorithms, Microprocessor',
      ],
      color: 'var(--neon-green)',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="education" className="section education">
      <div className="container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Education</h2>
            <p className="section-subtitle">
              Academic journey from electronics engineering to machine learning
            </p>
          </motion.div>

          <div className="education-timeline">
            <div className="timeline-line" />
            {education.map((item, index) => (
              <motion.div
                key={index}
                className="education-item"
                variants={itemVariants}
                whileHover={{ x: 10 }}
              >
                <div className="education-card glass-card">
                  <div className="education-icon-wrapper">
                    <motion.div
                      className="education-icon"
                      style={{ color: item.color }}
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.icon}
                    </motion.div>
                  </div>

                  <div className="education-content">
                    <div className="education-date">{item.date}</div>
                    <h3 className="education-degree">{item.degree}</h3>
                    <p className="education-institution">{item.institution}</p>
                    <p className="education-location">{item.location}</p>
                    <p className="education-details">{item.details}</p>

                    {item.achievements && (
                      <ul className="education-achievements">
                        {item.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="education-glow" style={{ background: item.color }} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
