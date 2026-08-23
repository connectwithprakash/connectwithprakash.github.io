import Publications from '../components/Publications';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import WritingResearchTabs from '../components/WritingResearchTabs';

const PublicationsPage = () => (
  <>
    <SEO
      title="Research"
      description="Research papers and a master's thesis in machine learning, sound source localization, and spectral deconvolution."
      keywords="machine learning research, sound source localization, spectral deconvolution, thesis"
      url="/publications"
    />
    <StructuredData
      breadcrumbs={[
        { name: 'Home', url: '/' },
        { name: 'Writing & Research', url: '/writing' },
        { name: 'Research' },
      ]}
    />
    <div className="research-page-tabs">
      <WritingResearchTabs active="research" />
    </div>
    <Publications />
  </>
);

export default PublicationsPage;
