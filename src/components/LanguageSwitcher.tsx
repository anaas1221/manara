import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Lang {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
}

const LANGS: Lang[] = [
  { code: 'ar', name: 'Arabic',     nativeName: 'العربية',    flag: '🇸🇦', rtl: true },
  { code: 'en', name: 'English',    nativeName: 'English',    flag: '🇬🇧' },
  { code: 'fr', name: 'French',     nativeName: 'Français',   flag: '🇫🇷' },
  { code: 'tr', name: 'Turkish',    nativeName: 'Türkçe',     flag: '🇹🇷' },
  { code: 'ur', name: 'Urdu',       nativeName: 'اردو',       flag: '🇵🇰', rtl: true },
  { code: 'id', name: 'Indonesian', nativeName: 'Indonesia',  flag: '🇮🇩' },
  { code: 'bn', name: 'Bengali',    nativeName: 'বাংলা',       flag: '🇧🇩' },
  { code: 'fa', name: 'Persian',    nativeName: 'فارسی',      flag: '🇮🇷', rtl: true },
  { code: 'es', name: 'Spanish',    nativeName: 'Español',    flag: '🇪🇸' },
  { code: 'de', name: 'German',     nativeName: 'Deutsch',    flag: '🇩🇪' },
  { code: 'ru', name: 'Russian',    nativeName: 'Русский',    flag: '🇷🇺' },
  { code: 'hi', name: 'Hindi',      nativeName: 'हिन्दी',      flag: '🇮🇳' },
  { code: 'ms', name: 'Malay',      nativeName: 'Melayu',     flag: '🇲🇾' },
  { code: 'zh', name: 'Chinese',    nativeName: '中文',        flag: '🇨🇳' },
  { code: 'sw', name: 'Swahili',    nativeName: 'Kiswahili',  flag: '🇰🇪' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português',  flag: '🇵🇹' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const currentLang = LANGS.find(l => l.code === i18n.language.split('-')[0]) || LANGS[0];

  const filteredLangs = search.trim()
    ? LANGS.filter(l =>
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.nativeName.includes(search) ||
        l.code.toLowerCase().includes(search.toLowerCase())
      )
    : LANGS;

  const changeLang = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
    setSearch('');
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg hover:bg-[var(--card)] flex items-center gap-1 transition"
        aria-label="Change language"
        title={currentLang.nativeName}
      >
        <span className="text-base leading-none">{currentLang.flag}</span>
        <i className={`bi bi-chevron-down text-[10px] transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-2xl z-50 w-72 overflow-hidden">
          <div className="p-2 border-b border-[var(--border)]">
            <div className="relative">
              <i className="bi bi-search absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--muted)]" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search languages..."
                className="w-full pr-8 pl-3 py-2 rounded-lg bg-[var(--bg)] text-xs outline-none focus:ring-1 focus:ring-brand-500"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto py-1">
            {filteredLangs.length === 0 ? (
              <p className="text-center text-xs text-[var(--muted)] py-4">
                No results
              </p>
            ) : (
              filteredLangs.map(lang => {
                const isActive = i18n.language.split('-')[0] === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => changeLang(lang.code)}
                    className={`w-full px-3 py-2.5 text-sm flex items-center gap-3 transition hover:bg-[var(--bg)] ${
                      isActive ? 'bg-brand-50 dark:bg-brand-900/20 font-semibold' : ''
                    }`}
                  >
                    <span className="text-xl leading-none">{lang.flag}</span>
                    <div className="flex-1 text-right min-w-0">
                      <div className={`leading-tight ${isActive ? 'text-brand-600' : ''}`}>
                        {lang.nativeName}
                      </div>
                      <div className="text-[10px] text-[var(--muted)] leading-tight">
                        {lang.name}
                      </div>
                    </div>
                    {isActive && <i className="bi bi-check-lg text-brand-600 text-base shrink-0" />}
                    {lang.rtl && !isActive && (
                      <span className="text-[9px] text-[var(--muted)] px-1.5 py-0.5 rounded bg-[var(--bg)] shrink-0">
                        RTL
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>

          <div className="border-t border-[var(--border)] p-2 text-center">
            <span className="text-[10px] text-[var(--muted)]">
              {LANGS.length} languages
            </span>
          </div>
        </div>
      )}
    </div>
  );
}