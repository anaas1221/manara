import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePrayerTimes, formatTime12 } from '../lib/hooks/usePrayerTimes';
import { useNextPrayerCountdown } from '../lib/hooks/useNextPrayerCountdown';
import { db } from '../lib/db';

const PRAYER_LABELS: Record<string,string> = {
  Fajr:'الفجر', Sunrise:'الشروق', Dhuhr:'الظهر',
  Asr:'العصر', Maghrib:'المغرب', Isha:'العشاء'
};

export default function Home() {
  const { data, city, loading } = usePrayerTimes();
  const next = useNextPrayerCountdown(data);
  const [tasbeeh, setTasbeeh] = useState(0);
  const [lastRead, setLastRead] = useState<{ surah: number; ayah: number } | null>(null);

  useEffect(() => {
    db.progress.get('quran').then(p => p && setLastRead({ surah: p.surah, ayah: p.ayah }));
    const today = new Date().toISOString().slice(0, 10);
    db.tasbeeh.where('date').equals(today).toArray()
      .then(rows => setTasbeeh(rows.reduce((s, r) => s + r.count, 0)));
  }, []);

  const hijri = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(new Date());
  const greg = new Intl.DateTimeFormat('ar-EG', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  }).format(new Date());

  return (
    <div className="space-y-6">
      <section className="card p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 bg-brand-500/10 rounded-full -translate-x-20 -translate-y-20" />
        <p className="text-sm text-[var(--muted)]">{greg}</p>
        <h1 className="text-2xl font-bold mt-1">{hijri}</h1>
        {city && <p className="text-xs text-[var(--muted)] mt-1"><i className="bi bi-geo-alt" /> {city}</p>}
      </section>

      <section className="card p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[var(--muted)]">الصلاة القادمة</p>
            <h2 className="text-3xl font-bold mt-1">{next?.name ?? (loading ? '…' : '—')}</h2>
            <p className="text-brand-600 font-semibold mt-1">{next?.time ?? ''}</p>
          </div>
          <div className="text-left">
            <p className="text-xs text-[var(--muted)]">متبقي</p>
            <p className="font-mono text-lg tabular-nums">{next?.remaining ?? '--:--:--'}</p>
          </div>
        </div>
        {data && (
          <div className="grid grid-cols-5 gap-2 mt-5 text-center text-xs">
            {Object.entries(data.timings).map(([k, v]) => (
              <div key={k} className="py-2 rounded-lg bg-[var(--bg)]">
                <div className="text-[var(--muted)]">{PRAYER_LABELS[k]}</div>
                <div className="font-semibold mt-1 tabular-nums">{formatTime12(v)}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Link to="/quran" className="card p-4 hover:border-brand-500 transition">
          <i className="bi bi-book text-2xl text-brand-600" />
          <p className="mt-3 text-sm text-[var(--muted)]">آخر قراءة</p>
          <p className="font-semibold">{lastRead ? `سورة ${lastRead.surah} — آية ${lastRead.ayah}` : 'ابدأ القراءة'}</p>
        </Link>
        <Link to="/tasbeeh" className="card p-4 hover:border-brand-500 transition">
          <i className="bi bi-circle text-2xl text-brand-600" />
          <p className="mt-3 text-sm text-[var(--muted)]">السبحة</p>
          <p className="font-semibold">{tasbeeh}</p>
        </Link>
        <Link to="/adhkar/morning" className="card p-4 hover:border-brand-500 transition">
          <i className="bi bi-sun text-2xl text-brand-600" />
          <p className="mt-3 text-sm text-[var(--muted)]">أذكار الصباح</p>
          <p className="font-semibold">ابدأ الجلسة</p>
        </Link>
        <Link to="/qibla" className="card p-4 hover:border-brand-500 transition">
          <i className="bi bi-compass text-2xl text-brand-600" />
          <p className="mt-3 text-sm text-[var(--muted)]">القبلة</p>
          <p className="font-semibold">اتجاه القبلة</p>
        </Link>
        <Link to="/prayer" className="card p-4 hover:border-brand-500 transition">
          <i className="bi bi-clock-history text-2xl text-brand-600" />
          <p className="mt-3 text-sm text-[var(--muted)]">صلاتي</p>
          <p className="font-semibold">تابع صلواتك</p>
        </Link>
        <Link to="/names" className="card p-4 hover:border-brand-500 transition">
          <i className="bi bi-stars text-2xl text-brand-600" />
          <p className="mt-3 text-sm text-[var(--muted)]">أسماء الله</p>
          <p className="font-semibold">99 اسمًا</p>
        </Link>
      </section>
    </div>
  );
}