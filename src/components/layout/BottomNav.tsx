import { Link, useLocation } from 'react-router-dom';

const ITEMS = [
  { path: '/',         label: 'الرئيسية', icon: 'bi-house' },
  { path: '/quran',    label: 'القرآن',   icon: 'bi-book' },
  { path: '/prayer',   label: 'الصلاة',   icon: 'bi-clock-history' },
  { path: '/adhkar',   label: 'الأذكار',  icon: 'bi-sun' },
  { path: '/settings', label: 'المزيد',   icon: 'bi-grid' }
];

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--card)] border-t border-[var(--border)] pb-[env(safe-area-inset-bottom)]">
      <ul className="grid grid-cols-5">
        {ITEMS.map(it => {
          const active = pathname === it.path || (it.path !== '/' && pathname.startsWith(it.path));
          return (
            <li key={it.path}>
              <Link to={it.path}
                className={`flex flex-col items-center py-2 text-[11px] gap-1 ${
                  active ? 'text-brand-600' : 'text-[var(--muted)]'
                }`}>
                <i className={`bi ${it.icon} text-lg`} />
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}