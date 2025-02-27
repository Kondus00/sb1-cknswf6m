import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Suspense, useState, useEffect, useRef } from 'react';
import { Share2, Clock, ArrowRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import blogPostsData from '../data/blogPosts.json';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const cardHover = {
  rest: { scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  hover: { scale: 1.03, y: -5, transition: { duration: 0.2, ease: 'easeOut' } },
};

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
}

export default function Blog() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const sortedPosts: BlogPost[] = blogPostsData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  useEffect(() => {
    setDisplayedPosts(sortedPosts.slice(0, 3)); // Initial load
    setIsLoading(false);
  }, []);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          displayedPosts.length < sortedPosts.length
        ) {
          setIsLoading(true);
          setTimeout(() => {
            setDisplayedPosts((prev) => [
              ...prev,
              ...sortedPosts.slice(prev.length, prev.length + 3),
            ]);
            setIsLoading(false);
          }, 1000);
        }
      },
      { threshold: 0.1 }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [displayedPosts, sortedPosts]);

  const getReadingTime = (description: string): number => {
    const wordsPerMinute = 200;
    const words = description.split(' ').length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  const handleShare = async (e: React.MouseEvent, post: BlogPost) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.share({
        title: post.title,
        text: post.description,
        url: `${window.location.origin}/blog/${post.slug}`,
      });
    } catch (err) {
      console.error('Failed to share post:', err);
    }
  };

  const handlePostClick = (slug: string) => navigate(`/blog/${slug}`);

  const recommendedPosts = sortedPosts
    .filter((post) => !displayedPosts.some((p) => p.slug === post.slug))
    .slice(0, 2);

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300'
          : 'bg-gradient-to-b from-gray-50 to-white text-gray-800'
      }`}
      aria-label="Strona bloga DialogAI"
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-teal-500 transform-origin-0"
        style={{ scaleX }}
        aria-hidden="true"
        title="Pasek postępu przewijania"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24" ref={containerRef}>
        <motion.div
          className="relative mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1
            className={`text-4xl sm:text-5xl font-bold mb-6 text-center ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Blog DialogAI
          </h1>
          <p
            className={`text-lg sm:text-xl mb-8 text-center ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Najnowsze insights o AI, chatbotach i automatyzacji biznesu
          </p>
          {/* Zmodyfikowany social proof */}
          <p
            className={`text-sm text-center ${
              theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
            }`}
          >
            Bądź jednym z pierwszych i odkryj potencjał AI z DialogAI!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayedPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial="rest"
              whileHover="hover"
              variants={cardHover}
              onClick={() => handlePostClick(post.slug)}
              className={`group relative overflow-hidden rounded-lg ${
                theme === 'dark'
                  ? 'bg-gray-800/80 border-teal-500/20'
                  : 'bg-white border-gray-200'
              } border shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
              role="article"
              aria-label={`Artykuł: ${post.title}`}
              transition={{ delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <span
                    className={
                      theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                    }
                  >
                    {new Date(post.date).toLocaleDateString('pl-PL')}
                  </span>
                  <div className="flex items-center gap-2">
                    <Clock size={14} aria-hidden="true" />
                    <span>{getReadingTime(post.description)} min</span>
                  </div>
                </div>
                <h2
                  className={`text-xl sm:text-2xl font-semibold mb-3 group-hover:text-teal-400 transition-colors ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {post.title}
                </h2>
                <p
                  className={`mb-4 line-clamp-3 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {post.description}
                </p>
                <div className="flex items-center justify-between mt-6">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePostClick(post.slug);
                    }}
                    className={`flex items-center gap-2 ${
                      theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                    }`}
                    tabIndex={0}
                    role="button"
                    aria-label={`Przeczytaj więcej: ${post.title}`}
                    onKeyPress={(e) =>
                      e.key === 'Enter' && handlePostClick(post.slug)
                    }
                  >
                    Czytaj więcej <ArrowRight size={16} aria-hidden="true" />
                  </motion.div>
                  <motion.button
                    onClick={(e) => handleShare(e, post)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                      theme === 'dark'
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    aria-label={`Udostępnij artykuł: ${post.title}`}
                  >
                    <Share2 size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {[1, 2, 3].map((n) => (
              <motion.div
                key={n}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`h-[300px] rounded-lg ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                } animate-pulse`}
                aria-hidden="true"
              />
            ))}
          </div>
        )}

        <div ref={sentinelRef} className="h-10" />

        {/* Sekcja rekomendacji */}
        {recommendedPosts.length > 0 && (
          <motion.div
            className="mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2
              className={`text-2xl font-bold mb-6 text-center ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              Polecane dla Ciebie
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {recommendedPosts.map((post) => (
                <motion.div
                  key={post.slug}
                  variants={cardHover}
                  whileHover="hover"
                  onClick={() => handlePostClick(post.slug)}
                  className={`p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800/80' : 'bg-white'
                  } border shadow-md cursor-pointer`}
                >
                  <h3
                    className={`text-lg font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {post.title}
                  </h3>
                  <p
                    className={`mt-2 text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {post.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
