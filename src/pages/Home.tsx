import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePrayerTimes, formatTime12 } from '../lib/hooks/usePrayerTimes';
import { useNextPrayerCountdown } from '../lib/hooks/useNextPrayerCountdown';
import { db } from '../lib/db';

const SURAH_NAMES: Record<number, string> = {
  1: 'الفاتحة', 2: 'البقرة', 3: 'آل عمران', 4: 'النساء', 5: 'المائدة',
  6: 'الأنعام', 7: 'الأعراف', 8: 'الأنفال', 9: 'التوبة', 10: 'يونس',
  11: 'هود', 12: 'يوسف', 13: 'الرعد', 14: 'إبراهيم', 15: 'الحجر',
  16: 'النحل', 17: 'الإسراء', 18: 'الكهف', 19: 'مريم', 20: 'طه',
  21: 'الأنبياء', 22: 'الحج', 23: 'المؤمنون', 24: 'النور', 25: 'الفرقان',
  26: 'الشعراء', 27: 'النمل', 28: 'القصص', 29: 'العنكبوت', 30: 'الروم',
  31: 'لقمان', 32: 'السجدة', 33: 'الأحزاب', 34: 'سبأ', 35: 'فاطر',
  36: 'يس', 37: 'الصافات', 38: 'ص', 39: 'الزمر', 40: 'غافر',
  41: 'فصلت', 42: 'الشورى', 43: 'الزخرف', 44: 'الدخان', 45: 'الجاثية',
  46: 'الأحقاف', 47: 'محمد', 48: 'الفتح', 49: 'الحجرات', 50: 'ق',
  51: 'الذاريات', 52: 'الطور', 53: 'النجم', 54: 'القمر', 55: 'الرحمن',
  56: 'الواقعة', 57: 'الحديد', 58: 'المجادلة', 59: 'الحشر', 60: 'الممتحنة',
  61: 'الصف', 62: 'الجمعة', 63: 'المنافقون', 64: 'التغابن', 65: 'الطلاق',
  66: 'التحريم', 67: 'الملك', 68: 'القلم', 69: 'الحاقة', 70: 'المعارج',
  71: 'نوح', 72: 'الجن', 73: 'المزمل', 74: 'المدثر', 75: 'القيامة',
  76: 'الإنسان', 77: 'المرسلات', 78: 'النبأ', 79: 'النازعات', 80: 'عبس',
  81: 'التكوير', 82: 'الانفطار', 83: 'المطففين', 84: 'الانشقاق', 85: 'البروج',
  86: 'الطارق', 87: 'الأعلى', 88: 'الغاشية', 89: 'الفجر', 90: 'البلد',
  91: 'الشمس', 92: 'الليل', 93: 'الضحى', 94: 'الشرح', 95: 'التين',
  96: 'العلق', 97: 'القدر', 98: 'البينة', 99: 'الزلزلة', 100: 'العاديات',
  101: 'القارعة', 102: 'التكاثر', 103: 'العصر', 104: 'الهمزة', 105: 'الفيل',
  106: 'قريش', 107: 'الماعون', 108: 'الكوثر', 109: 'الكافرون', 110: 'النصر',
  111: 'المسد', 112: 'الإخلاص', 113: 'الفلق', 114: 'الناس'
};

