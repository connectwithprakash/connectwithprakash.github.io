import Hero from '../components/Hero';
import About from '../components/About';
import Education from '../components/Education';
import News from '../components/News';
import Projects from '../components/Projects';
import Publications from '../components/Publications';
import Contact from '../components/Contact';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <>
      <SEO
        title={null}
        description="ML Engineer specializing in Agentic AI, MLOps, and Computer Vision. Building intelligent systems that solve real-world problems."
        keywords="ML Engineer, Machine Learning, AI, Agentic AI, MLOps, Computer Vision, Deep Learning"
        url="/"
      />
      <Hero />
      <About />
      <Education />
      <News />
      <Projects />
      <Publications />
      <Contact />
    </>
  );
};

export default Home;
