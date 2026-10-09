import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../providers/ThemeProvider';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { Logo } from '../brand/Logo';

export function Header() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-30 bg-[var(--bg)]/85 backdrop-blur-md border-b border-[var(--border)]">
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between px-3 sm:px-4 md:px-8 h-14">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <Logo size={22} />
          <span className="font-bold text-sm sm:text-base truncate">
            {t('app_name')}
          </span>
        </Link>
        <div className="flex items-center gap-0.5 sm:gap-1">
          <LanguageSwitcher />
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="تبديل المظهر"
            className="p-2 rounded-lg hover:bg-[var(--card)] transition"
          >
            <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon'}`} />
          </button>
          <Link
            to="/settings"
            aria-label="الإعدادات"
            className="p-2 rounded-lg hover:bg-[var(--card)] transition"
          >
            <i className="bi bi-gear" />
          </Link>
        </div>
      </div>
    </header>
  );
}