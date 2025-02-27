import { lazy } from 'react';
import { useTheme } from '../context/ThemeContext'; // Assuming ThemeContext is created

// Lazy load components for performance
const LazyHeroSection = lazy(() => import('../components/HeroSection'));
const LazyServicesSection = lazy(() => import('../components/ServicesSection'));
const LazyCaseStudiesSection = lazy(() =>
  import('../components/CaseStudiesSection')
);
const LazyContactSection = lazy(() => import('../components/ContactSection'));

export default function Home() {
  const { theme } = useTheme(); // Use theme from context

  return (
    <div
      className={`bg-gradient-to-b from-gray-900 to-gray-950 text-${
        theme === 'dark' ? 'white' : 'gray-800'
      } min-h-screen transition-colors duration-500`}
      aria-label="Strona główna DialogAI – automatyzacja i konsulting biznesu z AI"
    >
      <Suspense
        fallback={
          <div
            className="min-h-screen bg-gray-900 flex items-center justify-center text-white animate-pulse"
            aria-label="Ładowanie strony głównej"
          >
            <span>Loading...</span>
          </div>
        }
      >
        {/* Hero Section: Broad Intro with AI Consulting Focus */}
        <LazyHeroSection />

        {/* Services Section: Showcase All Key Services */}
        <LazyServicesSection />

        {/* Case Studies Section: Diverse Industry Examples */}
        <LazyCaseStudiesSection />

        {/* Contact Section: Consultation Focus */}
        <LazyContactSection />
      </Suspense>
    </div>
  );
}
