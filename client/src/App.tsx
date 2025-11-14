import { Navbar } from './components/Navigation/Navbar';
import { Hero } from './components/Hero/Hero';
import { AboutSection } from './components/About/AboutSection';
import { DomainSection } from './components/Domains/DomainSection';
import { ContactSection } from './components/Contact/ContactSection';
import { Footer } from './components/Footer/Footer';
import { ScrollToTop } from './components/shared/ScrollToTop';

function App() {
  return (
    <div className="relative min-h-screen bg-background-primary">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <AboutSection />
        <DomainSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
