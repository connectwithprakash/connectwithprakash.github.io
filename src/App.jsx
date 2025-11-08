import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import News from './components/News';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Contact from './components/Contact';
import Particles from './components/Particles';
import Loader from './components/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      {isLoading && <Loader />}
      <Particles />
      <Navigation />
      <Hero />
      <About />
      <News />
      <Projects />
      <Publications />
      <Contact />
    </div>
  );
}

export default App;
