import React, { useState } from 'react';
import { ChevronDown, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  disabled?: boolean;
}

const LANGUAGES = [
  { id: 'java',       name: 'Java',       ext: '.java', color: 'text-orange-400' },
  { id: 'javascript', name: 'JavaScript', ext: '.js',   color: 'text-yellow-400' },
  { id: 'typescript', name: 'TypeScript', ext: '.ts',   color: 'text-blue-400'   },
  { id: 'python',     name: 'Python',     ext: '.py',   color: 'text-cyan-400'   },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLang =
    LANGUAGES.find((l) => l.id === currentLanguage?.toLowerCase()) ||
    LANGUAGES.find((l) => l.id === 'java')!;

  const handleSelect = (langId: string) => {
    if (disabled) return;
    onLanguageChange(langId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex items-center gap-2 px-3 py-1.5 bg-brand-bg-sec/55 border border-brand-border rounded-lg text-xs font-semibold text-brand-primary placeholder:text-brand-secondary/40 focus:outline-none hover:bg-brand-surface/40 hover:border-brand-blue/30 transition-all duration-200 cursor-pointer ${
          disabled ? 'opacity-55 cursor-not-allowed' : ''
        }`}
      >
        <Code2 size={14} className="text-brand-blue" />
        <span className={selectedLang.color}>{selectedLang.name}</span>
        <ChevronDown size={12} className={`text-brand-secondary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <>
            {/* Click-away backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute right-0 mt-2 w-44 rounded-lg glassmorphism overflow-hidden z-50 shadow-[0_0_20px_rgba(11,15,20,0.5)] border border-brand-border bg-brand-bg-sec/90"
            >
              <div className="py-1 flex flex-col">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => handleSelect(lang.id)}
                    className={`px-4 py-2 text-xs flex items-center justify-between text-left hover:bg-brand-surface/65 hover:text-white transition-colors duration-150 cursor-pointer ${
                      lang.id === selectedLang.id ? 'bg-brand-blue/10 text-white font-semibold' : 'text-brand-secondary'
                    }`}
                  >
                    <span className={lang.color}>{lang.name}</span>
                    <span className="text-[10px] text-brand-secondary/50 font-jetbrains-mono">{lang.ext}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
