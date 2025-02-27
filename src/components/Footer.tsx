import { motion } from 'framer-motion';
import { Bot, Mail, Phone } from 'lucide-react';
import { Suspense, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
const scrollToSection = (sectionId: string) => {
  const element = document.querySelector(sectionId);
  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function Footer() {
  const [isMounted, setIsMounted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => setIsMounted(true), []);

  const navigation = [
    { name: 'Strona główna', href: '/', sectionId: '#home' },
    { name: 'Usługi', href: '/', sectionId: '#services' },
    { name: 'Realizacje', href: '/', sectionId: '#case-studies' },
    { name: 'Blog', href: '/blog', sectionId: null },
    { name: 'Opinie', href: '/testimonials', sectionId: null },
    { name: 'Polityka prywatności', href: '/privacy-policy', sectionId: null },
    { name: 'Kontakt', href: '/', sectionId: '#contact' },
  ];

  const handleNavigation = (item: {
    href: string;
    sectionId: string | null;
  }) => {
    if (item.href === '/' && item.sectionId) {
      if (location.pathname === '/') scrollToSection(item.sectionId);
      else {
        navigate(item.href, { replace: true });
        setTimeout(() => scrollToSection(item.sectionId!), 300);
      }
    } else {
      navigate(item.href, { replace: true });
      setTimeout(() => scrollToTop(), 300);
    }
  };

  return (
    <motion.footer
      className={`py-16 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300'
          : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-700'
      }`}
      initial="hidden"
      animate={isMounted ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {/* Logo i opis */}
          <motion.div variants={fadeIn}>
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05, x: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation({ href: '/', sectionId: '#home' });
                }}
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
            <p className="mt-4 text-sm">
              Rewolucjonizujemy biznes dzięki sztucznej inteligencji.
            </p>
          </motion.div>

          {/* Nawigacja */}
          <motion.div variants={fadeIn}>
            <h3
              className={`text-sm font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              } mb-4`}
            >
              Nawigacja
            </h3>
            <motion.ul
              className="space-y-3"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              {navigation.map((item) => (
                <li key={item.name}>
                  <motion.div
                    whileHover={{
                      x: 5,
                      color: theme === 'dark' ? '#5eead4' : '#0d9488',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to={item.href}
                      className="text-sm hover:text-teal-400 transition-colors flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(item);
                      }}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Kontakt */}
          <motion.div variants={fadeIn}>
            <h3
              className={`text-sm font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              } mb-4`}
            >
              Kontakt
            </h3>
            <p className="text-sm flex items-center gap-2">
              <Suspense fallback={<div className="w-4 h-4" />}>
                <Mail
                  className={`h-4 w-4 ${
                    theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                  }`}
                  loading="lazy"
                />
              </Suspense>
              Email: kontakt@dialogai.pl
            </p>
            <p className="text-sm flex items-center gap-2 mt-2">
              <Suspense fallback={<div className="w-4 h-4" />}>
                <Phone
                  className={`h-4 w-4 ${
                    theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                  }`}
                  loading="lazy"
                />
              </Suspense>
              Telefon: +48 123 456 789
            </p>
          </motion.div>
        </motion.div>

        {/* Stopka z prawami autorskimi i certyfikatami */}
        <motion.div
          className="mt-12 border-t border-gray-800/50 pt-8 text-center"
          variants={fadeIn}
          transition={{ delay: 0.4 }}
        >
          <motion.p
            className="text-xs hover:text-teal-400 transition-colors cursor-pointer"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation({ href: '/', sectionId: '#home' });
            }}
          >
            © {new Date().getFullYear()} DialogAI. Wszelkie prawa zastrzeżone.
          </motion.p>
          <div className="mt-4 flex justify-center gap-4">
            <img
              src="/ssl-icon.png"
              alt="Certyfikat SSL"
              className="w-6 h-6"
              loading="lazy"
            />
            <img
              src="/rodo-icon.png"
              alt="Zgodność z RODO"
              className="w-6 h-6"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
