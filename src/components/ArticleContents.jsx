import { useEffect, useState } from 'react';

const ArticleContents = ({ contentRef }) => {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    setHeadings([...contentRef.current.querySelectorAll('h2, h3')].map(heading => ({
      id: heading.id,
      label: heading.textContent,
      level: heading.tagName,
    })));
  }, [contentRef]);

  if (headings.filter(heading => heading.level === 'H2').length < 3) return null;

  return (
    <nav className="article-contents" aria-label="On this page">
      <details open>
        <summary>On this page</summary>
        <ul>
          {headings.map(heading => (
            <li key={heading.id} className={heading.level === 'H3' ? 'contents-subheading' : undefined}>
              <a href={`#${heading.id}`} onClick={() => {
                document.getElementById(heading.id)?.focus({ preventScroll: true });
              }}>{heading.label}</a>
            </li>
          ))}
        </ul>
      </details>
    </nav>
  );
};

export default ArticleContents;
