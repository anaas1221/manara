import { useState } from 'react';
import { BOOKS, BOOK_CATEGORIES, type Book } from '../content/library';

export default function Library() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [previewBook, setPreviewBook] = useState<Book | null>(null);

  const normalize = (s: string) =>
    s.replace(/[\u064B-\u065F\u0670]/g, '').replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه');

  const filtered = BOOKS.filter(b => {
    if (activeCategory && b.category !== activeCategory) return false;
    const q = query.trim();
    if (!q) return true;
    const nq = normalize(q);
    return normalize(b.title).includes(nq) ||
           normalize(b.author).includes(nq) ||
           normalize(b.description).includes(nq);
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">المكتبة الإسلامية</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          {BOOKS.length} كتاب — قراءة مباشرة، تحميل PDF، طباعة
        </p>
      </div>

      <div className="relative">
        <i className="bi bi-search absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="ابحث عن كتاب، مؤلف، أو موضوع..."
          className="w-full pr-10 pl-10 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] outline-none focus:border-brand-500"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">
            <i className="bi bi-x-circle-fill" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-full text-xs border transition ${
            activeCategory === null ? 'bg-brand-600 text-white border-brand-600' : 'border-[var(--border)]'
          }`}
        >
          الكل ({BOOKS.length})
        </button>
        {BOOK_CATEGORIES.map(cat => {
          const count = BOOKS.filter(b => b.category === cat.slug).length;
          if (count === 0) return null;
          return (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-3 py-1.5 rounded-full text-xs border transition ${
                activeCategory === cat.slug ? 'bg-brand-600 text-white border-brand-600' : 'border-[var(--border)]'
              }`}
            >
              <i className={`bi ${cat.icon}`} /> {cat.title} ({count})
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(book => (
          <div key={book.id} className="card p-5 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="w-14 h-20 rounded-lg bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center text-white shrink-0">
                <i className="bi bi-book-half text-2xl" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm leading-tight">{book.title}</h3>
                <p className="text-xs text-[var(--muted)] mt-1">{book.author}</p>
                <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-600 mt-2">
                  {BOOK_CATEGORIES.find(c => c.slug === book.category)?.title}
                </span>
              </div>
            </div>

            <p className="text-xs text-[var(--muted)] leading-relaxed line-clamp-3">
              {book.description}
            </p>

            <div className="flex gap-2 pt-2 border-t border-[var(--border)]">
              <a
                href={book.readUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 rounded-lg bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 transition flex items-center justify-center gap-1"
              >
                <i className="bi bi-book" /> اقرأ
              </a>
              <a
                href={book.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="flex-1 py-2 rounded-lg border border-[var(--border)] text-xs font-semibold hover:bg-[var(--bg)] transition flex items-center justify-center gap-1"
              >
                <i className="bi bi-download" /> PDF
              </a>
            </div>

            <button
              onClick={() => setPreviewBook(book)}
              className="text-[10px] text-brand-600 hover:underline"
            >
              <i className="bi bi-info-circle" /> تفاصيل ومصدر
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card p-10 text-center text-[var(--muted)]">
          <i className="bi bi-book text-3xl mb-3 block" />
          لا توجد كتب مطابقة
        </div>
      )}

      {previewBook && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-end md:items-center justify-center p-0 md:p-4"
          onClick={() => setPreviewBook(null)}
        >
          <div
            className="bg-[var(--card)] w-full md:max-w-md md:rounded-2xl rounded-t-2xl p-6 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start">
              <h2 className="font-bold text-lg">{previewBook.title}</h2>
              <button onClick={() => setPreviewBook(null)} className="p-1 text-[var(--muted)]">
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-[var(--muted)]">
                <i className="bi bi-person" /> {previewBook.author}
              </p>
              <p className="flex items-center gap-2 text-[var(--muted)]">
                <i className="bi bi-tag" /> {BOOK_CATEGORIES.find(c => c.slug === previewBook.category)?.title}
              </p>
              <p className="flex items-center gap-2 text-[var(--muted)]">
                <i className="bi bi-link-45deg" /> المصدر: {previewBook.source}
              </p>
              <p className="flex items-center gap-2 text-green-600">
                <i className="bi bi-unlock" /> ملكية عامة — استخدام حر
              </p>
            </div>

            <p className="text-sm leading-relaxed">{previewBook.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}