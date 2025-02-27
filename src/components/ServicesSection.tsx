import { motion } from 'framer-motion';
import {
  Database,
  Settings,
  PenTool,
  MessageSquare,
  Lightbulb,
  BookOpen,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { Suspense, useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext'; // Używamy contextu, nie lokalnego stanu

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const subtleScale = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const subtleFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

const expandDetails = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  details: string;
  tools: string[];
  seoText: string;
}

export default function ServicesSection() {
  const { theme } = useTheme(); // Używamy kontekstu ThemeContext zamiast lokalnego stanu
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const services: Service[] = useMemo(
    () => [
      {
        icon: Database,
        title: 'Analiza danych z wykorzystaniem AI',
        desc: 'Przekształć dane w strategie dzięki AI, np. segmentacji i predykcji trendów.',
        details:
          'Korzystamy z Google Analytics 4 i Vertex AI, aby pomóc firmom zidentyfikować kluczowych klientów i zoptymalizować kampanie. Przykładem jest wsparcie dla e-commerce w analizie koszyków zakupowych.',
        tools: ['Google Analytics 4', 'Vertex AI', 'NotebookLM'],
        seoText:
          'Analiza danych z AI – segmentacja klientów i predykcja trendów',
      },
      {
        icon: MessageSquare,
        title: 'Chatboty dla automatyzacji',
        desc: 'Zautomatyzuj obsługę klienta za pomocą inteligentnych chatbotów.',
        details:
          'Nasze chatboty oparte na Dialogflow CX i Vertex AI obsługują zapytania 24/7, np. w nieruchomościach – pomagają w odpowiedzi na pytania o oferty, co skraca czas reakcji i zwiększa zadowolenie klientów.',
        tools: ['Dialogflow CX', 'Vertex AI'],
        seoText: 'Chatboty AI – automatyzacja obsługi klienta w biznesie',
      },
      {
        icon: Settings,
        title: 'Automatyzacja procesów biznesowych',
        desc: 'Zoptymalizuj operacje dzięki AI i narzędziom Google.',
        details:
          'Automatyzujemy procesy, jak umawianie wizyt w opiece zdrowotnej, używając Vertex AI i Google Cloud, co pozwala firmom skupić się na kluczowych zadaniach. Przykładem jest integracja z CRM dla turystyki.',
        tools: ['Vertex AI', 'Google Cloud', 'CRM'],
        seoText: 'Automatyzacja procesów z AI – optymalizacja biznesu',
      },
      {
        icon: PenTool,
        title: 'Szkolenia i konsulting AI',
        desc: 'Rozwijaj umiejętności zespołu w AI i transformacji cyfrowej.',
        details:
          'Prowadzimy warsztaty i konsulting, ucząc zespoły korzystania z AI, np. w małych przedsiębiorstwach – pomagamy wdrażać chatboty i analizę danych, zwiększając efektywność operacyjną.',
        tools: ['Google AI Platform', 'NotebookLM'],
        seoText: 'Szkolenia AI – konsulting i transformacja cyfrowa dla firm',
      },
    ],
    []
  );

  const toggleDetails = (title: string) => {
    setExpandedService(expandedService === title ? null : title);
  };

  return (
    <section
      id="services"
      className={`py-20 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-gray-900 to-gray-950'
          : 'bg-gradient-to-b from-gray-50 to-gray-100'
      } transition-colors duration-500`}
      aria-label="Sekcja usług DialogAI – rozwiązania AI dla biznesu"
    >
      <motion.div
        className="max-w-7xl mx-auto px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2
          className={`text-base font-semibold uppercase tracking-wide ${
            theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
          }`}
        >
          Transformacja z AI
        </h2>
        <p
          className={`mt-2 text-4xl font-bold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          } sm:text-5xl`}
        >
          Rozwiązania szyte na miarę
        </p>
        <p
          className={`mt-4 text-lg text-${
            theme === 'dark' ? 'gray-400' : 'gray-600'
          } max-w-3xl mx-auto`}
        >
          Odkryj, jak nasze rozwiązania AI i technologie Google mogą
          zrewolucjonizować Twój biznes w każdej branży – od nieruchomości po
          e-commerce i opiekę zdrowotną.
        </p>
        {/* Social proof (usunięte big numbers, bardziej realistyczne) */}
        <motion.div
          className="mt-6 text-sm text-gray-400"
          initial="hidden"
          whileInView="visible"
          variants={subtleFade}
        >
          <span>
            Zaufaj pionierom AI – wspieramy pierwsze firmy w transformacji
            biznesu!
          </span>
        </motion.div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            className={`bg-${
              theme === 'dark' ? 'gray-800/80' : 'white'
            } rounded-xl p-6 shadow-lg hover:shadow-xl hover:bg-${
              theme === 'dark' ? 'gray-700' : 'gray-100'
            } transition-all duration-300 border border-${
              theme === 'dark' ? 'teal-500/20' : 'teal-500/10'
            } cursor-pointer`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={subtleScale}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            role="article"
            aria-label={service.title}
          >
            <motion.div
              className="flex justify-center mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={subtleFade}
            >
              <Suspense fallback={<div className="w-14 h-14" />}>
                <service.icon
                  className={`w-14 h-14 ${
                    theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                  }`}
                  aria-hidden="true"
                  loading="lazy"
                />
              </Suspense>
            </motion.div>
            <motion.h3
              className={`text-lg font-semibold text-center mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={subtleFade}
              transition={{ delay: index * 0.1 + 0.1 }}
            >
              {service.title}
            </motion.h3>
            <motion.p
              className={`text-${
                theme === 'dark' ? 'gray-400' : 'gray-600'
              } text-center text-sm mb-4`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={subtleFade}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {service.desc}
            </motion.p>
            <motion.button
              onClick={() => toggleDetails(service.title)}
              className={`mt-4 inline-flex items-center text-${
                theme === 'dark' ? 'teal-400' : 'teal-600'
              } hover:text-${
                theme === 'dark' ? 'teal-300' : 'teal-500'
              } text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-${
                theme === 'dark' ? 'teal-500' : 'teal-600'
              } focus:ring-offset-2 focus:ring-offset-${
                theme === 'dark' ? 'gray-900' : 'gray-50'
              }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={subtleFade}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              aria-expanded={expandedService === service.title}
              aria-controls={`details-${service.title}`}
            >
              Dowiedz się więcej
              {expandedService === service.title ? (
                <ChevronDown
                  className={`w-4 h-4 ml-1 ${
                    theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                  }`}
                  aria-hidden="true"
                />
              ) : (
                <ChevronRight
                  className={`w-4 h-4 ml-1 ${
                    theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                  }`}
                  aria-hidden="true"
                />
              )}
            </motion.button>
            <motion.div
              id={`details-${service.title}`}
              initial="hidden"
              animate={expandedService === service.title ? 'visible' : 'hidden'}
              variants={expandDetails}
              className="overflow-hidden mt-4"
            >
              <motion.p
                className={`text-${
                  theme === 'dark' ? 'gray-300' : 'gray-700'
                } text-sm`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {service.details}
                <br />
                <span
                  className={`font-medium text-${
                    theme === 'dark' ? 'teal-400' : 'teal-600'
                  }`}
                >
                  Narzędzia:
                </span>{' '}
                {service.tools.join(', ')}
              </motion.p>
            </motion.div>
            <p className="sr-only">{service.seoText}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
