import { Link, useLocation } from 'react-router-dom';

const ITEMS = [
  { path: '/',         label: 'الرئيسية', icon: 'bi-house' },
  { path: '/learn',    label: 'تعلّم',    icon: 'bi-mortarboard' },
  { path: '/quran',    label: 'القرآن',   icon: 'bi-book' },
  { path: '/adhkar',   label: 'الأذكار',  icon: 'bi-sun' },
  { path: '/settings', label: 'المزيد',   icon: 'bi-grid' }
];

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--card)]/95 backdrop-blur-md border-t border-[var(--border)] pb-[env(safe-area-inset-bottom)]">
      <ul className="grid grid-cols-5 h-16">
        {ITEMS.map(it => {
          const active = pathname === it.path || (it.path !== '/' && pathname.startsWith(it.path));
          return (
            <li key={it.path}>
              <Link
                to={it.path}
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
      </ul>
    </nav>
  );
}