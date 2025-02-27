import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, AlertTriangle, Key } from 'lucide-react';
import { Suspense, useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function PrivacyPolicy() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('');

  const sections = [
    { id: 'introduction', title: 'Wprowadzenie', icon: FileText },
    { id: 'data-collection', title: 'Dane, które zbieramy', icon: Eye },
    { id: 'data-usage', title: 'Wykorzystanie danych', icon: Lock },
    { id: 'data-sharing', title: 'Udostępnianie danych', icon: AlertTriangle },
    { id: 'security', title: 'Bezpieczeństwo', icon: Shield },
    { id: 'your-rights', title: 'Twoje prawa', icon: Key },
    { id: 'changes', title: 'Zmiany w polityce', icon: FileText },
    { id: 'contact', title: 'Kontakt', icon: Eye },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0; // Wysokość headera
      const navHeight =
        document.querySelector('.sticky-nav')?.offsetHeight || 0; // Wysokość nawigacji
      const offset = headerHeight + navHeight + 20; // Dodatkowy margines
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  // Przewijanie na górę przy otwarciu strony
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Aktualizacja aktywnej sekcji podczas przewijania
  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const navHeight =
        document.querySelector('.sticky-nav')?.offsetHeight || 0;
      const offset = headerHeight + navHeight + 20;
      const scrollPosition = window.scrollY + offset;
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (
          element &&
          scrollPosition >= element.offsetTop &&
          scrollPosition < element.offsetTop + element.offsetHeight
        ) {
          setActiveSection(section.id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`min-h-screen pt-24 pb-16 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-gray-900 to-gray-950 text-white'
          : 'bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="flex justify-center mb-4">
            <Suspense fallback={<div className="w-16 h-16" />}>
              <Shield
                className={`w-16 h-16 ${
                  theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                }`}
                loading="lazy"
              />
            </Suspense>
          </div>
          <h1
            className={`text-3xl sm:text-4xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Polityka Prywatności
          </h1>
          <p
            className={`text-lg ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Ostatnia aktualizacja: 27 lutego 2025
          </p>
        </motion.div>

        {/* Nawigacja sticky */}
        <motion.div
          className={`flex flex-wrap justify-center gap-3 mb-12 sticky top-16 z-20 ${
            theme === 'dark' ? 'bg-gray-900/90' : 'bg-gray-50/90'
          } py-4 sticky-nav`}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === section.id
                  ? theme === 'dark'
                    ? 'bg-teal-500 text-white'
                    : 'bg-teal-600 text-white'
                  : theme === 'dark'
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-teal-500`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Przejdź do sekcji: ${section.title}`}
            >
              <Suspense fallback={<div className="w-4 h-4" />}>
                <section.icon
                  className={`w-4 h-4 ${
                    activeSection === section.id
                      ? 'text-white'
                      : theme === 'dark'
                      ? 'text-teal-400'
                      : 'text-teal-600'
                  }`}
                  loading="lazy"
                />
              </Suspense>
              {section.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Treść z paddingiem pod nawigacją */}
        <motion.div
          className={`rounded-xl p-8 pt-20 mb-8 ${
            theme === 'dark'
              ? 'bg-gray-800/80 border-teal-500/20'
              : 'bg-white border-gray-200'
          } shadow-lg`}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="prose max-w-none prose-lg">
            <div className={theme === 'dark' ? 'prose-invert' : ''}>
              <section id="introduction">
                <h2 className="flex items-center gap-2">
                  <Suspense fallback={<div className="w-6 h-6" />}>
                    <FileText
                      className={
                        theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                      }
                      loading="lazy"
                    />
                  </Suspense>
                  Wprowadzenie
                </h2>
                <p>
                  W DialogAI ("my", "nas") szanujemy Twoją prywatność. Ten
                  dokument wyjaśnia, jak zbieramy, przetwarzamy i chronimy Twoje
                  dane osobowe podczas korzystania z naszej witryny dialogai.pl
                  i usług. Zgodnie z RODO (GDPR) i innymi przepisami, jesteśmy
                  transparentni w kwestii Twoich danych.
                </p>
              </section>

              <section id="data-collection">
                <h2 className="flex items-center gap-2">
                  <Suspense fallback={<div className="w-6 h-6" />}>
                    <Eye
                      className={
                        theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                      }
                      loading="lazy"
                    />
                  </Suspense>
                  Dane, które zbieramy
                </h2>
                <p>Zbieramy następujące dane:</p>
                <ul>
                  <li>
                    Dane osobowe: imię, email, numer telefonu (podane w
                    formularzach).
                  </li>
                  <li>
                    Dane analityczne: informacje o korzystaniu z witryny (np.
                    czas spędzony, strony odwiedzone).
                  </li>
                  <li>
                    Dane techniczne: adres IP, typ przeglądarki, dane cookies
                    (patrz sekcja Cookies).
                  </li>
                </ul>
              </section>

              <section id="data-usage">
                <h2 className="flex items-center gap-2">
                  <Suspense fallback={<div className="w-6 h-6" />}>
                    <Lock
                      className={
                        theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                      }
                      loading="lazy"
                    />
                  </Suspense>
                  Wykorzystanie danych
                </h2>
                <p>Twoje dane są używane w celu:</p>
                <ul>
                  <li>
                    Świadczenia usług (np. odpowiedzi na zapytania, konsulting
                    AI).
                  </li>
                  <li>
                    Analizy i ulepszania witryny (na podstawie zgody, Art.
                    6(1)(a) GDPR).
                  </li>
                  <li>Marketingu (np. newsletter, jeśli wyraziłeś zgodę).</li>
                </ul>
              </section>

              <section id="data-sharing">
                <h2 className="flex items-center gap-2">
                  <Suspense fallback={<div className="w-6 h-6" />}>
                    <AlertTriangle
                      className={
                        theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                      }
                      loading="lazy"
                    />
                  </Suspense>
                  Udostępnianie danych
                </h2>
                <p>Nie sprzedajemy Twoich danych. Udostępniamy je tylko:</p>
                <ul>
                  <li>
                    Google Analytics (analiza ruchu, USA, zgodność z EU-US Data
                    Privacy Framework).
                  </li>
                  <li>
                    Dostawcom usług email (np. do wysyłki newslettera, na
                    podstawie zgody).
                  </li>
                </ul>
              </section>

              <section id="security">
                <h2 className="flex items-center gap-2">
                  <Suspense fallback={<div className="w-6 h-6" />}>
                    <Shield
                      className={
                        theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                      }
                      loading="lazy"
                    />
                  </Suspense>
                  Bezpieczeństwo
                </h2>
                <p>
                  Chronimy Twoje dane poprzez szyfrowanie SSL, zapory sieciowe i
                  regularne audyty bezpieczeństwa. Przechowujemy je na
                  bezpiecznych serwerach w UE.
                </p>
              </section>

              <section id="your-rights">
                <h2 className="flex items-center gap-2">
                  <Suspense fallback={<div className="w-6 h-6" />}>
                    <Key
                      className={
                        theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                      }
                      loading="lazy"
                    />
                  </Suspense>
                  Twoje prawa
                </h2>
                <p>Masz prawo do:</p>
                <ul>
                  <li>Dostępu do swoich danych.</li>
                  <li>Poprawy nieprawidłowych danych.</li>
                  <li>Usunięcia danych („prawo do bycia zapomnianym”).</li>
                  <li>Sprzeciwu wobec przetwarzania (np. marketingu).</li>
                  <li>Przenoszenia danych.</li>
                </ul>
                <p>Napisz na kontakt@dialogai.pl, aby skorzystać z praw.</p>
              </section>

              <section id="changes">
                <h2 className="flex items-center gap-2">
                  <Suspense fallback={<div className="w-6 h-6" />}>
                    <FileText
                      className={
                        theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                      }
                      loading="lazy"
                    />
                  </Suspense>
                  Zmiany w polityce
                </h2>
                <p>
                  Możemy aktualizować politykę. Zmiany będą publikowane tu, a w
                  istotnych przypadkach powiadomimy Cię emailem.
                </p>
              </section>

              <section id="contact">
                <h2 className="flex items-center gap-2">
                  <Suspense fallback={<div className="w-6 h-6" />}>
                    <Eye
                      className={
                        theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                      }
                      loading="lazy"
                    />
                  </Suspense>
                  Kontakt
                </h2>
                <p>Skontaktuj się z nami:</p>
                <ul>
                  <li>Email: kontakt@dialogai.pl</li>
                  <li>Telefon: +48 123 456 789</li>
                  <li>
                    Adres: DialogAI, ul. Przykładowa 1, 00-000 Warszawa, Polska
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          <a
            href="/"
            className={`inline-flex items-center px-6 py-3 rounded-lg ${
              theme === 'dark'
                ? 'bg-teal-500 hover:bg-teal-400'
                : 'bg-teal-600 hover:bg-teal-500'
            } text-white font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Powrót do strony głównej"
          >
            Powrót do strony głównej
          </a>
          <p
            className={`mt-4 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Pytania? Napisz na{' '}
            <a
              href="mailto:kontakt@dialogai.pl"
              className="text-teal-400 hover:text-teal-300"
              aria-label="Wyślij email do DialogAI"
            >
              kontakt@dialogai.pl
            </a>
            .
          </p>
        </motion.div>
      </div>
    </div>
  );
}
