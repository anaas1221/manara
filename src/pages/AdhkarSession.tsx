import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ADHKAR_CATEGORIES } from '../content/adhkar';
import { ls } from '../lib/storage';

interface TodayProgress {
  date: string;
  categories: Record<string, boolean>;
}

type Mode = 'setup' | 'session' | 'done';

export default function AdhkarSession() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = ADHKAR_CATEGORIES.find(c => c.slug === slug);

  const total = category?.adhkar.length ?? 0;
  const wantsSetup = searchParams.get('setup') === '1';

  // لو مش طالب setup → ابدأ الجلسة مباشرة بكل الأذكار
  const [mode, setMode] = useState<Mode>(wantsSetup ? 'setup' : 'session');
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(total);
  const [i, setI] = useState(0);
  const [count, setCount] = useState(0);

  // إعادة التهيئة عند تغيير الفئة أو الـ query
  useEffect(() => {
    setMode(wantsSetup ? 'setup' : 'session');
    setFrom(1);
    setTo(total);
    setI(0);
    setCount(0);
  }, [slug, total, wantsSetup]);

  // إعادة التوجيه لو الفئة غير موجودة
  useEffect(() => {
    if (!category) navigate('/adhkar');
  }, [category, navigate]);

  // حفظ عند الانتهاء
  useEffect(() => {
    if (mode !== 'done' || !category) return;
    const today = new Date().toISOString().slice(0, 10);
    const stored = ls.get<TodayProgress>('adhkar-today', { date: '', categories: {} });
    const categories = stored.date === today ? stored.categories : {};
    categories[category.slug] = true;
    ls.set('adhkar-today', { date: today, categories });
  }, [mode, category]);

  if (!category) return null;

  // =====================================
  // 1. شاشة الإعداد — تحديد الهدف
  // =====================================
  if (mode === 'setup') {
    const selectedCount = to - from + 1;
    const isValid = from >= 1 && to <= total && from <= to;

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Link
          to="/adhkar"
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-brand-600"
        >
          <i className="bi bi-arrow-right" /> العودة لقائمة الأذكار
        </Link>

        <div className="card p-6 space-y-5">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
              <i className={`bi ${category.icon} text-3xl text-brand-600`} />
            </div>
            <h1 className="text-2xl font-bold">{category.title}</h1>
            <p className="text-sm text-[var(--muted)]">{category.description}</p>
          </div>

          <div className="border-t border-[var(--border)] pt-5 space-y-4">
            <div>
              <h2 className="font-semibold mb-1">
                <i className="bi bi-bullseye text-brand-600" /> حدد هدفك
              </h2>
              <p className="text-xs text-[var(--muted)]">
                اختر من أي ذكر تريد البدء، وإلى أي ذكر تريد الانتهاء.
              </p>
            </div>

            {/* اختيار سريع */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { setFrom(1); setTo(total); }}
                className={`px-3 py-1.5 rounded-full border text-sm transition ${
                  from === 1 && to === total
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'border-[var(--border)] hover:border-brand-500'
                }`}
              >
                <i className="bi bi-check2-all" /> الكل ({total})
              </button>
              <button
                onClick={() => { setFrom(1); setTo(Math.ceil(total / 2)); }}
                className={`px-3 py-1.5 rounded-full border text-sm transition ${
                  from === 1 && to === Math.ceil(total / 2)
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'border-[var(--border)] hover:border-brand-500'
                }`}
              >
                النصف ({Math.ceil(total / 2)})
              </button>
              <button
                onClick={() => {
                  const end = Math.min(from + 4, total);
                  setTo(end);
                }}
                className="px-3 py-1.5 rounded-full border border-[var(--border)] text-sm hover:border-brand-500 transition"
              >
                5 أذكار
              </button>
            </div>

            {/* اختيار مخصص */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[var(--muted)] mb-1">
                  من الذكر رقم
                </label>
                <select
                  value={from}
                  onChange={e => {
                    const v = parseInt(e.target.value);
                    setFrom(v);
                    if (v > to) setTo(v);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] outline-none focus:border-brand-500 text-sm"
                >
                  {category.adhkar.map((_, idx) => (
                    <option key={idx + 1} value={idx + 1}>
                      الذكر {idx + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-[var(--muted)] mb-1">
                  إلى الذكر رقم
                </label>
                <select
                  value={to}
                  onChange={e => {
                    const v = parseInt(e.target.value);
                    setTo(v);
                    if (v < from) setFrom(v);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] outline-none focus:border-brand-500 text-sm"
                >
                  {category.adhkar.map((_, idx) => (
                    <option key={idx + 1} value={idx + 1}>
                      الذكر {idx + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ملخص الهدف */}
            <div className="card p-4 bg-brand-50/40 dark:bg-brand-900/10 border-brand-500/30">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--muted)]">
                  <i className="bi bi-list-check" /> الهدف المحدد
                </span>
                <span className="font-bold text-brand-600">
                  {isValid ? `${selectedCount} من ${total} ذكر` : '—'}
                </span>
              </div>
              {isValid && (
                <p className="text-xs text-[var(--muted)] mt-1">
                  من الذكر {from} إلى الذكر {to}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* أزرار Submit / Cancel */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/adhkar')}
            className="flex-1 py-3 rounded-xl border border-[var(--border)] font-semibold hover:bg-[var(--card)] transition"
          >
            <i className="bi bi-x-lg" /> إلغاء
          </button>
          <button
            onClick={() => {
              if (!isValid) return;
              setI(0);
              setCount(0);
              setMode('session');
            }}
            disabled={!isValid}
            className="flex-[2] py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition disabled:opacity-40"
          >
            <i className="bi bi-play-fill" /> ابدأ الجلسة
          </button>
        </div>
      </div>
    );
  }

  // =====================================
  // 2. شاشة الجلسة
  // =====================================
  const selectedItems = category.adhkar.slice(from - 1, to);
  const items = selectedItems;

  // انتقلنا لشاشة النجاح
  if (mode === 'session' && i >= items.length) {
    setTimeout(() => setMode('done'), 0);
  }

  if (mode === 'session') {
    const current = items[i];
    if (!current) return null;
    const isCountDone = count >= current.repeat;
    const progress = ((i + (isCountDone ? 1 : count / current.repeat)) / items.length) * 100;

    const increment = () => {
      if (isCountDone) return;
      setCount(c => c + 1);
      if (navigator.vibrate) navigator.vibrate(8);
    };

    const next = () => {
      if (i < items.length - 1) {
        setI(i + 1);
        setCount(0);
      } else {
        setI(items.length);
        setMode('done');
      }
    };

    const prev = () => {
      if (i > 0) {
        setI(i - 1);
        setCount(0);
      }
    };

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        {/* زر الرجوع */}
        <button
          onClick={() => {
            if (confirm('هل تريد إلغاء الجلسة؟ سيتم فقدان تقدمك.')) {
              navigate('/adhkar');
            }
          }}
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-brand-600"
        >
          <i className="bi bi-arrow-right" />
          إلغاء الجلسة
        </button>

        {/* المعلومات العلوية */}
        <div className="flex items-center justify-between text-sm text-[var(--muted)]">
          <span className="flex items-center gap-1">
            <i className={`bi ${category.icon}`} />
            {category.title}
          </span>
          <span>
            الذكر {from + i} من {to} (الهدف: {items.length})
          </span>
        </div>

        {/* شريط التقدم */}
        <div className="h-1.5 bg-[var(--bg)] rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* نص الذكر */}
        <div className="card p-6 leading-loose text-lg font-quran text-center min-h-[180px] flex items-center justify-center">
          {current.text}
        </div>

        {/* الفضل */}
        {current.virtue && (
          <div className="text-xs text-brand-600 text-center px-2">
            <i className="bi bi-star-fill" /> {current.virtue}
          </div>
        )}

        {/* المصدر */}
        <div className="text-center text-xs text-[var(--muted)]">
          <i className="bi bi-bookmark" /> {current.source}
        </div>

        {/* زر العد */}
        <button
          onClick={increment}
          disabled={isCountDone}
          className={`w-full py-8 rounded-2xl text-3xl font-bold transition select-none ${
            isCountDone
              ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-600'
              : 'bg-brand-600 text-white active:scale-[0.98]'
          }`}
        >
          {isCountDone ? (
            <span className="text-2xl">
              <i className="bi bi-check-circle-fill" /> تم
            </span>
          ) : (
            <span>{count} / {current.repeat}</span>
          )}
        </button>

        {/* أزرار التنقل */}
        <div className="flex gap-2">
          <button
            onClick={prev}
            disabled={i === 0}
            className="flex-1 py-3 rounded-xl border border-[var(--border)] disabled:opacity-40 hover:enabled:bg-[var(--card)]"
          >
            <i className="bi bi-chevron-right" /> السابق
          </button>
          <button
            onClick={next}
            disabled={!isCountDone}
            className="flex-1 py-3 rounded-xl bg-brand-600 text-white disabled:opacity-40 hover:enabled:bg-brand-700 font-semibold"
          >
            {i === items.length - 1 ? (
              <><i className="bi bi-check2-all" /> إنهاء الجلسة</>
            ) : (
              <>التالي <i className="bi bi-chevron-left" /></>
            )}
          </button>
        </div>

        <p className="text-center text-xs text-[var(--muted)]">
          اضغط على الزر الأخضر لعدّ الذكر — سيُحفظ تقدمك اليومي تلقائيًا.
        </p>
      </div>
    );
  }

  // =====================================
  // 3. شاشة النجاح
  // =====================================
  return (
    <div className="max-w-md mx-auto card p-8 text-center space-y-4">
      <div className="w-20 h-20 mx-auto rounded-full bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
        <i className="bi bi-check-circle-fill text-5xl text-brand-600" />
      </div>
      <h2 className="text-2xl font-bold">تمت جلسة {category.title}</h2>
      <p className="text-[var(--muted)]">
        أتممت {items.length} من الأذكار — تقبّل الله منك.
      </p>

      <div className="pt-4 space-y-2">
        <button
          onClick={() => {
            setI(0);
            setCount(0);
            setMode('setup');
          }}
          className="block w-full py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition"
        >
          <i className="bi bi-bullseye" /> جلسة جديدة
        </button>
        <Link
          to="/adhkar"
          className="block w-full py-3 rounded-xl border border-[var(--border)] text-sm hover:bg-[var(--card)]"
        >
          <i className="bi bi-arrow-right" /> العودة لقائمة الأذكار
        </Link>
      </div>
    </div>
  );
}