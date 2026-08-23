import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './HomeOverview.css';

const HomeOverview = () => (
  <section className="section home-overview" aria-labelledby="home-overview-title">
    <div className="container">
      <motion.div
        className="home-overview-card glass-card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <p className="home-overview-kicker">A little context</p>
          <h2 id="home-overview-title">What that work includes</h2>
          <p>
            I work across agent workflows, shared platform services, evaluation, observability,
            and feedback systems that help agents get built, deployed, and improved over time.
            My background includes machine learning, computer vision, multimodal systems, and robotics.
          </p>
        </div>
        <Link className="home-overview-link" to="/about">More about my work →</Link>
      </motion.div>
    </div>
  </section>
);

export default HomeOverview;
