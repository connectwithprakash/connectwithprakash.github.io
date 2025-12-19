/**
 * SEO Component using React 19's native document metadata support
 *
 * React 19 automatically hoists <title>, <meta>, and <link> tags to <head>
 */

const SITE_URL = 'https://connectwithprakash.com';
const DEFAULT_IMAGE = `${SITE_URL}/assets/og-image.png`;
const SITE_NAME = 'Prakash Chaudhary';
const TWITTER_HANDLE = '@connectwprakash';

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

  return (
    <>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Article-specific tags (for blog posts) */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          {article.author && <meta property="article:author" content={article.author} />}
        </>
      )}
    </>
  );
};

export default SEO;
