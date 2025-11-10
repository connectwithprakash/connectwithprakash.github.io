const MEDIUM_USERNAME = 'connectwithprakash';
const MEDIUM_RSS_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`;
// Using RSS2JSON service which is more reliable
const RSS_TO_JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url=';

/**
 * Fetches and parses Medium RSS feed via RSS2JSON API
 * @returns {Promise<Array>} Array of Medium posts
 */
export async function fetchMediumPosts() {
  try {
    const response = await fetch(`${RSS_TO_JSON_API}${encodeURIComponent(MEDIUM_RSS_URL)}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch Medium RSS: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error('RSS feed fetch failed');
    }

    const items = data.items || [];

    return items.map((item) => {
      // Extract ID from link
      const urlParts = item.link.split('/');
      const id = urlParts[urlParts.length - 1].split('?')[0];

      // Parse date
      const date = new Date(item.pubDate).toISOString().split('T')[0];

      // Extract categories/tags
      const tags = item.categories || [];

      return {
        id: `medium-${id}`,
        title: item.title,
        date: date,
        description: extractDescription(item.description || item.content),
        tags: tags,
        category: 'technical',
        source: 'medium',
        url: item.link,
        content: item.content,
      };
    });
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return []; // Return empty array on error to not break the site
  }
}

/**
 * Fallback: Return hardcoded Medium posts if API fails
 * @returns {Array} Array of Medium posts
 */
export function getStaticMediumPosts() {
  return [
    {
      id: 'medium-d9d9ee650f4b',
      title: 'Cropping image with desired aspect ratio using window method',
      date: '2020-02-01',
      description: 'Here I am going to explain the windowing method of getting a cropped image with desired aspect ratio.',
      tags: ['deep-learning', 'cropping', 'algorithms'],
      category: 'technical',
      source: 'medium',
      url: 'https://medium.com/@connectwithprakash/cropping-image-with-desired-aspect-ratio-using-window-method-d9d9ee650f4b',
    },
    {
      id: 'medium-5100a8b3d45d',
      title: 'Information extraction from email — Part I: Setting up selenium on python',
      date: '2019-12-18',
      description: 'Setting up selenium on python to extract information from emails.',
      tags: ['selenium', 'python', 'email'],
      category: 'technical',
      source: 'medium',
      url: 'https://medium.com/@connectwithprakash/information-extraction-from-email-part-i-setting-up-selenium-on-python-5100a8b3d45d',
    },
    {
      id: 'medium-dfef92bb0a63',
      title: 'How to test hand engineered filter for convolution',
      date: '2019-10-18',
      description: 'Hand engineered filters and testing custom filters to extract features for applications.',
      tags: ['neural-networks', 'computer-vision', 'machine-learning'],
      category: 'technical',
      source: 'medium',
      url: 'https://medium.com/@connectwithprakash/how-to-test-hand-engineered-filter-for-convolution-dfef92bb0a63',
    },
  ];
}

/**
 * Get Medium posts - tries API first, falls back to static if it fails
 * @returns {Promise<Array>} Array of Medium posts
 */
export async function getMediumPosts() {
  const apiPosts = await fetchMediumPosts();
  return apiPosts.length > 0 ? apiPosts : getStaticMediumPosts();
}

/**
 * Extracts plain text description from HTML content
 * @param {string} html - HTML content from RSS
 * @returns {string} Plain text description (first 150 chars)
 */
function extractDescription(html) {
  if (!html) return '';

  // Remove HTML tags
  const text = html.replace(/<[^>]*>/g, ' ')
                   .replace(/&nbsp;/g, ' ')
                   .replace(/&amp;/g, '&')
                   .replace(/&lt;/g, '<')
                   .replace(/&gt;/g, '>')
                   .replace(/\s+/g, ' ')
                   .trim();

  // Return first 150 characters
  return text.length > 150 ? text.substring(0, 150) + '...' : text;
}
