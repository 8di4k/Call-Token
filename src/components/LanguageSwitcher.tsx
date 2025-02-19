import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200 hover:border-primary/20 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Change language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-gray-700">
          {language.toUpperCase()}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 py-2 w-32 bg-white rounded-xl shadow-lg border border-gray-100"
            role="listbox"
            onMouseLeave={() => setIsOpen(false)}
          >
            {/* ENGLISH */}
            <button
              onClick={() => {
                setLanguage('en');
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-orange-50 flex items-center gap-2 ${
                language === 'en' ? 'text-primary font-medium' : 'text-gray-600'
              }`}
              role="option"
              aria-selected={language === 'en'}
              aria-label="Switch to English"
            >
              <span className="w-5 h-5 rounded-full overflow-hidden inline-flex items-center justify-center bg-gray-100">
                🇬🇧
              </span>
              English
            </button>

            {/* RUSSIAN */}
            <button
              onClick={() => {
                setLanguage('ru');
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-orange-50 flex items-center gap-2 ${
                language === 'ru' ? 'text-primary font-medium' : 'text-gray-600'
              }`}
              role="option"
              aria-selected={language === 'ru'}
              aria-label="Switch to Russian"
            >
              <span className="w-5 h-5 rounded-full overflow-hidden inline-flex items-center justify-center bg-gray-100">
                🇷🇺
              </span>
              Русский
            </button>

            {/* KAZAKH */}
            <button
              onClick={() => {
                setLanguage('kz');
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-orange-50 flex items-center gap-2 ${
                language === 'kz' ? 'text-primary font-medium' : 'text-gray-600'
              }`}
              role="option"
              aria-selected={language === 'kz'}
              aria-label="Switch to Kazakh"
            >
              <span className="w-5 h-5 rounded-full overflow-hidden inline-flex items-center justify-center bg-gray-100">
                🇰🇿
              </span>
              Қазақша
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
