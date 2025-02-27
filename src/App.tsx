import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import { useTheme } from './context/ThemeContext';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Blog = lazy(() => import('./pages/Blog'));
const Post = lazy(() => import('./pages/Post'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Testimonials = lazy(() => import('./pages/Testimonials')); // Nowy import

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
};

export default function App() {
  const { theme } = useTheme();

  // Przewijanie na górę przy zmianie trasy
  useEffect(() => {
    const handleRouteChange = () =>
      window.scrollTo({ top: 0, behavior: 'smooth' });
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  return (
    <Router>
      <div
        className={`min-h-screen flex flex-col ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300'
            : 'bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800'
        }`}
        aria-label="Aplikacja DialogAI"
      >
        <Header />
        <AnimatePresence mode="wait">
          <Suspense
            fallback={
              <motion.div
                className="flex-1 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                aria-label="Ładowanie strony"
              >
                <LoadingScreen />
              </motion.div>
            }
          >
            <main className="flex-1">
              <Routes>
                <Route
                  path="/"
                  element={
                    <motion.div
                      key="home"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <Home />
                    </motion.div>
                  }
                />
                <Route
                  path="/blog"
                  element={
                    <motion.div
                      key="blog"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <Blog />
                    </motion.div>
                  }
                />
                <Route
                  path="/blog/:slug"
                  element={
                    <motion.div
                      key="post"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <Post />
                    </motion.div>
                  }
                />
                <Route
                  path="/privacy-policy"
                  element={
                    <motion.div
                      key="privacy"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <PrivacyPolicy />
                    </motion.div>
                  }
                />
                <Route
                  path="/testimonials"
                  element={
                    <motion.div
                      key="testimonials"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <Testimonials />
                    </motion.div>
                  }
                />
                <Route
                  path="*"
                  element={
                    <motion.div
                      key="not-found"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="min-h-[calc(100vh-200px)] flex items-center justify-center text-center p-4"
                    >
                      <div>
                        <h1
                          className={`text-3xl font-bold mb-4 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          404 - Strona nie znaleziona
                        </h1>
                        <p
                          className={
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }
                        >
                          Wygląda na to, że zabłądziłeś. Wróć na stronę główną
                          lub skontaktuj się z nami!
                        </p>
                        <motion.a
                          href="/"
                          className={`mt-6 inline-flex items-center px-6 py-3 rounded-lg ${
                            theme === 'dark'
                              ? 'bg-teal-500 hover:bg-teal-400'
                              : 'bg-teal-600 hover:bg-teal-500'
                          } text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Powrót do strony głównej"
                        >
                          Wróć do domu
                        </motion.a>
                      </div>
                    </motion.div>
                  }
                />
              </Routes>
            </main>
          </Suspense>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
}