export default function Home() {
  const { t, i18n } = useTranslation();
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

  const isArabic = i18n.language === 'ar';

  const hijri = new Intl.DateTimeFormat(isArabic ? 'ar-SA-u-ca-islamic' : 'en-US-u-ca-islamic', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(new Date());
  const greg = new Intl.DateTimeFormat(isArabic ? 'ar-EG' : 'en-US', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  }).format(new Date());

  const lastReadLabel = lastRead
    ? `${t('quran_surah')} ${SURAH_NAMES[lastRead.surah] ?? lastRead.surah} — ${t('quran_ayah')} ${lastRead.ayah}`
    : t('start_reading');

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="card p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 bg-brand-500/10 rounded-full -translate-x-20 -translate-y-20" />
        <p className="text-sm text-[var(--muted)]">{greg}</p>
        <h1 className="text-2xl font-bold mt-1">{hijri}</h1>
        {city && <p className="text-xs text-[var(--muted)] mt-1"><i className="bi bi-geo-alt" /> {city}</p>}
      </section>

      {/* Prayer */}
      <section className="card p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[var(--muted)]">{t('next_prayer')}</p>
            <h2 className="text-3xl font-bold mt-1">{next?.name ?? (loading ? '…' : '—')}</h2>
            <p className="text-brand-600 font-semibold mt-1">{next?.time ?? ''}</p>
          </div>
          <div className="text-left">
            <p className="text-xs text-[var(--muted)]">{t('remaining')}</p>
            <p className="font-mono text-lg tabular-nums">{next?.remaining ?? '--:--:--'}</p>
          </div>
        </div>
        {data && (
          <div className="grid grid-cols-5 gap-2 mt-5 text-center text-xs">
            {Object.entries(data.timings).map(([k, v]) => (
              <div key={k} className="py-2 rounded-lg bg-[var(--bg)]">
                <div className="text-[var(--muted)]">{t(k.toLowerCase())}</div>
                <div className="font-semibold mt-1 tabular-nums">{formatTime12(v)}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quick links */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Link to="/quran" className="card p-4 hover:border-brand-500 transition">
          <i className="bi bi-book text-2xl text-brand-600" />
          <p className="mt-3 text-sm text-[var(--muted)]">{t('home_quick_quran')}</p>
          <p className="font-semibold">{lastReadLabel}</p>
        </Link>
        <Link to="/tasbeeh" className="card p-4 hover:border-brand-500 transition">
          <i className="bi bi-circle text-2xl text-brand-600" />
          <p className="mt-3 text-sm text-[var(--muted)]">{t('nav_tasbeeh')}</p>
          <p className="font-semibold">{tasbeeh}</p>
        </Link>
        <Link to="/adhkar/morning" className="card p-4 hover:border-brand-500 transition">
          <i className="bi bi-sun text-2xl text-brand-600" />
          <p className="mt-3 text-sm text-[var(--muted)]">{t('morning_adhkar')}</p>
          <p className="font-semibold">{t('home_start_session')}</p>
        </Link>
        <Link to="/qibla" className="card p-4 hover:border-brand-500 transition">
          <i className="bi bi-compass text-2xl text-brand-600" />
          <p className="mt-3 text-sm text-[var(--muted)]">{t('nav_qibla')}</p>
          <p className="font-semibold">{t('home_qibla_direction')}</p>
        </Link>
        <Link to="/prayer" className="card p-4 hover:border-brand-500 transition">
          <i className="bi bi-clock-history text-2xl text-brand-600" />
          <p className="mt-3 text-sm text-[var(--muted)]">{t('my_prayer')}</p>
          <p className="font-semibold">{t('track_prayers')}</p>
        </Link>
        <Link to="/names" className="card p-4 hover:border-brand-500 transition">
          <i className="bi bi-stars text-2xl text-brand-600" />
          <p className="mt-3 text-sm text-[var(--muted)]">{t('nav_names')}</p>
          <p className="font-semibold">{t('home_names_count')}</p>
        </Link>
      </section>

      {/* Learning link */}
      <Link
        to="/learn"
        className="card p-4 flex items-center gap-3 hover:border-brand-500 transition group opacity-90"
      >
        <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center shrink-0">
          <i className="bi bi-mortarboard text-xl text-brand-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">{t('home_want_to_learn')}</p>
          <p className="text-xs text-[var(--muted)] mt-0.5">{t('home_learn_desc')}</p>
        </div>
        <i className="bi bi-arrow-left text-[var(--muted)] group-hover:text-brand-600 transition" />
      </Link>
    </div>
  );
}