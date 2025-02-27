import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from './context/ThemeContext';
import { motion } from 'framer-motion';

// Fallback dla błędów
function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white flex items-center justify-center text-center p-4"
      role="alert"
      aria-live="polite"
    >
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">
          Ups, coś poszło nie tak!
        </h1>
        <p className="mb-6 text-gray-300">{error.message}</p>
        <motion.button
          onClick={resetErrorBoundary}
          className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-400 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Odśwież stronę po błędzie"
        >
          Spróbuj ponownie
        </motion.button>
        <p className="mt-4 text-sm text-gray-400">
          Problem persists? Napisz do nas:{' '}
          <a
            href="mailto:kontakt@dialogai.pl"
            className="text-teal-400 hover:text-teal-300"
          >
            kontakt@dialogai.pl
          </a>
        </p>
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root not found in the DOM');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) =>
        console.error('Root-level error:', { error, info })
      }
      onReset={() => window.location.reload()} // Reset przez odświeżenie
    >
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);

// Ustawienie motywu na podstawie preferencji użytkownika
const setInitialTheme = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute(
    'data-theme',
    prefersDark ? 'dark' : 'light'
  );
};

// Prefetching zasobów dla optymalizacji
const prefetchResources = () => {
  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = 'https://generativelanguage.googleapis.com'; // API Gemini
  document.head.appendChild(link);
};

// Inicjalizacja przy starcie
setInitialTheme();
prefetchResources();
