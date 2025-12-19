import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Giscus from '@giscus/react';

// Lazy load MermaidDiagram to avoid loading mermaid library upfront
const MermaidDiagram = lazy(() => import('../components/MermaidDiagram'));
import {
  FaArrowLeft,
  FaCalendar,
  FaTag,
  FaHeart,
  FaRegHeart,
  FaShare,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaLink,
} from 'react-icons/fa';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.id === id);
    if (foundPost) {
      setPost(foundPost);

      // Load likes from localStorage
      const storedLikes = localStorage.getItem(`blog-likes-${id}`);
      const storedLiked = localStorage.getItem(`blog-liked-${id}`);

      if (storedLikes) setLikes(parseInt(storedLikes));
      if (storedLiked === 'true') setLiked(true);
    }
  }, [id]);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      const newLikes = Math.max(0, likes - 1);
      setLikes(newLikes);
      localStorage.setItem(`blog-likes-${id}`, newLikes.toString());
      localStorage.setItem(`blog-liked-${id}`, 'false');
    } else {
      setLiked(true);
      const newLikes = likes + 1;
      setLikes(newLikes);
      localStorage.setItem(`blog-likes-${id}`, newLikes.toString());
      localStorage.setItem(`blog-liked-${id}`, 'true');
    }
  };

  const shareUrl = `${window.location.origin}/blog/${id}`;
  const shareTitle = post?.title || '';

  const handleShare = async (platform) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    };

    if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    } else if (platform === 'native') {
      if (navigator.share) {
        try {
          await navigator.share({
            title: shareTitle,
            text: post?.description,
            url: shareUrl,
          });
        } catch (err) {
          console.error('Error sharing:', err);
        }
      }
    } else {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }

    setShowShareMenu(false);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (!post) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="post-not-found">
            <h2>Post not found</h2>
            <Link to="/blog" className="btn btn-primary">
              <FaArrowLeft /> Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <SEO
        title={post.title}
        description={post.description}
        keywords={post.tags?.join(', ')}
        url={`/blog/${post.id}`}
        type="article"
        article={{
          publishedTime: post.date,
          author: 'Prakash Chaudhary',
        }}
      />
      <StructuredData
        type="article"
        article={{
          title: post.title,
          description: post.description,
          url: `/blog/${post.id}`,
          datePublished: post.date,
          dateModified: post.dateModified || post.date,
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title },
        ]}
      />
      <div className="container">
        <motion.article
          className="blog-post"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/blog" className="back-link">
            <FaArrowLeft /> Back to Blog
          </Link>

          <header className="post-header">
            <div className="post-meta">
              <span className="post-date">
                <FaCalendar />
                {formatDate(post.date)}
              </span>
              <span className="post-category">{post.category}</span>
            </div>

            <h1 className="post-title gradient-text">{post.title}</h1>
            <p className="post-description">{post.description}</p>

            <div className="post-tags">
              {post.tags.map((tag, i) => (
                <span key={i} className="post-tag">
                  <FaTag />
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="post-actions">
            <motion.button
              className={`action-btn like-btn ${liked ? 'liked' : ''}`}
              onClick={handleLike}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
            >
              {liked ? <FaHeart /> : <FaRegHeart />}
              <span>{likes > 0 ? likes : 'Like'}</span>
            </motion.button>

            <div className="share-container">
              <motion.button
                className="action-btn share-btn"
                onClick={() => setShowShareMenu(!showShareMenu)}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
              >
                <FaShare />
                <span>Share</span>
              </motion.button>

              {showShareMenu && (
                <motion.div
                  className="share-menu glass-card"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <button onClick={() => handleShare('twitter')}>
                    <FaTwitter /> Twitter
                  </button>
                  <button onClick={() => handleShare('linkedin')}>
                    <FaLinkedin /> LinkedIn
                  </button>
                  <button onClick={() => handleShare('facebook')}>
                    <FaFacebook /> Facebook
                  </button>
                  <button onClick={() => handleShare('copy')}>
                    <FaLink /> {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                  {navigator.share && (
                    <button onClick={() => handleShare('native')}>
                      <FaShare /> Share...
                    </button>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          <div className="post-content glass-card">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code: ({ node, inline, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  const language = match ? match[1] : '';

                  if (!inline && language === 'mermaid') {
                    return (
                      <Suspense fallback={<div className="mermaid-loading">Loading diagram...</div>}>
                        <MermaidDiagram chart={String(children).replace(/\n$/, '')} />
                      </Suspense>
                    );
                  }

                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <div className="post-footer">
            <div className="post-nav">
              <Link to="/blog" className="btn btn-glass">
                <FaArrowLeft /> All Posts
              </Link>
            </div>
          </div>

          <div className="post-comments">
            <h3 className="comments-title">Comments</h3>
            <Giscus
              repo="connectwithprakash/connectwithprakash.github.io"
              repoId="R_kgDOQrguQQ"
              category="Announcements"
              categoryId="DIC_kwDOQrguQc4Cz_4u"
              mapping="pathname"
              strict="0"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="bottom"
              theme="preferred_color_scheme"
              lang="en"
              loading="lazy"
            />
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogPost;
