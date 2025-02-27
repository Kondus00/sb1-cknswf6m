import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, Bot, ChevronDown } from 'lucide-react';
import { Suspense, useState, useEffect, useRef } from 'react';
import { prompts } from '../config/prompts';
import { useTheme } from '../context/ThemeContext';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const floatUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: 'easeOut', delay: 0.2 },
  },
};

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function HeroSection() {
  const initialMessages: Message[] = [
    { role: 'model', text: 'Witaj! Jak mogę pomóc w Twoim biznesie?' },
  ];
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isChatActive, setIsChatActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const transformX = useTransform(mouseX, [-300, 300], [-30, 30]);
  const transformY = useTransform(mouseY, [-300, 300], [-30, 30]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const scrollToChatInput = () => {
    const chatContainer = document.querySelector('#chat-container');
    if (chatContainer && inputRef.current) {
      chatContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      inputRef.current.focus();
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const context = newMessages.map((m) => `${m.role}: ${m.text}`).join('\n');
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${
          import.meta.env.VITE_GEMINI_API_KEY
        }`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: context }] }],
            generationConfig: {
              temperature: 1,
              topP: 0.95,
              topK: 40,
              maxOutputTokens: 8192,
              responseMimeType: 'text/plain',
            },
            systemInstruction: { parts: [{ text: prompts.systemInstruction }] },
          }),
        }
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text || 'Brak odpowiedzi';
      setMessages([...newMessages, { role: 'model', text: reply }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: 'model', text: 'Wystąpił błąd. Spróbuj ponownie.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages(initialMessages);
    setInput('');
    setLoading(false);
    setIsChatActive(false);
  };

  useEffect(() => {
    if (chatWindowRef.current)
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [messages]);

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center pt-20 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-gray-900 to-gray-950'
          : 'bg-gradient-to-b from-gray-50 to-white'
      } relative overflow-hidden`}
      onMouseMove={handleMouseMove}
      aria-label="Sekcja główna DialogAI – automatyzacja z AI"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          theme === 'dark'
            ? 'from-teal-500/10 via-gray-900 to-gray-800'
            : 'from-teal-200/10 via-gray-50 to-gray-100'
        } pointer-events-none`}
      />
      <div className="absolute top-0 left-0 w-72 h-72 bg-teal-400/20 rounded-full filter blur-3xl animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:px-8 z-10">
        <motion.div
          className="pt-4 text-center lg:text-left"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.div initial="hidden" animate="visible" variants={floatUp}>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className={`inline-flex items-center space-x-4 text-sm font-medium ${
                theme === 'dark'
                  ? 'text-gray-300 hover:text-teal-300'
                  : 'text-gray-900 hover:text-teal-700' // Zmieniony na ciemniejszy gray w jasnym motywie
              } transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500`}
              aria-label="Poznaj nasze rozwiązania w sekcji kontakt"
            >
              <span
                className={`rounded-full px-3 py-1 shadow-md ${
                  theme === 'dark'
                    ? 'bg-teal-500/30 text-teal-200'
                    : 'bg-teal-600/30 text-teal-800' // Zmieniony na ciemniejszy teal w jasnym motywie
                }`}
              >
                Nowość
              </span>
              <span className="flex items-center">
                Poznaj nasze rozwiązania
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </a>
          </motion.div>
          <motion.h1
            className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight lg:text-5xl"
            initial="hidden"
            animate="visible"
            variants={floatUp}
            transition={{ delay: 0.3 }}
          >
            Zrewolucjonizuj biznes z{' '}
            <span
              className={`${
                theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
              }`}
            >
              DialogAI
            </span>
          </motion.h1>
          <motion.p
            className="mt-6 text-base sm:text-lg leading-8 text-${
              theme === 'dark' ? 'gray-300' : 'gray-700'
            }"
            initial="hidden"
            animate="visible"
            variants={floatUp}
            transition={{ delay: 0.4 }}
          >
            Odkryj, jak analiza danych, automatyzacja i konsulting AI mogą
            wspierać Twój biznes na wczesnym etapie – od e-commerce po małe
            przedsiębiorstwa.
          </motion.p>
          {/* Social proof (realistyczne, bez big numbers) */}
          <motion.div
            className="mt-6 text-sm text-${
              theme === 'dark' ? 'gray-400' : 'gray-600'
            }"
            initial="hidden"
            animate="visible"
            variants={floatUp}
            transition={{ delay: 0.5 }}
          >
            Zaufaj pionierom AI – wspieramy pierwsze firmy w transformacji
            biznesu!
          </motion.div>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
            initial="hidden"
            animate="visible"
            variants={floatUp}
            transition={{ delay: 0.6 }}
          >
            <motion.a
              href="#chat"
              onClick={(e) => {
                e.preventDefault();
                scrollToChatInput();
              }}
              className={`rounded-md ${
                theme === 'dark'
                  ? 'bg-teal-500 hover:bg-teal-400'
                  : 'bg-teal-600 hover:bg-teal-500'
              } px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500`}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Wypróbuj darmowe demo chatbota"
            >
              Darmowe demo
            </motion.a>
            <motion.a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#services');
              }}
              className={`text-sm font-semibold ${
                theme === 'dark'
                  ? 'text-gray-300 hover:text-teal-300'
                  : 'text-gray-900 hover:text-teal-700' // Zmieniony na ciemniejszy gray w jasnym motywie
              } flex items-center transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500`}
              whileHover={{ x: 5 }}
              aria-label="Dowiedz się więcej o usługach"
            >
              Dowiedz się więcej
              <ChevronDown className="ml-2 h-4 w-4 animate-bounce" />
            </motion.a>
          </motion.div>
        </motion.div>
        <motion.div
          className="mt-12 lg:mt-0 relative"
          initial="hidden"
          animate="visible"
          variants={slideIn}
          onMouseMove={handleMouseMove}
        >
          <motion.div
            className="absolute inset-0 rounded-xl bg-teal-500/20 filter blur-xl"
            animate={{
              x: transformX,
              y: transformY,
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
          />
          <motion.div
            id="chat-container"
            className={`shadow-2xl rounded-xl overflow-hidden ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } p-6 transition-all duration-300 ${
              isChatActive ? 'scale-105 z-20' : 'scale-100'
            }`}
            animate={
              isChatActive
                ? { boxShadow: '0 0 20px rgba(20, 184, 166, 0.5)' }
                : {}
            }
            role="region"
            aria-label="Okno czatu DialogAI"
            aria-live="polite"
          >
            <div
              className={`rounded-lg p-4 border ${
                theme === 'dark'
                  ? 'bg-gray-700/70 border-teal-500/20'
                  : 'bg-gray-100 border-teal-500/10'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <div
                  className={`text-sm font-medium flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  <Suspense fallback={<div className="w-5 h-5" />}>
                    <Bot
                      className={`w-5 h-5 ${
                        theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                      }`}
                      loading="lazy"
                    />
                  </Suspense>
                  DialogAI Chat
                </div>
                <button
                  onClick={resetChat}
                  className={`text-sm transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-teal-300'
                      : 'text-gray-600 hover:text-teal-600'
                  } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  aria-label="Resetuj rozmowę"
                >
                  Reset
                </button>
              </div>
              <div
                ref={chatWindowRef}
                id="chat-window"
                className="space-y-4 max-h-[300px] overflow-y-auto scrollbar-thin"
                tabIndex={0}
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 ${
                      msg.role === 'user' ? 'justify-end' : ''
                    }`}
                  >
                    {msg.role === 'model' && (
                      <Suspense fallback={<div className="w-8 h-8" />}>
                        <Bot
                          className={`w-8 h-8 ${
                            theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                          }`}
                          loading="lazy"
                        />
                      </Suspense>
                    )}
                    <div
                      className={`rounded-lg p-3 text-sm shadow-md ${
                        msg.role === 'user'
                          ? theme === 'dark'
                            ? 'bg-white/10 text-gray-300'
                            : 'bg-gray-200 text-gray-700'
                          : theme === 'dark'
                          ? 'bg-teal-500/20 text-gray-200'
                          : 'bg-teal-500/10 text-gray-800'
                      }`}
                    >
                      {msg.text.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex items-start gap-4">
                    <Bot
                      className={`w-8 h-8 ${
                        theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                      }`}
                    />
                    <div className="bg-teal-500/20 rounded-lg p-3 text-sm text-gray-200">
                      Trwa przetwarzanie...
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4 flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  onFocus={() => setIsChatActive(true)}
                  onBlur={() => setIsChatActive(false)}
                  placeholder="Wpisz wiadomość..."
                  className={`flex-grow ${
                    theme === 'dark'
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-200 text-gray-900'
                  } rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400`}
                  disabled={loading}
                  aria-label="Wpisz wiadomość do chatbota"
                />
                <motion.button
                  onClick={sendMessage}
                  className={`${
                    theme === 'dark'
                      ? 'bg-teal-500 hover:bg-teal-400'
                      : 'bg-teal-600 hover:bg-teal-500'
                  } px-4 py-2 rounded-lg text-white transition-all disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Wyślij wiadomość"
                >
                  Wyślij
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1,
          duration: 1,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        aria-hidden="true"
      >
        <ChevronDown
          className={`w-6 h-6 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          } animate-bounce`}
        />
      </motion.div>
    </section>
  );
}
