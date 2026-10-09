import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Logo } from '../brand/Logo';

export function Sidebar() {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const MAIN_NAV = [
    { path: '/',        label: t('nav_home'),     icon: 'bi-house' },
    { path: '/quran',   label: t('nav_quran'),    icon: 'bi-book' },
    { path: '/adhkar',  label: t('nav_adhkar'),   icon: 'bi-sun' },
    { path: '/duas',    label: t('nav_duas'),     icon: 'bi-hand-thumbs-up' },
    { path: '/hadith',  label: t('nav_hadith'),   icon: 'bi-journal-text' },
    { path: '/prayer',  label: t('nav_prayer'),   icon: 'bi-clock-history' },
    { path: '/qibla',   label: t('nav_qibla'),    icon: 'bi-compass' },
    { path: '/mosques', label: t('nav_mosques'),  icon: 'bi-building' },
    { path: '/tasbeeh', label: t('nav_tasbeeh'),  icon: 'bi-circle' },
    { path: '/names',   label: t('nav_names'),    icon: 'bi-stars' },
    { path: '/hajj',    label: t('nav_hajj'),     icon: 'bi-signpost' },
    { path: '/library', label: t('nav_library'),  icon: 'bi-collection' },
  ];

  const LEARNING_NAV = [
    { path: '/learn',      label: 'تعلّم',  icon: 'bi-mortarboard' },
    { path: '/my-journey', label: 'رحلتي',  icon: 'bi-signpost-2' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 border-l border-[var(--border)] bg-[var(--card)] sticky top-0 h-screen">
      <div className="p-5 border-b border-[var(--border)] shrink-0">
        <Link to="/" className="flex items-center gap-2">
          <Logo size={28} />
          <div>
            <div className="text-lg font-bold leading-none">{t('app_name')}</div>
            <div className="text-[10px] text-[var(--muted)] mt-1 tracking-widest">MANARA</div>
          </div>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {MAIN_NAV.map(item => {
          const active = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm mb-0.5 transition-colors ${
                active ? 'bg-brand-600 text-white' : 'hover:bg-[var(--bg)]'
              }`}
            >
              <i className={`bi ${item.icon}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="mt-4 mb-2 px-3">
          <div className="text-[10px] text-[var(--muted)] font-semibold tracking-wider uppercase">
            التعلم — اختياري
          </div>
        </div>

        {LEARNING_NAV.map(item => {
          const active = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm mb-0.5 transition-colors ${
                active ? 'bg-brand-600 text-white' : 'hover:bg-[var(--bg)]'
              }`}
            >
              <i className={`bi ${item.icon}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="mt-4 pt-4 border-t border-[var(--border)]">
          <Link
            to="/settings"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              pathname === '/settings' ? 'bg-brand-600 text-white' : 'hover:bg-[var(--bg)]'
            }`}
          >
            <i className="bi bi-gear" />
            <span>{t('nav_settings')}</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
}