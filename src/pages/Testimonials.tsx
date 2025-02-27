import { motion } from 'framer-motion';
import { Star, Quote, Building, MessageSquare, User } from 'lucide-react'; // Dodano User
import { Suspense, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const slideIn = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

interface Testimonial {
  id: number;
  name: string;
  position: string;
  quote: string;
  rating: number;
  industry: string;
  featured: boolean;
}

export default function Testimonials() {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Klient z branży nieruchomości',
      position: 'Kierownik projektu',
      quote:
        'DialogAI pomógł nam zautomatyzować podstawowe pytania klientów, co usprawniło początkową komunikację w naszym projekcie pilotażowym.',
      rating: 5,
      industry: 'nieruchomości',
      featured: true,
    },
    {
      id: 2,
      name: 'Klient z e-commerce',
      position: 'Właściciel sklepu',
      quote:
        'Chatbot DialogAI ułatwił testowe rekomendacje produktów, co pozytywnie wpłynęło na zainteresowanie klientów w fazie pilotażu.',
      rating: 5,
      industry: 'e-commerce',
      featured: true,
    },
    {
      id: 3,
      name: 'Klient z opieki zdrowotnej',
      position: 'Specjalista ds. obsługi',
      quote:
        'Rozwiązanie DialogAI wspierało nas w pierwszych krokach automatyzacji umawiania wizyt, co poprawiło organizację na wczesnym etapie.',
      rating: 4,
      industry: 'opieka zdrowotna',
      featured: false,
    },
  ];

  const filteredTestimonials =
    activeFilter === 'all'
      ? testimonials
      : activeFilter === 'featured'
      ? testimonials.filter((t) => t.featured)
      : testimonials.filter((t) => t.industry === activeFilter);

  const industries = [
    'all',
    'featured',
    'nieruchomości',
    'e-commerce',
    'opieka zdrowotna',
    'finanse',
    'małe przedsiębiorstwa',
    'turystyka',
  ];

  return (
    <div
      className={`min-h-screen pt-24 pb-16 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-gray-900 to-gray-950 text-white'
          : 'bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Opinie naszych klientów
          </h1>
          <p
            className={`text-lg sm:text-xl max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Zobacz, jak DialogAI wspiera firmy na wczesnym etapie transformacji
            dzięki AI.
          </p>
        </motion.div>

        {/* Karuzela wyróżnionych opinii */}
        <motion.div
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            interval={5000}
            showStatus={false}
            showIndicators={false}
            className="max-w-4xl mx-auto"
          >
            {testimonials
              .filter((t) => t.featured)
              .map((testimonial) => (
                <div key={testimonial.id} className="p-4">
                  <div
                    className={`rounded-xl p-6 shadow-lg ${
                      theme === 'dark' ? 'bg-gray-800/80' : 'bg-white'
                    }`}
                  >
                    <Quote
                      size={24}
                      className={`mb-4 mx-auto ${
                        theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                      }`}
                    />
                    <p
                      className={`text-base leading-relaxed text-center ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      "{testimonial.quote}"
                    </p>
                    <div className="flex justify-center mt-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < testimonial.rating
                              ? 'text-yellow-400'
                              : 'text-gray-400'
                          }
                          fill={
                            i < testimonial.rating ? 'currentColor' : 'none'
                          }
                        />
                      ))}
                    </div>
                    <p
                      className={`mt-4 text-sm font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {testimonial.name}, {testimonial.position}
                    </p>
                  </div>
                </div>
              ))}
          </Carousel>
        </motion.div>

        {/* Filtry */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {industries.map((industry) => (
            <motion.button
              key={industry}
              onClick={() => setActiveFilter(industry)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === industry
                  ? theme === 'dark'
                    ? 'bg-teal-500 text-white'
                    : 'bg-teal-600 text-white'
                  : theme === 'dark'
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-teal-500`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {industry === 'all'
                ? 'Wszystkie'
                : industry === 'featured'
                ? 'Wyróżnione'
                : industry.charAt(0).toUpperCase() + industry.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Lista opinii */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className={`rounded-xl p-6 shadow-lg ${
                theme === 'dark'
                  ? 'bg-gray-800/80 border-teal-500/20'
                  : 'bg-white border-gray-200'
              } border`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideIn}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <Suspense
                  fallback={
                    <div className="w-16 h-16 rounded-full bg-gray-300" />
                  }
                >
                  <User
                    className={`w-16 h-16 rounded-full object-cover border-2 ${
                      theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                    } p-2 bg-${theme === 'dark' ? 'gray-700' : 'gray-200'}`}
                    aria-hidden="true"
                  />
                </Suspense>
                <div>
                  <h3
                    className={`font-bold text-lg ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {testimonial.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {testimonial.position}
                  </p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < testimonial.rating
                            ? 'text-yellow-400'
                            : 'text-gray-400'
                        }
                        fill={i < testimonial.rating ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={`relative ${
                  theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'
                } rounded-lg p-4 mb-4`}
              >
                <Quote
                  size={24}
                  className={`absolute top-2 left-2 opacity-20 ${
                    theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                  }`}
                />
                <p
                  className={`relative z-10 text-sm leading-relaxed ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center text-xs px-3 py-1 rounded-full ${
                    theme === 'dark'
                      ? 'bg-teal-500/20 text-teal-300'
                      : 'bg-teal-100 text-teal-800'
                  }`}
                >
                  <Building size={12} className="mr-1" />
                  {testimonial.industry.charAt(0).toUpperCase() +
                    testimonial.industry.slice(1)}
                </span>
                {testimonial.featured && (
                  <span
                    className={`inline-flex items-center text-xs px-3 py-1 rounded-full ${
                      theme === 'dark'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    <Star size={12} className="mr-1" fill="currentColor" />
                    Wyróżnione
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className={`mt-16 p-8 rounded-xl ${
            theme === 'dark'
              ? 'bg-gray-800/50 border-teal-500/20'
              : 'bg-white border-gray-200'
          } border text-center`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2
            className={`text-2xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Zostań pionierem AI z DialogAI
          </h2>
          <p
            className={`mb-6 max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Dołącz do firm, które zaczynają swoją podróż z AI. Skontaktuj się i
            zobacz, jak możemy pomóc!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/#contact"
              className={`inline-flex items-center px-6 py-3 rounded-lg ${
                theme === 'dark'
                  ? 'bg-teal-500 hover:bg-teal-400'
                  : 'bg-teal-600 hover:bg-teal-500'
              } text-white font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500`}
            >
              <MessageSquare size={18} className="mr-2" />
              Skontaktuj się
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
