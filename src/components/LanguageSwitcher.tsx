import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import { Globe, Check, ChevronDown } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const options: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'lo', label: 'ພາສາລາວ', flag: '🇱🇦' },
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  ];

  const currentOption = options.find(o => o.code === language) || options[0];

  return (
    <div className="relative inline-block text-left" id="lang-switcher">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-200 cursor-pointer bg-white"
      >
        <Globe size={16} className="text-slate-500" />
        <span className="flex items-center gap-1.5">
          <span>{currentOption.flag}</span>
          <span className="hidden md:inline text-slate-700">{currentOption.label}</span>
        </span>
        <ChevronDown size={14} className="text-slate-400" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden divide-y divide-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="py-1">
              {options.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => {
                    setLanguage(opt.code);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer hover:bg-slate-50 ${
                    language === opt.code
                      ? 'text-emerald-600 bg-emerald-50/40'
                      : 'text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{opt.flag}</span>
                    <span>{opt.label}</span>
                  </span>
                  {language === opt.code && <Check size={16} className="text-emerald-600" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
