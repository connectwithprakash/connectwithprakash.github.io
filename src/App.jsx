import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import Particles from './components/Particles';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Resume = lazy(() => import('./pages/Resume'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PublicationsPage = lazy(() => import('./pages/PublicationsPage'));
const WritingResearchPage = lazy(() => import('./pages/WritingResearchPage'));
const QuestionPage = lazy(() => import('./pages/QuestionPage'));
const BooksPage = lazy(() => import('./pages/BooksPage'));
const PersonalPage = lazy(() => import('./pages/PersonalPage'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <BrowserRouter>
        <ScrollToTop />
        <div className="app">
          <Particles />
          <Navigation />
          <Suspense fallback={<div className="route-loading" role="status" aria-live="polite">Loading…</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/publications" element={<PublicationsPage />} />
              <Route path="/writing" element={<WritingResearchPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/personal" element={<PersonalPage />} />
              <Route path="/personal/inquiry" element={<QuestionPage />} />
              <Route path="/personal/books" element={<BooksPage />} />
              <Route path="/inquiry" element={<Navigate to="/personal/inquiry" replace />} />
              <Route path="/question" element={<Navigate to="/personal/inquiry" replace />} />
              <Route path="/books" element={<Navigate to="/personal/books" replace />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
            </Routes>
          </Suspense>
        </div>
        </BrowserRouter>
      </ThemeProvider>
    </MotionConfig>
  );
}

export default App;
