import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Timeline from './components/Timeline';
import Wizard from './components/Wizard';
import Quiz from './components/Quiz';
import FAQ from './components/FAQ';
import States from './components/States';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';

function AppContent() {
  return (
    <div className="min-h-screen">
      {/* Accessibility skip link */}
      <a
        href="#main-content"
        className="skip-link"
        tabIndex={0}
      >
        Skip to main content
      </a>

      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Stats />
        <Timeline />
        <Wizard />
        <Quiz />
        <FAQ />
        <States />
        <AIAssistant />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to top button */}
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
