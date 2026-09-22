import Hero from '../components/Hero';
import News from '../components/News';
import Projects from '../components/Projects';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';

const Home = () => {
  return (
    <>
      <SEO
        title={null}
        description="Senior Machine Learning Engineer and Tech Lead for Agentic Infrastructure, working on production agents, evaluation, and the systems around them."
        keywords="Senior Machine Learning Engineer, Tech Lead, Agentic Infrastructure, agentic systems, evaluation, MLOps, computer vision"
        url="/"
      />
      <StructuredData type="home" />
      <Hero />
      <Projects />
      <News />
    </>
  );
};

export default Home;
