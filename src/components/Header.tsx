import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Bot, Sun, Moon } from 'lucide-react';
import { Suspense, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const fadeIn = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
const scrollToSection = (sectionId: string) => {
  const element = document.querySelector(sectionId);
  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const scrollToChatInput = () => {
  const chatContainer = document.querySelector('#chat-container');
  const chatInput = document.querySelector('#chat-container input');
  if (chatContainer) {
    chatContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (chatInput)
      setTimeout(() => (chatInput as HTMLInputElement).focus(), 500);
  }
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Strona główna', href: '/', sectionId: '#home' },
    { name: 'Usługi', href: '/', sectionId: '#services' },
    { name: 'Realizacje', href: '/', sectionId: '#case-studies' },
    { name: 'Blog', href: '/blog', sectionId: null },
    { name: 'Opinie', href: '/testimonials', sectionId: null },
    { name: 'Kontakt', href: '/', sectionId: '#contact' },
  ];

  const handleNavigation = (item: {
    href: string;
    sectionId: string | null;
  }) => {
    if (item.href === '/' && item.sectionId) {
      if (location.pathname === '/') scrollToSection(item.sectionId);
      else
        navigate(item.href, {
          replace: true,
          state: { sectionId: item.sectionId },
        });
    } else {
      navigate(item.href, { replace: true });
      setTimeout(() => scrollToTop(), 300);
    }
    setMobileMenuOpen(false);
  };

  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') scrollToChatInput();
    else navigate('/', { replace: true, state: { scrollToChat: true } });
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (location.pathname === '/' && location.state?.sectionId)
      scrollToSection(location.state.sectionId);
    if (location.state?.scrollToChat) scrollToChatInput();
  }, [location]);

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? theme === 'dark'
            ? 'bg-gray-900/95 backdrop-blur-md shadow-lg'
            : 'bg-white/95 backdrop-blur-md shadow-lg'
          : theme === 'dark'
          ? 'bg-transparent'
          : 'bg-transparent'
      }`}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          variants={scaleIn}
          whileHover={{ scale: 1.05 }}
        >
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation({ href: '/', sectionId: '#home' });
            }}
            className="flex items-center gap-2"
            aria-label="Przejdź do strony głównej"
          >
            <Suspense fallback={<div className="w-8 h-8" />}>
              <Bot
                className={`h-8 w-8 ${
                  theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                }`}
                loading="lazy"
              />
            </Suspense>
            <span
              className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              DialogAI
            </span>
          </Link>
        </motion.div>

        <div className="hidden lg:flex items-center gap-x-6">
          {navigation.map((item) => (
            <motion.div
              key={item.name}
              variants={fadeIn}
              whileHover={{ scale: 1.1 }}
            >
              <Link
                to={item.href}
                aria-label={`Przejdź do ${item.name}`}
                className={`text-sm font-medium ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:text-teal-400'
                    : 'text-gray-700 hover:text-teal-600'
                } transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(item);
                }}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
          <motion.button
            aria-label={`Przełącz na motyw ${
              theme === 'dark' ? 'jasny' : 'ciemny'
            }`}
            onClick={toggleTheme}
            className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
              theme === 'dark'
                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Suspense fallback={<div className="w-5 h-5" />}>
              {theme === 'dark' ? (
                <Sun size={20} loading="lazy" />
              ) : (
                <Moon size={20} loading="lazy" />
              )}
            </Suspense>
          </motion.button>
          <motion.button
            aria-label="Wypróbuj darmowe demo"
            onClick={handleDemoClick}
            className={`rounded-md ${
              theme === 'dark'
                ? 'bg-teal-500 hover:bg-teal-400'
                : 'bg-teal-600 hover:bg-teal-500'
            } px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500`}
            variants={scaleIn}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            Darmowe demo
          </motion.button>
        </div>

        <motion.button
          aria-label="Otwórz menu mobilne"
          className={`lg:hidden ${
            theme === 'dark'
              ? 'text-gray-300 hover:text-teal-400'
              : 'text-gray-700 hover:text-teal-600'
          }`}
          onClick={() => setMobileMenuOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          focus={{ outline: 'none', ring: '2px solid teal-500' }}
        >
          <Suspense fallback={<div className="w-6 h-6" />}>
            <Menu className="h-6 w-6" loading="lazy" />
          </Suspense>
        </motion.button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-900/50 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) =>
              e.target === e.currentTarget && setMobileMenuOpen(false)
            }
          >
            <motion.div
              className={`absolute right-0 top-0 h-full w-4/5 max-w-sm ${
                theme === 'dark'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-900'
              } shadow-xl`}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="flex flex-col p-6 h-full">
                <div className="flex items-center justify-between mb-6">
                  <motion.div
                    className="flex items-center gap-2"
                    variants={scaleIn}
                  >
                    <Link
                      to="/"
                      aria-label="Przejdź do strony głównej"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation({ href: '/', sectionId: '#home' });
                      }}
                      className="flex items-center gap-2"
                    >
                      <Suspense fallback={<div className="w-8 h-8" />}>
                        <Bot
                          className={`h-8 w-8 ${
                            theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                          }`}
                          loading="lazy"
                        />
                      </Suspense>
                      <span
                        className={`text-xl font-bold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        DialogAI
                      </span>
                    </Link>
                  </motion.div>
                  <motion.button
                    aria-label={`Przełącz na motyw ${
                      theme === 'dark' ? 'jasny' : 'ciemny'
                    }`}
                    onClick={toggleTheme}
                    className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                      theme === 'dark'
                        ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Suspense fallback={<div className="w-5 h-5" />}>
                      {theme === 'dark' ? (
                        <Sun size={20} loading="lazy" />
                      ) : (
                        <Moon size={20} loading="lazy" />
                      )}
                    </Suspense>
                  </motion.button>
                </div>
                <motion.div
                  className={`mt-4 flex-1 space-y-6 ${
                    theme === 'dark' ? 'bg-gray-800/90' : 'bg-gray-100/90'
                  } backdrop-blur-lg rounded-xl p-4 shadow-lg`}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  {navigation.map((item) => (
                    <motion.div
                      key={item.name}
                      whileHover={{ x: 10 }}
                      variants={fadeIn}
                    >
                      <Link
                        to={item.href}
                        aria-label={`Przejdź do ${item.name}`}
                        className={`block text-lg font-medium ${
                          theme === 'dark'
                            ? 'text-gray-300 hover:text-teal-400'
                            : 'text-gray-700 hover:text-teal-600'
                        } px-4 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation(item);
                        }}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.button
                    aria-label="Wypróbuj darmowe demo"
                    onClick={handleDemoClick}
                    className={`block w-full rounded-md ${
                      theme === 'dark'
                        ? 'bg-teal-500 hover:bg-teal-400'
                        : 'bg-teal-600 hover:bg-teal-500'
                    } px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    variants={scaleIn}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Darmowe demo
                  </motion.button>
                  <motion.button
                    aria-label="Zamknij menu mobilne"
                    className={`block w-full mt-4 rounded-md ${
                      theme === 'dark'
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : 'bg-gray-300 hover:bg-gray-400'
                    } px-4 py-2 text-sm font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    } shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    onClick={() => setMobileMenuOpen(false)}
                    variants={scaleIn}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Zamknij
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
