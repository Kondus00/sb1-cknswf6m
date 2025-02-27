import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';
import { useTheme } from '../context/ThemeContext';

// Lazy load components
const LazyHeroSection = lazy(() => import('../components/HeroSection'));
const LazyServicesSection = lazy(() => import('../components/ServicesSection'));
const LazyCaseStudiesSection = lazy(() =>
  import('../components/CaseStudiesSection')
);
const LazyContactSection = lazy(() => import('../components/ContactSection'));

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

export default function Home() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-gray-900 to-gray-950 text-white'
          : 'bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800'
      }`}
      aria-label="Strona główna DialogAI – automatyzacja i konsulting biznesu z AI"
    >
      <Suspense
        fallback={
          <motion.div
            className="min-h-screen flex items-center justify-center animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            aria-label="Ładowanie strony głównej"
          >
            <span className="text-lg">Ładowanie...</span>
          </motion.div>
        }
      >
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <LazyHeroSection />
        </motion.section>

        {/* Social Proof Section */}
        <motion.div
          className="py-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          <p
            className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
            }`}
          >
            Dołącz do pionierów AI i transformuj swój biznes z DialogAI!
          </p>
          <p
            className={`mt-2 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Zaufali nam pierwsi klienci w drodze do sukcesu.
          </p>
        </motion.div>

        {/* Services Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ delay: 0.4 }}
        >
          <LazyServicesSection />
        </motion.section>

        {/* Case Studies Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ delay: 0.6 }}
        >
          <LazyCaseStudiesSection />
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ delay: 0.8 }}
        >
          <LazyContactSection />
        </motion.section>
      </Suspense>
    </div>
  );
}
