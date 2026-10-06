import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LANGS = [
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰' },
  { code: 'id', name: 'Indonesia', flag: '🇮🇩' }
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const current = LANGS.find(l => l.code === i18n.language) || LANGS[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg hover:bg-[var(--card)] flex items-center gap-1"
        aria-label="Language"
      >
        <span className="text-base">{current.flag}</span>
        <i className={`bi bi-chevron-down text-xs transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg z-50 min-w-[160px] overflow-hidden">
          {LANGS.map(lang => (
            <button
              key={lang.code}
              onClick={() => { i18n.changeLanguage(lang.code); setOpen(false); }}
              className={`w-full px-4 py-2.5 text-sm text-right hover:bg-[var(--bg)] flex items-center gap-2 ${
                i18n.language === lang.code ? 'text-brand-600 font-semibold' : ''
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
              {i18n.language === lang.code && <i className="bi bi-check-lg mr-auto" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}