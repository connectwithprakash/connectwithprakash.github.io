import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { FaCalendar, FaTag, FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';
import { blogPosts } from '../data/blogPosts';
import { getMediumPosts } from '../services/mediumService';
import './Blog.css';

const Blog = () => {
  const [allPosts, setAllPosts] = useState(blogPosts);
  const [loading, setLoading] = useState(true);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Fetch Medium posts and merge with local posts
  useEffect(() => {
    const loadMediumPosts = async () => {
      try {
        const mediumPosts = await getMediumPosts();
        const mergedPosts = [...blogPosts, ...mediumPosts];
        setAllPosts(mergedPosts);
      } catch (error) {
        console.error('Error loading Medium posts:', error);
        // Keep only local posts if Medium fetch fails
        setAllPosts(blogPosts);
      } finally {
        setLoading(false);
      }
    };

    loadMediumPosts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // Sort posts by date (newest first)
  const sortedPosts = [...allPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="blog-page">
      <section className="blog-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="blog-hero-content"
          >
            <h1 className="blog-hero-title">
              <span className="gradient-text">Bodhi</span>
            </h1>
            <p className="blog-hero-subtitle">
              A space for my personal thoughts, ideas, and introspections
            </p>
            <p className="blog-hero-description">
              Exploring life, consciousness, and the journey of self-discovery through words.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="blog-list-section section">
        <div className="container">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="blog-posts-grid"
          >
            {sortedPosts.map((post, index) => {
              const isMediumPost = post.source === 'medium';
              const linkProps = isMediumPost
                ? { as: 'a', href: post.url, target: '_blank', rel: 'noopener noreferrer' }
                : { to: `/blog/${post.id}` };

              return (
                <motion.article
                  key={post.id}
                  className="blog-card glass-card"
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                >
                  <div className="blog-card-header">
                    <div className="blog-card-meta">
                      <span className="blog-card-date">
                        <FaCalendar />
                        {formatDate(post.date)}
                      </span>
                      <span className="blog-card-category">{post.category}</span>
                    </div>
                    {isMediumPost && (
                      <span className="blog-source-badge medium">
                        Medium
                        <FaExternalLinkAlt />
                      </span>
                    )}
                  </div>

                  <h2 className="blog-card-title">
                    {isMediumPost ? (
                      <a href={post.url} target="_blank" rel="noopener noreferrer">
                        {post.title}
                      </a>
                    ) : (
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    )}
                  </h2>

                  <p className="blog-card-description">{post.description}</p>

                  <div className="blog-card-tags">
                    {post.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="blog-tag">
                        <FaTag />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {isMediumPost ? (
                    <a href={post.url} target="_blank" rel="noopener noreferrer" className="blog-card-link">
                      Read on Medium
                      <FaExternalLinkAlt />
                    </a>
                  ) : (
                    <Link to={`/blog/${post.id}`} className="blog-card-link">
                      Read More
                      <FaArrowRight />
                    </Link>
                  )}
                </motion.article>
              );
            })}
          </motion.div>

          {sortedPosts.length === 0 && (
            <motion.div
              className="no-posts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p>No blog posts yet. Stay tuned!</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
