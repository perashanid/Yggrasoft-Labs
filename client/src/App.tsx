import { lazy, Suspense } from 'react';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { PageLoader } from './components/shared/LoadingSpinner';
import { usePageView } from './hooks/useAnalytics';
import { Navbar } from './components/Navigation/Navbar';
import { Hero } from './components/Hero/Hero';
import { ScrollToTop } from './components/shared/ScrollToTop';
import { TreeBackgroundWithRoots } from './components/shared/TreeBackgroundWithRoots';

// Lazy load components for better performance
const AboutSection = lazy(() => import('./components/About/AboutSection').then(m => ({ default: m.AboutSection })));
const DomainSection = lazy(() => import('./components/Domains/DomainSection').then(m => ({ default: m.DomainSection })));
const ProjectSection = lazy(() => import('./components/Projects/ProjectSection').then(m => ({ default: m.ProjectSection })));
const ReviewSection = lazy(() => import('./components/Reviews/ReviewSection').then(m => ({ default: m.ReviewSection })));
const BlogSection = lazy(() => import('./components/Blog/BlogSection').then(m => ({ default: m.BlogSection })));
const ContactSection = lazy(() => import('./components/Contact/ContactSection').then(m => ({ default: m.ContactSection })));
const Footer = lazy(() => import('./components/Footer/Footer').then(m => ({ default: m.Footer })));

function App() {
  usePageView('home');

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-background-primary">
        <Navbar />
        
        {/* Hero section with galaxy background (has its own background) */}
        <Hero />
        
        {/* Tree background starts after Hero and extends through Footer */}
        <TreeBackgroundWithRoots imagePath="/yggdrasil-tree.png" />
        
        <div className="relative">
          <main className="relative z-10">
            <Suspense fallback={<PageLoader />}>
              <AboutSection />
              <DomainSection />
              <ProjectSection />
              <ReviewSection />
              <BlogSection />
              <ContactSection />
            </Suspense>
          </main>
          
          <Suspense fallback={<div className="h-20" />}>
            <Footer />
          </Suspense>
        </div>
        
        <ScrollToTop />
      </div>
    </ErrorBoundary>
  );
}

export default App;
