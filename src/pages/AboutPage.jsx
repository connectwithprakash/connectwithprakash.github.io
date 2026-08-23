import About from '../components/About';
import Education from '../components/Education';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';

const AboutPage = () => (
  <>
    <SEO
      title="About"
      description="Background, experience, and education in machine learning, agentic systems, computer vision, and robotics."
      keywords="Machine Learning Engineer, agentic systems, computer vision, robotics, experience, education"
      url="/about"
    />
    <StructuredData
      breadcrumbs={[
        { name: 'Home', url: '/' },
        { name: 'About' },
      ]}
    />
    <About />
    <Education />
  </>
);

export default AboutPage;
