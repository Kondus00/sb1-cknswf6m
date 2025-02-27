import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import frontMatter from 'front-matter';
import { ArrowLeft, Share2, BookOpen, Clock, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import blogPostsData from '../data/blogPosts.json';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

interface PostData {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [post, setPost] = useState<PostData | null>(null);
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendedPosts, setRecommendedPosts] = useState<PostData[]>([]);
  const articleRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ['start start', 'end start'],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) =>
      setReadingProgress(Math.round(v * 100))
    );
    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    const loadPost = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const postData = blogPostsData.find((p) => p.slug === slug);
        if (!postData) throw new Error('Post nie znaleziony');

        try {
          const markdownFile = await import(`../content/blog/${slug}.md?raw`);
          const content = markdownFile.default;
          const { attributes, body } = frontMatter<PostData>(content);
          setPost({ ...postData, content: body });
        } catch (mdError) {
          console.error('Błąd ładowania Markdown:', mdError);
          setPost(postData); // Fallback do JSON
        }

        // Ustalanie rekomendacji raz przy ładowaniu
        const recs = blogPostsData
          .filter((p) => p.slug !== slug)
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);
        setRecommendedPosts(recs);
      } catch (fetchError) {
        console.error('Błąd pobierania posta:', fetchError);
        setError(fetchError.message);
        setPost(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadPost();
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Przewijanie na górę
  }, [slug]);

  const estimateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  const sharePost = async () => {
    if (!post) return;
    try {
      await navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      });
    } catch (err) {
      console.error('Sharing failed:', err);
    }
  };

  if (isLoading) {
    return (
      <motion.div
        className={`min-h-screen ${
          theme === 'dark'
            ? 'bg-gray-900 text-white'
            : 'bg-gray-50 text-gray-900'
        } flex items-center justify-center`}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        aria-label="Ładowanie artykułu"
      >
        <div className="animate-pulse flex items-center gap-2">
          <span>Ładowanie...</span>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className={`min-h-screen ${
          theme === 'dark'
            ? 'bg-gray-900 text-white'
            : 'bg-gray-50 text-gray-900'
        } flex items-center justify-center`}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        aria-label="Błąd ładowania artykułu"
      >
        <p className="text-center">
          {error}.{' '}
          <button
            onClick={() => window.location.reload()}
            className="text-teal-400 hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Odśwież stronę
          </button>
        </p>
      </motion.div>
    );
  }

  if (!post) {
    return (
      <motion.div
        className={`min-h-screen ${
          theme === 'dark'
            ? 'bg-gray-900 text-white'
            : 'bg-gray-50 text-gray-900'
        } flex items-center justify-center`}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        aria-label="Artykuł nie znaleziony"
      >
        Post nie znaleziony
      </motion.div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300'
          : 'bg-gradient-to-b from-gray-50 to-white text-gray-800'
      }`}
      aria-label={`Artykuł: ${post.title}`}
    >
      {/* Pasek postępu przewijania */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-teal-500 transform-origin-0 z-50"
        style={{ scaleX }}
        aria-hidden="true"
        title="Pasek postępu przewijania"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24" role="main">
        {/* Nagłówek artykułu */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <motion.button
              onClick={() => navigate('/blog')}
              className={`flex items-center gap-2 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              } hover:text-teal-400 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500`}
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Powrót do listy blogów"
            >
              <ArrowLeft size={20} aria-hidden="true" />
              Wróć do bloga
            </motion.button>

            <div className="flex items-center gap-4">
              <motion.button
                onClick={sharePost}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                aria-label={`Udostępnij artykuł: ${post.title}`}
              >
                <Share2 size={20} />
              </motion.button>
            </div>
          </div>

          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Clock size={16} aria-hidden="true" />
              <span>{estimateReadingTime(post.content)} min czytania</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={16} aria-hidden="true" />
              <span>{readingProgress}% przeczytane</span>
            </div>
            <span
              className={theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}
            >
              {new Date(post.date).toLocaleDateString('pl-PL')}
            </span>
          </div>
        </motion.header>

        {/* Treść artykułu */}
        <motion.article
          ref={articleRef}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className={`prose ${
            theme === 'dark' ? 'prose-invert' : ''
          } max-w-none`}
          role="article"
          aria-label={`Treść artykułu: ${post.title}`}
        >
          <ReactMarkdown
            components={{
              p: ({ node, children }) => {
                const hasImg = node.children.some(
                  (child) => child.type === 'image'
                );
                if (hasImg) return <>{children}</>;
                return (
                  <div
                    className={`mb-6 leading-relaxed ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {children}
                  </div>
                );
              },
              h2: ({ children }) => (
                <h2
                  className={`text-2xl font-bold mt-12 mb-6 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {children}
                </h2>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-teal-400 hover:text-teal-300 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Link do: ${children}`}
                >
                  {children}
                </a>
              ),
              img: ({ src, alt }) => (
                <figure className="my-8">
                  <img
                    src={src}
                    alt={alt || 'Ilustracja artykułu'}
                    className="rounded-xl shadow-lg w-full"
                    loading="lazy"
                  />
                  {alt && (
                    <figcaption className="text-sm text-center mt-2 text-gray-500">
                      {alt}
                    </figcaption>
                  )}
                </figure>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </motion.article>

        {/* Social proof i rekomendacje */}
        <motion.div
          className="mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <p
            className={`text-center text-sm ${
              theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
            } mb-8`}
          >
            Dołącz do pionierów AI i odkrywaj więcej z DialogAI!
          </p>
          <h2
            className={`text-2xl font-bold mb-6 text-center ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Polecane artykuły
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {recommendedPosts.map((rec) => (
              <motion.div
                key={rec.slug}
                className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800/80' : 'bg-white'
                } border shadow-md cursor-pointer`}
                whileHover={{ scale: 1.03, y: -5 }}
                onClick={() => navigate(`/blog/${rec.slug}`)}
              >
                <h3
                  className={`text-lg font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {rec.title}
                </h3>
                <p
                  className={`mt-2 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {rec.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
