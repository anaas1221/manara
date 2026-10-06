import { useState, useMemo } from 'react';
import { HADITHS, HADITH_CATEGORIES, type Hadith } from '../content/hadith';

export default function HadithPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const normalize = (s: string) =>
    s.replace(/[\u064B-\u065F\u0670]/g, '').replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه');

  const filtered = useMemo(() => {
    let list = HADITHS;
    if (activeCategory) list = list.filter(h => h.category === activeCategory);
    const q = query.trim();
    if (q) {
      const nq = normalize(q);
      list = list.filter(h =>
        normalize(h.text).includes(nq) ||
        normalize(h.narrator).includes(nq) ||
        normalize(h.source).includes(nq) ||
        normalize(h.category).includes(nq) ||
        h.keywords.some(k => normalize(k).includes(nq))
      );
    }
    return list;
  }, [query, activeCategory]);

  const copyHadith = async (h: Hadith) => {
    const text = `${h.text}\n\nالراوي: ${h.narrator}\nالمصدر: ${h.source} — ${h.book} — رقم ${h.number}\nمنارة`;
    await navigator.clipboard.writeText(text);
    setCopied(h.id);
    setTimeout(() => setCopied(null), 2000);
  };

  const shareHadith = async (h: Hadith) => {
    if (navigator.share) {
      try { await navigator.share({ title: 'حديث من منارة', text: `${h.text}\n\n${h.source}` }); } catch {}
    } else {
      await navigator.clipboard.writeText(h.text);
      alert('تم النسخ');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">الأحاديث النبوية</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          أحاديث من الصحيحين والسنن — بمصادرها وتخريجها
        </p>
      </div>

      {/* البحث */}
      <div className="relative">
        <i className="bi bi-search absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="ابحث في نص الحديث، الراوي، أو المصدر..."
          className="w-full pr-10 pl-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] outline-none focus:border-brand-500"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
          >
            <i className="bi bi-x-circle-fill" />
          </button>
        )}
      </div>

      {/* فلترة التصنيفات */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-full text-xs border transition ${
            activeCategory === null ? 'bg-brand-600 text-white border-brand-600' : 'border-[var(--border)] hover:border-brand-500'
          }`}
        >
          الكل ({HADITHS.length})
        </button>
        {HADITH_CATEGORIES.map(cat => {
          const count = HADITHS.filter(h => h.category === cat).length;
          if (count === 0) return null;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs border transition ${
                activeCategory === cat ? 'bg-brand-600 text-white border-brand-600' : 'border-[var(--border)] hover:border-brand-500'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* النتائج */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="card p-10 text-center text-[var(--muted)]">
            <i className="bi bi-search text-3xl mb-3 block" />
            لا توجد أحاديث مطابقة
          </div>
        ) : (
          filtered.map(h => (
            <div key={h.id} className="card p-5 space-y-3">
              <p className="font-quran text-lg leading-loose">{h.text}</p>

              <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-[var(--border)]">
                <div className="flex items-center gap-1 text-[var(--muted)]">
                  <i className="bi bi-person" /> {h.narrator}
                </div>
                <div className="flex items-center gap-1 text-[var(--muted)]">
                  <i className="bi bi-bookmark" /> {h.source}
                </div>
                <div className="flex items-center gap-1 text-[var(--muted)]">
                  <i className="bi bi-book" /> {h.book}
                </div>
                <div className="flex items-center gap-1 text-[var(--muted)]">
                  <i className="bi bi-hash" /> {h.number}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] px-2 py-1 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-600">
                  <i className="bi bi-tag" /> {h.category}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => copyHadith(h)}
                    className="p-2 rounded-lg hover:bg-[var(--bg)] text-brand-600"
                    aria-label="نسخ"
                  >
                    <i className={`bi ${copied === h.id ? 'bi-check-circle-fill' : 'bi-clipboard'} text-sm`} />
                  </button>
                  <button
                    onClick={() => shareHadith(h)}
                    className="p-2 rounded-lg hover:bg-[var(--bg)] text-brand-600"
                    aria-label="مشاركة"
                  >
                    <i className="bi bi-share text-sm" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}