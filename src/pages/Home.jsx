import Hero from '../components/Hero';
import HomeOverview from '../components/HomeOverview';
import News from '../components/News';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';

const Home = () => {
  return (
    <>
      <SEO
        title={null}
        description="Senior Machine Learning Engineer working on agentic systems, evaluation, and the infrastructure around them."
        keywords="Senior Machine Learning Engineer, agentic systems, evaluation, MLOps, computer vision"
        url="/"
      />
      <StructuredData type="home" />
      <Hero />
      <HomeOverview />
      <Projects />
      <News />
      <Contact />
    </>
  );
};

export default Home;
