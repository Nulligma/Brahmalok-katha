import React from 'react';
import { Language } from '../types';
import { LANGUAGES } from '../constants';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <div className="bg-slate-900/40 backdrop-blur-md rounded-full p-2 border border-white/10 flex flex-wrap justify-center gap-1 z-40 shadow-lg max-w-full mx-auto">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onLanguageChange(lang.code)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedLanguage === lang.code
              ? 'bg-amber-600 text-white shadow-[0_0_10px_rgba(245,158,11,0.4)]'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
        >
          {lang.nativeName}
        </button>
      ))}
    </div>
  );
};