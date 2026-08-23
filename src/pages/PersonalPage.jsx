import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';

import './PersonalPage.css';

const PersonalPage = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="personal-page">
      <SEO
        title="Personal"
        description="A personal space for reading, reflection, and ongoing inquiry."
        keywords="personal, books, reading, inquiry, reflection"
        url="/personal"
      />
      <StructuredData
        type="collection"
        collection={{
          title: 'Personal',
          description: 'A personal space for reading, reflection, and ongoing inquiry.',
          url: '/personal',
        }}
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Personal' }]}
      />

      <div className="container">
        <header className="personal-hero">
          <p className="personal-kicker">A quieter space</p>
          <h1 className="personal-title">Personal</h1>
          <p className="personal-subtitle">
            A place for the books I read and the questions I am still exploring.
          </p>
        </header>

        <section className="personal-grid" aria-label="Personal sections">
          <motion.div
            className="personal-card glass-card"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="personal-card-kicker">Reading record</p>
            <h2>Books</h2>
            <p>Finished books, current reading, and a lightweight record of when I read them.</p>
            <Link className="personal-card-link" to="/personal/books">Open Books →</Link>
          </motion.div>
          <motion.div
            className="personal-card glass-card"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06 }}
          >
            <p className="personal-card-kicker">Ongoing inquiry</p>
            <h2>Inquiry</h2>
            <p>Questions about ethics, self-knowledge, observation, meditation, and how to live.</p>
            <Link className="personal-card-link" to="/personal/inquiry">Open Inquiry →</Link>
          </motion.div>
        </section>
      </div>
    </main>
  );
};

export default PersonalPage;
