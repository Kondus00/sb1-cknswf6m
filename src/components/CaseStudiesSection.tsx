import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Stethoscope,
  Building2,
  Users,
  Globe,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { Suspense, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

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

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

interface CaseStudy {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  client: string;
  desc: string;
  details: string;
  seoText: string;
}

export default function CaseStudiesSection() {
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  const { theme } = useTheme();

  const caseStudies: CaseStudy[] = [
    {
      icon: ShoppingCart,
      title: 'E-commerce',
      client: 'Sklep internetowy XYZ',
      desc: 'Personalizacja rekomendacji produktów dzięki chatbotom AI.',
      details:
        'Wspólnie ze sklepem internetowym XYZ opracowaliśmy prototyp chatbota opartego na Vertex AI, który analizuje zachowania klientów i sugeruje odpowiednie produkty. Klient zauważył poprawę w zaangażowaniu użytkowników podczas testów pilotażowych.',
      seoText: 'Chatboty AI dla e-commerce – personalizacja w sprzedaży online',
    },
    {
      icon: Building2,
      title: 'Nieruchomości',
      client: 'Agencja DomInvest',
      desc: 'Automatyzacja odpowiedzi na zapytania o oferty.',
      details:
        'Dla agencji DomInvest wdrożyliśmy wstępny model chatbota opartego na Dialogflow CX, który automatycznie odpowiada na podstawowe pytania dotyczące ofert nieruchomości. Klient zgłosił szybszą obsługę zapytań w fazie testowej.',
      seoText: 'Chatboty AI dla nieruchomości – automatyzacja zapytań',
    },
    {
      icon: Stethoscope,
      title: 'Opieka zdrowotna',
      client: 'Klinika MedHealth',
      desc: 'Uproszczenie umawiania wizyt za pomocą AI.',
      details:
        'W klinice MedHealth stworzyliśmy prototyp rozwiązania opartego na Vertex AI do automatyzacji umawiania wizyt. Klient docenił redukcję liczby manualnych zapytań i lepszą organizację w początkowej fazie wdrożenia.',
      seoText: 'AI w opiece zdrowotnej – automatyzacja umawiania wizyt',
    },
    {
      icon: Users,
      title: 'Małe przedsiębiorstwa',
      client: 'Firma ABC',
      desc: 'Analiza danych dla lepszego zarządzania.',
      details:
        'Dla małej firmy ABC przeprowadziliśmy analizę danych przy użyciu Google Analytics 4 i Vertex AI, pomagając zidentyfikować kluczowe obszary wzrostu. Klient zauważył lepsze zrozumienie klientów po kilku tygodniach testów.',
      seoText: 'Analiza danych AI dla małych firm – optymalizacja biznesu',
    },
  ];

  const toggleDetails = (title: string) =>
    setExpandedCase(expandedCase === title ? null : title);

  return (
    <section
      id="case-studies"
      className={`py-24 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-gray-900 to-gray-950'
          : 'bg-gradient-to-b from-gray-50 to-gray-100'
      } transition-colors duration-500`}
      aria-label="Nasze realizacje DialogAI – przykłady zastosowania AI w biznesie"
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
          Nasze realizacje
        </h2>
        <p
          className={`mt-2 text-4xl font-bold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          } sm:text-5xl`}
        >
          Przykłady zastosowania AI
        </p>
        <p
          className={`mt-6 text-lg leading-8 text-${
            theme === 'dark' ? 'gray-400' : 'gray-600'
          } max-w-3xl mx-auto`}
        >
          Odkryj, jak nasze rozwiązania AI wspierają biznesy na wczesnym etapie
          transformacji – od e-commerce po małe przedsiębiorstwa.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 mt-16">
        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.title}
              className={`bg-${
                theme === 'dark' ? 'gray-800/80' : 'white'
              } rounded-2xl p-8 shadow-lg hover:shadow-xl hover:bg-${
                theme === 'dark' ? 'gray-700' : 'gray-100'
              } transition-all duration-300 border border-${
                theme === 'dark' ? 'teal-500/10' : 'teal-500/5'
              } cursor-pointer`}
              variants={subtleScale}
              whileHover={{ scale: 1.03, y: -5 }}
              role="article"
              aria-label={caseStudy.title}
            >
              <motion.div
                className="flex justify-center mb-6"
                variants={subtleFade}
              >
                <Suspense fallback={<div className="w-16 h-16" />}>
                  <caseStudy.icon
                    className={`w-16 h-16 ${
                      theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                    }`}
                    aria-hidden="true"
                    loading="lazy"
                  />
                </Suspense>
              </motion.div>
              <motion.h3
                className={`text-2xl font-bold text-center mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
                variants={subtleFade}
              >
                {caseStudy.title}
              </motion.h3>
              <motion.p
                className={`text-${
                  theme === 'dark' ? 'gray-500' : 'gray-600'
                } text-center text-sm mb-4 italic`}
                variants={subtleFade}
              >
                Klient: {caseStudy.client}
              </motion.p>
              <motion.p
                className={`text-${
                  theme === 'dark' ? 'gray-300' : 'gray-700'
                } text-center text-base mb-6`}
                variants={subtleFade}
              >
                {caseStudy.desc}
              </motion.p>
              <motion.button
                onClick={() => toggleDetails(caseStudy.title)}
                className={`w-full inline-flex items-center justify-center bg-${
                  theme === 'dark' ? 'teal-500/10' : 'teal-500/5'
                } text-${theme === 'dark' ? 'teal-400' : 'teal-600'} hover:bg-${
                  theme === 'dark' ? 'teal-500' : 'teal-600'
                } hover:text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2`}
                variants={subtleFade}
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                aria-expanded={expandedCase === caseStudy.title}
                aria-controls={`details-${caseStudy.title}`}
              >
                Dowiedz się więcej
                {expandedCase === caseStudy.title ? (
                  <ChevronDown className="w-5 h-5 ml-2" aria-hidden="true" />
                ) : (
                  <ChevronRight className="w-5 h-5 ml-2" aria-hidden="true" />
                )}
              </motion.button>
              <motion.div
                id={`details-${caseStudy.title}`}
                initial="hidden"
                animate={
                  expandedCase === caseStudy.title ? 'visible' : 'hidden'
                }
                variants={slideUp}
                className="overflow-hidden mt-6"
              >
                <motion.p
                  className={`text-${
                    theme === 'dark' ? 'gray-300' : 'gray-700'
                  } text-base leading-relaxed`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  {caseStudy.details}
                </motion.p>
              </motion.div>
              <p className="sr-only">{caseStudy.seoText}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
