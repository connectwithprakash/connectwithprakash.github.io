import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import './WritingResearchPage.css';

const WritingResearchPage = () => (
  <main className="writing-research-page">
    <SEO
      title="Writing & Research"
      description="Technical writing, research papers, and a master's thesis on machine learning and AI systems."
      keywords="technical writing, machine learning research, AI papers, master's thesis"
      url="/writing"
    />
    <StructuredData
      type="collection"
      collection={{
        title: 'Writing & Research',
        description: 'Technical writing, research papers, and a master\'s thesis on machine learning and AI systems.',
        url: '/writing',
      }}
      breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Writing & Research' }]}
    />

    <div className="container">
      <header className="writing-research-header">
        <p className="writing-research-kicker">Writing &amp; Research</p>
        <h1>Ideas in practice</h1>
        <p>
          Technical writing and research from machine learning systems to the questions that shape
          how I build and understand them.
        </p>
      </header>

      <section className="writing-research-grid" aria-label="Writing and research areas">
        <article className="writing-research-card glass-card">
          <p className="writing-research-card-kicker">Technical writing</p>
          <h2>Blog</h2>
          <p>
            Notes on machine learning, LLMs, agentic systems, developer tooling, and production work.
          </p>
          <Link className="writing-research-link" to="/blog">Open Blog →</Link>
        </article>
        <article className="writing-research-card glass-card">
          <p className="writing-research-card-kicker">Academic work</p>
          <h2>Research</h2>
          <p>
            A conference paper on sound-source localization and a 2024 UAH master&apos;s thesis on
            spectral deconvolution using machine learning.
          </p>
          <Link className="writing-research-link" to="/publications">Open Research →</Link>
        </article>
      </section>
    </div>
  </main>
);

export default WritingResearchPage;
