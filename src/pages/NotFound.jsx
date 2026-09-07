import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFound = () => (
  <main className="not-found container">
    <SEO title="Page not found" description="This page could not be found." noIndex />
    <p className="hero-eyebrow">404</p>
    <h1>That page isn’t here.</h1>
    <p>The link may have changed. Explore the projects or head back home.</p>
    <div className="hero-cta">
      <Link to="/" className="btn btn-primary">Back home</Link>
      <Link to="/projects" className="btn btn-glass">Explore projects</Link>
    </div>
  </main>
);

export default NotFound;
