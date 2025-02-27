import { motion } from 'framer-motion';
import { Mail, Loader2, AlertCircle, Send, Bot, X } from 'lucide-react';
import { Suspense, useState, useEffect } from 'react';
import { prompts } from '../config/prompts';
import toast, { Toaster } from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const float = {
  animate: {
    y: [0, -5, 0],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

interface FormData {
  name: string;
  email: string;
  message: string;
  industry: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    industry: 'nieruchomości',
  });
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasQuickResponse, setHasQuickResponse] = useState(false);
  const { theme } = useTheme();

  const sanitizeInput = (input: string) => input.replace(/[<>&"']/g, '');

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: sanitizeInput(value) });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setError('Wypełnij wszystkie pola.');
      return;
    }

    const subject = encodeURIComponent(
      `Wiadomość od ${formData.name} z branży ${formData.industry}`
    );
    const body = encodeURIComponent(
      `Imię: ${formData.name}\nEmail: ${formData.email}\nBranża: ${formData.industry}\nWiadomość: ${formData.message}`
    );
    const mailtoLink = `mailto:kontakt@dialogai.pl?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
    toast.success('Wiadomość wysłana! Skontaktujemy się wkrótce.');
    setFormData({
      name: '',
      email: '',
      message: '',
      industry: 'nieruchomości',
    });
    setError(null);
    setResponse(null);
  };

  const handleQuickResponse = async () => {
    if (hasQuickResponse || !formData.message.trim()) {
      setError(
        hasQuickResponse
          ? 'Szybka odpowiedź już wygenerowana.'
          : 'Wpisz wiadomość.'
      );
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const refineResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${
          import.meta.env.VITE_GEMINI_API_KEY
        }`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompts.refineMessage.replace(
                      '{message}',
                      sanitizeInput(formData.message)
                    ),
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.5,
              topP: 0.9,
              topK: 10,
              maxOutputTokens: 150,
              responseMimeType: 'text/plain',
            },
            systemInstruction: { parts: [{ text: prompts.systemInstruction }] },
          }),
        }
      );
      if (!refineResponse.ok)
        throw new Error(`Błąd API: ${refineResponse.status}`);
      const data = await refineResponse.json();
      const refinedMessage =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Nie udało się wygenerować odpowiedzi.';
      setResponse(refinedMessage);
      setHasQuickResponse(true);
      toast.success('Szybka odpowiedź wygenerowana!');
    } catch (err) {
      setError(`Błąd: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const closeResponse = () => {
    setResponse(null);
    setHasQuickResponse(false);
    setError(null);
  };

  return (
    <section
      id="contact"
      className={`min-h-screen flex items-center justify-center py-24 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-gray-900 to-gray-950'
          : 'bg-gradient-to-b from-gray-50 to-gray-100'
      }`}
      aria-label="Sekcja kontaktu DialogAI"
    >
      <Toaster />
      <motion.div
        className="relative w-full max-w-2xl mx-auto px-4 sm:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            theme === 'dark'
              ? 'from-teal-500/10 to-gray-900/10'
              : 'from-teal-200/10 to-gray-100/10'
          } blur-2xl`}
        ></div>

        <motion.div
          className={`relative z-10 p-8 rounded-xl shadow-xl backdrop-blur-md ${
            theme === 'dark'
              ? 'bg-gray-800/80 border-teal-500/30'
              : 'bg-white/80 border-teal-500/20'
          } border flex flex-col items-center`}
          animate={float}
        >
          <Suspense fallback={<div className="w-10 h-10" />}>
            <Mail
              className={`w-10 h-10 mb-6 ${
                theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
              }`}
              loading="lazy"
            />
          </Suspense>
          <h2
            className={`text-2xl sm:text-3xl font-bold mb-8 text-center ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Skontaktuj się z nami
          </h2>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="relative">
              <motion.label
                className={`absolute -top-6 left-2 text-base font-semibold px-2 rounded ${
                  theme === 'dark'
                    ? 'text-teal-200 bg-gray-800/80 text-shadow'
                    : 'text-teal-700 bg-white/80 text-shadow'
                }`}
                animate={{
                  y: formData.name ? -10 : 0,
                  opacity: formData.name ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
              >
                Imię
              </motion.label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Twoje imię"
                className={`w-full p-3 rounded-lg bg-transparent border ${
                  theme === 'dark'
                    ? 'border-teal-500/50 text-white'
                    : 'border-teal-600/50 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400 transition-all duration-300`}
                required
                aria-label="Wpisz swoje imię"
              />
            </div>

            <div className="relative">
              <motion.label
                className={`absolute -top-6 left-2 text-base font-semibold px-2 rounded ${
                  theme === 'dark'
                    ? 'text-teal-200 bg-gray-800/80 text-shadow'
                    : 'text-teal-700 bg-white/80 text-shadow'
                }`}
                animate={{
                  y: formData.email ? -10 : 0,
                  opacity: formData.email ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
              >
                Email
              </motion.label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Twój email"
                className={`w-full p-3 rounded-lg bg-transparent border ${
                  theme === 'dark'
                    ? 'border-teal-500/50 text-white'
                    : 'border-teal-600/50 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400 transition-all duration-300`}
                required
                aria-label="Wpisz swój email"
              />
            </div>

            <div className="relative">
              <motion.label
                className={`absolute -top-6 left-2 text-base font-semibold px-2 rounded ${
                  theme === 'dark'
                    ? 'text-teal-200 bg-gray-800/80 text-shadow'
                    : 'text-teal-700 bg-white/80 text-shadow'
                }`}
                animate={{
                  y: formData.industry !== 'nieruchomości' ? -10 : 0,
                  opacity: formData.industry !== 'nieruchomości' ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
              >
                Branża
              </motion.label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg bg-transparent border ${
                  theme === 'dark'
                    ? 'border-teal-500/50 text-white'
                    : 'border-teal-600/50 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300`}
                required
                aria-label="Wybierz branżę"
              >
                <option value="nieruchomości">Nieruchomości</option>
                <option value="e-commerce">E-commerce</option>
                <option value="opieka zdrowotna">Opieka zdrowotna</option>
                <option value="finanse">Finanse</option>
                <option value="małe przedsiębiorstwa">
                  Małe przedsiębiorstwa
                </option>
                <option value="turystyka">Turystyka</option>
              </select>
            </div>

            <div className="relative">
              <motion.label
                className={`absolute -top-6 left-2 text-base font-semibold px-2 rounded ${
                  theme === 'dark'
                    ? 'text-teal-200 bg-gray-800/80 text-shadow'
                    : 'text-teal-700 bg-white/80 text-shadow'
                }`}
                animate={{
                  y: formData.message ? -10 : 0,
                  opacity: formData.message ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
              >
                Wiadomość
              </motion.label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Twoja wiadomość"
                rows={4}
                className={`w-full p-3 rounded-lg bg-transparent border ${
                  theme === 'dark'
                    ? 'border-teal-500/50 text-white'
                    : 'border-teal-600/50 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400 transition-all duration-300`}
                required
                aria-label="Wpisz swoją wiadomość"
              />
            </div>

            {error && (
              <p className="text-red-400 text-center flex items-center justify-center">
                <AlertCircle className="w-5 h-5 mr-2" /> {error}
              </p>
            )}

            <div className="flex justify-center gap-6">
              <motion.button
                type="submit"
                className={`rounded-lg px-6 py-3 ${
                  theme === 'dark'
                    ? 'bg-teal-500 hover:bg-teal-400'
                    : 'bg-teal-600 hover:bg-teal-500'
                } text-white transition-all duration-300 flex items-center gap-2 shadow-md`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
                aria-label="Wyślij wiadomość"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <Suspense fallback={<div className="w-5 h-5" />}>
                    <Send className="w-5 h-5" loading="lazy" />
                  </Suspense>
                )}
                <span>{isLoading ? 'Wysyłanie...' : 'Wyślij'}</span>
              </motion.button>
              {!hasQuickResponse && (
                <motion.button
                  type="button"
                  onClick={handleQuickResponse}
                  className={`rounded-lg px-6 py-3 ${
                    theme === 'dark'
                      ? 'bg-teal-600 hover:bg-teal-500'
                      : 'bg-teal-700 hover:bg-teal-600'
                  } text-white transition-all duration-300 flex items-center gap-2 shadow-md`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                  aria-label="Generuj szybką odpowiedź"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin w-5 h-5" />
                  ) : (
                    <Suspense fallback={<div className="w-5 h-5" />}>
                      <Bot className="w-5 h-5" loading="lazy" />
                    </Suspense>
                  )}
                  <span>
                    {isLoading ? 'Generowanie...' : 'Szybka odpowiedź'}
                  </span>
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Odpowiedź z przyciskiem zamknięcia */}
        {response && (
          <motion.div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-md p-6 rounded-lg shadow-xl backdrop-blur-md ${
              theme === 'dark'
                ? 'bg-gray-900/90 border-teal-400/40'
                : 'bg-white/90 border-teal-600/30'
            } border`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <motion.button
                onClick={closeResponse}
                className={`absolute top-2 right-2 p-1 rounded-full ${
                  theme === 'dark'
                    ? 'text-gray-400 hover:text-teal-300'
                    : 'text-gray-600 hover:text-teal-500'
                } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Zamknij odpowiedź"
              >
                <Suspense fallback={<div className="w-5 h-5" />}>
                  <X className="w-5 h-5" loading="lazy" />
                </Suspense>
              </motion.button>
              <h3
                className={`text-xl font-semibold text-center mb-4 flex items-center justify-center gap-2 ${
                  theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                }`}
              >
                <Suspense fallback={<div className="w-5 h-5" />}>
                  <Bot className="w-5 h-5" loading="lazy" />
                </Suspense>
                Odpowiedź od AI
              </h3>
              <p
                className={`text-base leading-relaxed text-center ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                }`}
              >
                {response}
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
