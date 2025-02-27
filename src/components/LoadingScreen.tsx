import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { Suspense } from 'react';
import { useTheme } from '../context/ThemeContext';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const bounce = {
  animate: {
    scale: [1, 1.2, 1],
    rotate: [0, 5, -5, 0],
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
  },
};

export default function LoadingScreen() {
  const { theme } = useTheme();

  return (
    <motion.div
      className={`min-h-screen flex items-center justify-center flex-col gap-6 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={fadeIn}
      aria-label="Ładowanie strony DialogAI"
    >
      <motion.div
        variants={bounce}
        animate="animate"
        className="flex flex-col items-center"
      >
        <Suspense fallback={<div className="w-12 h-12" />}>
          <Bot
            size={48}
            className={`${
              theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
            }`}
            aria-hidden="true"
            loading="lazy"
          />
        </Suspense>
        <motion.span
          className="mt-4 text-lg font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          Ładowanie...
        </motion.span>
      </motion.div>
      {/* Budowanie zaufania */}
      <motion.p
        className={`text-sm ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Przygotowujemy rozwiązania AI dla Twojego biznesu
      </motion.p>
    </motion.div>
  );
}
