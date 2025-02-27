import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useTheme } from '../context/ThemeContext';
import { Suspense } from 'react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

interface PostProps {
  frontMatter: { title: string; date: string };
  content: string;
}

export default function PostTemplate({ frontMatter, content }: PostProps) {
  const { theme } = useTheme();

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className={`max-w-3xl mx-auto px-4 py-6 sm:px-6 rounded-2xl shadow-lg ${
        theme === 'dark'
          ? 'bg-gray-800/80 text-gray-300'
          : 'bg-white text-gray-900'
      }`}
      aria-label={`Artykuł: ${frontMatter.title}`}
    >
      <motion.h1
        className="text-2xl sm:text-3xl font-bold mb-4"
        variants={fadeIn}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {frontMatter.title}
      </motion.h1>
      <motion.p
        className={`text-sm mb-6 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}
        variants={fadeIn}
        transition={{ delay: 0.2 }}
      >
        {new Date(frontMatter.date).toLocaleDateString('pl-PL')}
      </motion.p>
      <Suspense
        fallback={<div className="h-32 animate-pulse bg-gray-700/50" />}
      >
        <ReactMarkdown
          className={`prose ${
            theme === 'dark' ? 'prose-invert text-gray-300' : 'text-gray-700'
          } max-w-none`}
          components={{
            p: ({ children }) => (
              <p className="mb-4 leading-relaxed">{children}</p>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-semibold mt-6 mb-4">{children}</h2>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </Suspense>
    </motion.section>
  );
}
