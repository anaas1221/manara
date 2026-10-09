import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function BottomNav() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const MAIN_ITEMS = [
    { path: '/',       label: t('nav_home'),    icon: 'bi-house' },
    { path: '/quran',  label: t('nav_quran'),   icon: 'bi-book' },
    { path: '/prayer', label: t('nav_prayer'),  icon: 'bi-clock-history' },
    { path: '/adhkar', label: t('nav_adhkar'),  icon: 'bi-sun' },
  ];

  const MORE_ITEMS = [
    { path: '/my-journey', label: t('nav_my_journey'), icon: 'bi-signpost-2' },
    { path: '/learn',      label: t('nav_learn'),      icon: 'bi-mortarboard' },
    { path: '/duas',       label: t('nav_duas'),       icon: 'bi-hand-thumbs-up' },
    { path: '/hadith',     label: t('nav_hadith'),     icon: 'bi-journal-text' },
    { path: '/qibla',      label: t('nav_qibla'),      icon: 'bi-compass' },
    { path: '/mosques',    label: t('nav_mosques'),    icon: 'bi-building' },
    { path: '/tasbeeh',    label: t('nav_tasbeeh'),    icon: 'bi-circle' },
    { path: '/names',      label: t('nav_names'),      icon: 'bi-stars' },
    { path: '/hajj',       label: t('nav_hajj'),       icon: 'bi-signpost' },
    { path: '/settings',   label: t('nav_settings'),   icon: 'bi-gear' },
  ];

  const isMoreActive = MORE_ITEMS.some(
    it => pathname === it.path || (it.path !== '/' && pathname.startsWith(it.path))
  );

  return (
    <>
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--card)]/95 backdrop-blur-md border-t border-[var(--border)] pb-[env(safe-area-inset-bottom)]">
        <ul className="grid grid-cols-5 h-16">
          {MAIN_ITEMS.map(it => {
            const active = pathname === it.path || (it.path !== '/' && pathname.startsWith(it.path));
            return (
              <li key={it.path}>
                <Link
                  to={it.path}
                  onClick={() => setDrawerOpen(false)}
                  className={`flex flex-col items-center justify-center h-full text-[10px] gap-1 transition-colors ${
                    active ? 'text-brand-600' : 'text-[var(--muted)]'
                  }`}
                >
                  <i className={`bi ${it.icon} text-xl`} />
                  <span>{it.label}</span>
                </Link>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className={`flex flex-col items-center justify-center h-full w-full text-[10px] gap-1 transition-colors ${
                isMoreActive || drawerOpen ? 'text-brand-600' : 'text-[var(--muted)]'
              }`}
            >
              <i className="bi bi-grid text-xl" />
              <span>{t('nav_more')}</span>
            </button>
          </li>
        </ul>
      </nav>

      {drawerOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/60"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="md:hidden fixed bottom-16 inset-x-0 z-50 bg-[var(--card)] border-t border-[var(--border)] rounded-t-2xl max-h-[75vh] overflow-y-auto pb-4">
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">{t('nav_all_sections')}</h3>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-lg hover:bg-[var(--bg)]"
                  aria-label={t('close')}
                >
                  <i className="bi bi-x-lg" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {MORE_ITEMS.map(it => {
                  const active = pathname === it.path || (it.path !== '/' && pathname.startsWith(it.path));
                  return (
                    <Link
                      key={it.path}
                      to={it.path}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl transition text-xs ${
                        active ? 'bg-brand-600 text-white' : 'hover:bg-[var(--bg)]'
                      }`}
                    >
                      <i className={`bi ${it.icon} text-2xl`} />
                      <span>{it.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}