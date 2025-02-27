import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        // Pobierz listę plików Markdown z folderu content/blog w repozytorium Git
        const response = await fetch('/content/blog/', { headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('Błąd pobierania postów');
        const files = await response.json();
        const postData = files.map((file: any) => {
          const slug = file.name.replace('.md', '');
          return {
            slug,
            title: file.title || 'Brak tytułu', // Parsuj frontmatter, jeśli dostępne
            date: file.date || new Date().toISOString(),
            description: file.description || 'Brak opisu',
          };
        });
        setPosts(postData.slice(0, page * 6));
        setHasMore(postData.length > page * 6);
      } catch (error) {
        console.error('Błąd ładowania postów:', error);
      }
    };
    loadPosts();
  }, [page]);

  const loadMore = () => setPage((prev) => prev + 1);

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
          <h1
            className={`text-3xl sm:text-4xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Nasze artykuły
          </h1>
          <p
            className={`text-lg ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Odkryj najnowsze wpisy na temat AI i transformacji biznesu.
          </p>
        </motion.div>

        <motion.div
          className="space-y-8"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              className={`rounded-xl p-6 shadow-lg ${
                theme === 'dark' ? 'bg-gray-800/80 border-teal-500/20' : 'bg-white border-gray-200'
              } border cursor-pointer`}
              variants={fadeIn}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => navigate(`/blog/${post.slug}`)}
            >
              <h2
                className={`text-xl font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {post.title}
              </h2>
              <p
                className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                } mb-4`}
              >
                {post.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} aria-hidden="true" />
                  <span>{new Date(post.date).toLocaleDateString('pl-PL')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} aria-hidden="true" />
                  <span>5 min czytania</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {hasMore && (
          <motion.div
            className="text-center mt-12"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <motion.button
              onClick={loadMore}
              className={`inline-flex items-center px-6 py-3 rounded-lg ${
                theme === 'dark'
                  ? 'bg-teal-500 hover:bg-teal-400'
                  : 'bg-teal-600 hover:bg-teal-500'
              } text-white font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Załaduj więcej artykułów"
            >
              Załaduj więcej
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}