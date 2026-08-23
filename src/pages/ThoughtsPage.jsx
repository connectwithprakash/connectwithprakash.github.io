import { FaCalendar, FaTag, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import { blogPosts } from '../data/blogPosts';
import './Blog.css';

const thoughts = blogPosts
  .filter(post => post.category === 'personal')
  .sort((first, second) => new Date(second.date) - new Date(first.date));

const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const ThoughtsPage = () => (
  <main className="blog-page">
    <SEO
      title="Thoughts"
      description="Personal essays and reflections on self-knowledge, motivation, and perspective."
      keywords="personal essays, reflections, self-knowledge, motivation, perspective"
      url="/personal/thoughts"
    />
    <StructuredData
      type="collection"
      collection={{
        title: 'Thoughts',
        description: 'Personal essays and reflections on self-knowledge, motivation, and perspective.',
        url: '/personal/thoughts',
      }}
      breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Personal', url: '/personal' }, { name: 'Thoughts' }]}
    />

    <section className="blog-hero">
      <div className="container">
        <div className="blog-hero-content">
          <h1 className="blog-hero-title">
            <span className="gradient-text">Thoughts</span>
          </h1>
          <p className="blog-hero-subtitle">Personal reflections and unfinished ideas</p>
        </div>
      </div>
    </section>

    <section className="blog-list-section section">
      <div className="container">
        <div className="blog-posts-grid">
          {thoughts.map((post) => (
            <article key={post.id} className="blog-card glass-card">
              <div className="blog-card-header">
                <div className="blog-card-meta">
                  <span className="blog-card-date">
                    <FaCalendar />
                    {formatDate(post.date)}
                  </span>
                  <span className="blog-card-category">Reflection</span>
                </div>
              </div>
              <h2 className="blog-card-title">
                <Link to={`/personal/thoughts/${post.id}`}>{post.title}</Link>
              </h2>
              <p className="blog-card-description">{post.description}</p>
              <div className="blog-card-tags">
                {post.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="blog-tag">
                    <FaTag />
                    {tag}
                  </span>
                ))}
              </div>
              <Link to={`/personal/thoughts/${post.id}`} className="blog-card-link">
                Read More
                <FaArrowRight />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default ThoughtsPage;
