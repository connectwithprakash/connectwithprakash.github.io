import { Link } from 'react-router-dom';
import './PersonalTabs.css';

const tabs = [
  { id: 'overview', label: 'Overview', to: '/personal' },
  { id: 'books', label: 'Books', to: '/personal/books' },
  { id: 'inquiry', label: 'Inquiry', to: '/personal/inquiry' },
];

const PersonalTabs = ({ active }) => (
  <nav className="personal-tabs" aria-label="Personal space navigation">
    <div className="personal-tab-list">
      {tabs.map(tab => (
        <Link
          key={tab.id}
          className={`personal-tab ${active === tab.id ? 'active' : ''}`}
          to={tab.to}
          aria-current={active === tab.id ? 'page' : undefined}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  </nav>
);

export default PersonalTabs;
