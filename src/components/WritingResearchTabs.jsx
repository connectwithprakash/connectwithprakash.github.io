import { Link } from 'react-router-dom';
import './WritingResearchTabs.css';

const WritingResearchTabs = ({ active }) => (
  <nav className="writing-research-tabs" aria-label="Writing and research navigation">
    <Link className={active === 'blog' ? 'active' : ''} to="/blog">
      Blog
    </Link>
    <Link className={active === 'research' ? 'active' : ''} to="/publications">
      Research
    </Link>
  </nav>
);

export default WritingResearchTabs;
