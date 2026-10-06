import { useState } from 'react';
import { DUA_CATEGORIES, type Dua } from '../content/duas';

export default function Duas() {
  const [query, setQuery] = useState('');
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const activeCategory = DUA_CATEGORIES.find(c => c.slug === activeSlug);

  const normalize = (s: string) => s.replace(/[\u064B-\u065F\u0670]/g, '').replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه');

  const filteredCategories = query.trim()
    ? DUA_CATEGORIES.map(c => ({
        ...c,
        duas: c.duas.filter(d => normalize(d.text).includes(normalize(query)) || normalize(c.title).includes(normalize(query)))
      })).filter(c => c.duas.length > 0)
    : DUA_CATEGORIES;

  const copyDua = async (d: Dua) => {
    await navigator.clipboard.writeText(`${d.text}\n\n— ${d.source}\nمنارة`);
    setCopied(d.id);
    setTimeout(() => setCopied(null), 2000);
  };

  const shareDua = async (d: Dua) => {
    if (navigator.share) {
      try { await navigator.share({ title: 'دعاء من منارة', text: `${d.text}\n\n${d.source}` }); } catch {}
    } else {
      await navigator.clipboard.writeText(d.text);
      alert('تم النسخ');
    }
  };

  // عرض التصنيف المحدد
  if (activeCategory) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <button
          onClick={() => setActiveSlug(null)}
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-brand-600"
        >
          <i className="bi bi-arrow-right" /> العودة لقائمة الأدعية
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
            <i className={`bi ${activeCategory.icon} text-2xl text-brand-600`} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{activeCategory.title}</h1>
            <p className="text-sm text-[var(--muted)] mt-0.5">{activeCategory.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          {activeCategory.duas.map(d => (
            <div key={d.id} className="card p-5 space-y-3">
              <p className="font-quran text-lg leading-loose">{d.text}</p>

              {d.virtue && (
                <div className="text-xs text-brand-600 flex items-start gap-1">
                  <i className="bi bi-star-fill mt-0.5" /> <span>{d.virtue}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                <span className="text-xs text-[var(--muted)]">
                  <i className="bi bi-bookmark" /> {d.source}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => copyDua(d)}
                    className="p-2 rounded-lg hover:bg-[var(--bg)] text-brand-600"
                    aria-label="نسخ"
                  >
                    <i className={`bi ${copied === d.id ? 'bi-check-circle-fill' : 'bi-clipboard'} text-sm`} />
                  </button>
                  <button
                    onClick={() => shareDua(d)}
                    className="p-2 rounded-lg hover:bg-[var(--bg)] text-brand-600"
                    aria-label="مشاركة"
                  >
                    <i className="bi bi-share text-sm" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // عرض القائمة الرئيسية
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">الأدعية</h1>
        <p className="text-sm text-[var(--muted)] mt-1">أدعية مأثورة من الكتاب والسنة</p>
      </div>

      <div className="relative">
        <i className="bi bi-search absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="ابحث في الأدعية..."
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

      {query.trim() ? (
        <div className="space-y-4">
          {filteredCategories.length === 0 ? (
            <p className="text-center text-[var(--muted)] py-8">لا توجد نتائج</p>
          ) : (
            filteredCategories.map(cat => (
              <div key={cat.slug} className="space-y-3">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <i className={`bi ${cat.icon} text-brand-600`} /> {cat.title}
                </h2>
                {cat.duas.map(d => (
                  <div key={d.id} className="card p-4">
                    <p className="font-quran leading-loose">{d.text}</p>
                    <p className="text-xs text-[var(--muted)] mt-2">
                      <i className="bi bi-bookmark" /> {d.source}
                    </p>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {DUA_CATEGORIES.map(cat => (
            <button
              key={cat.slug}
              onClick={() => setActiveSlug(cat.slug)}
              className="card p-4 text-right hover:border-brand-500 transition flex flex-col items-start gap-2"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center">
                <i className={`bi ${cat.icon} text-xl text-brand-600`} />
              </div>
              <span className="font-semibold text-sm leading-tight">{cat.title}</span>
              <span className="text-[10px] text-brand-600">
                <i className="bi bi-list-check" /> {cat.duas.length} دعاء
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}