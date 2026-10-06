import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../providers/ThemeProvider';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { Logo } from '../brand/Logo';

export function Header() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-30 bg-[var(--bg)]/80 backdrop-blur border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-8 h-14">
        <Link to="/" className="flex items-center gap-2">
          <Logo size={24} />
          <span className="font-bold text-base">
            {t('app_name')}{' '}
            <span className="text-[var(--muted)] text-xs hidden sm:inline">| MANARA</span>
          </span>
        </Link>
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Theme"
            className="p-2 rounded-lg hover:bg-[var(--card)]"
          >
            <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon'}`} />
          </button>
          <Link to="/settings" aria-label="Settings" className="p-2 rounded-lg hover:bg-[var(--card)]">
            <i className="bi bi-gear" />
          </Link>
        </div>
      </div>
    </header>
  );
}