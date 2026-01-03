/**
 * SEO Component for managing page metadata
 *
 * Uses useEffect to ensure document.title is replaced (not duplicated)
 * and manages meta tags dynamically for each page.
 */

import { useEffect } from 'react';

const SITE_URL = 'https://connectwithprakash.com';
const DEFAULT_IMAGE = `${SITE_URL}/assets/og-image.png`;
const SITE_NAME = 'Prakash Chaudhary';
const TWITTER_HANDLE = '@connectwprakash';

/**
 * Helper to update or create a meta tag
 */
const updateMetaTag = (attribute, value, content) => {
  let element = document.querySelector(`meta[${attribute}="${value}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

/**
 * Helper to update or create a link tag
 */
const updateLinkTag = (rel, href) => {
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

const SEO = ({
  title,
  description,
  keywords,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  article = null, // For blog posts: { publishedTime, author }
}) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonicalUrl = url ? `${SITE_URL}${url}` : SITE_URL;

  useEffect(() => {
    // Update document title (replaces, doesn't duplicate)
    document.title = fullTitle;

    // Primary Meta Tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'title', fullTitle);
    if (keywords) {
      updateMetaTag('name', 'keywords', keywords);
    }

    // Canonical URL
    updateLinkTag('canonical', canonicalUrl);

    // Open Graph / Facebook
    updateMetaTag('property', 'og:type', type);
    updateMetaTag('property', 'og:url', canonicalUrl);
    updateMetaTag('property', 'og:title', fullTitle);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', image);
    updateMetaTag('property', 'og:site_name', SITE_NAME);

    // Twitter Card
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:site', TWITTER_HANDLE);
    updateMetaTag('name', 'twitter:title', fullTitle);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', image);

    // Article-specific tags (for blog posts)
    if (article) {
      updateMetaTag('property', 'article:published_time', article.publishedTime);
      if (article.author) {
        updateMetaTag('property', 'article:author', article.author);
      }
    }
  }, [fullTitle, description, keywords, canonicalUrl, type, image, article]);

  // Return null - all updates happen via useEffect
  return null;
};

export default SEO;
