import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADHKAR_CATEGORIES } from '../content/adhkar';
import { ls } from '../lib/storage';

interface TodayProgress {
  date: string;
  categories: Record<string, boolean>;
}

export default function Adhkar() {
  const navigate = useNavigate();
  const [completedToday, setCompletedToday] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const stored = ls.get<TodayProgress>('adhkar-today', { date: '', categories: {} });
    if (stored.date === today) {
      setCompletedToday(stored.categories);
    } else {
      const fresh: TodayProgress = { date: today, categories: {} };
      ls.set('adhkar-today', fresh);
      setCompletedToday({});
    }
  }, []);

  const completedCount = Object.values(completedToday).filter(Boolean).length;
  const totalCount = ADHKAR_CATEGORIES.length;

  // فتح عادي — كل الأذكار
  const openFree = (slug: string) => navigate(`/adhkar/${slug}`);
  // فتح بتحدي — مع شاشة تحديد الهدف
  const openChallenge = (slug: string) => navigate(`/adhkar/${slug}?setup=1`);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">الأذكار</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          اختر الفئة لبدء جلسة الأذكار
        </p>
      </div>

      {/* شريط التقدم اليومي */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">
            <i className="bi bi-calendar-check text-brand-600" /> ورد اليوم
          </span>
          <span className="text-sm text-[var(--muted)]">
            {completedCount} / {totalCount}
          </span>
        </div>
        <div className="h-2 bg-[var(--bg)] rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-600 transition-all duration-500"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
        {completedCount === totalCount && (
          <p className="text-xs text-brand-600 mt-2 text-center">
            <i className="bi bi-check-circle-fill" /> ما شاء الله — أتممت وردك اليوم
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ADHKAR_CATEGORIES.map(cat => {
          const done = completedToday[cat.slug];
          return (
            <div
              key={cat.slug}
              className={`card p-5 flex flex-col gap-3 relative ${
                done ? 'border-brand-500/60 bg-brand-50/30 dark:bg-brand-900/10' : ''
              }`}
            >
              {done && (
                <span className="absolute top-3 left-3 text-brand-600">
                  <i className="bi bi-check-circle-fill text-lg" />
                </span>
              )}

              {/* الجزء القابل للضغط — القراءة الحرة */}
              <button
                onClick={() => openFree(cat.slug)}
                className="flex items-start gap-3 text-right w-full group"
                aria-label={`اقرأ ${cat.title}`}
              >
                <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center shrink-0 group-hover:bg-brand-100 dark:group-hover:bg-brand-900/50 transition">
                  <i className={`bi ${cat.icon} text-2xl text-brand-600`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold leading-tight group-hover:text-brand-600 transition">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-[var(--muted)] leading-tight mt-1">
                    {cat.description}
                  </p>
                  <p className="text-[10px] text-brand-600 mt-2">
                    <i className="bi bi-list-check" /> {cat.adhkar.length} ذكر ·{' '}
                    <span className="group-hover:underline">اضغط للقراءة</span>
                  </p>
                </div>
              </button>

              {/* أزرار منفصلة */}
              <div className="grid grid-cols-2 gap-2 mt-auto pt-2 border-t border-[var(--border)]">
                <button
                  onClick={() => openFree(cat.slug)}
                  className="py-2 rounded-lg border border-[var(--border)] text-xs font-semibold hover:bg-[var(--bg)] transition flex items-center justify-center gap-1"
                >
                  <i className="bi bi-book" /> اقرأ
                </button>
                <button
                  onClick={() => openChallenge(cat.slug)}
                  className="py-2 rounded-lg bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 transition flex items-center justify-center gap-1"
                >
                  <i className="bi bi-bullseye" /> ابدأ
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>  
  );
}