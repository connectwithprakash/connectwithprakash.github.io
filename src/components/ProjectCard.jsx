import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import './Projects.css';

const getStatusOrDate = (project) => {
  if (project.status === 'in-progress') {
    return { text: 'In Progress', type: 'in-progress' };
  }
  if (project.endDate) {
    // Handle YYYY-MM format - use T12:00:00 to avoid timezone shifting
    const dateStr = project.endDate.length === 7 ? `${project.endDate}-01` : project.endDate;
    const date = new Date(`${dateStr}T12:00:00`);
    return { text: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), type: 'date' };
  }
  if (project.status === 'released' && project.startDate) {
    // For released projects, show the release date - use T12:00:00 to avoid timezone shifting
    const dateStr = project.startDate.length === 7 ? `${project.startDate}-01` : project.startDate;
    const date = new Date(`${dateStr}T12:00:00`);
    return { text: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), type: 'date' };
  }
  if (project.status === 'completed') {
    return { text: 'Completed', type: 'completed' };
  }
  return null;
};

const ProjectCard = ({ project }) => {
  const status = getStatusOrDate(project);
  return (
    <Link to={`/project/${project.id}`} className="project-card-link">
      <div className="project-card-header">
        <div className="project-card-badges">
          {status && (
            <div className={`project-card-status status-${status.type}`}>
              {status.text}
            </div>
          )}
          {project.featured && (
            <div className="featured-badge">
              Featured
            </div>
          )}
        </div>
        <h3 className="project-title">{project.title}</h3>
      </div>

      {project.thumbnail && (
        <div className="project-thumbnail">
          <img src={project.thumbnail} alt="" loading="lazy" />
        </div>
      )}
      {!project.thumbnail && (
        <div className="project-gradient" style={{ background: project.gradient }} />
      )}

      <div className="project-content">
        <p className="project-description">{project.shortDescription}</p>
        <div className="project-tags">
          {project.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="project-tag">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="project-tag">+{project.tags.length - 3}</span>
          )}
        </div>

        <div className="project-links">
          <span
            className="project-link-btn primary"
          >
            <span>Read project</span>
            <FaArrowRight />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
