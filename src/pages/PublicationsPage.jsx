import Publications from '../components/Publications';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';

const PublicationsPage = () => (
  <>
    <SEO
      title="Publications"
      description="Research publications in machine learning and sound source localization."
      keywords="machine learning publications, sound source localization, research"
      url="/publications"
    />
    <StructuredData
      breadcrumbs={[
        { name: 'Home', url: '/' },
        { name: 'Publications' },
      ]}
    />
    <Publications />
  </>
);

export default PublicationsPage;
