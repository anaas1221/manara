import { useState } from 'react';
import { LEARN_CATEGORIES } from '../content/learn';

export default function Learn() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const category = LEARN_CATEGORIES.find(c => c.slug === activeCategory);
  const topic = category?.topics.find(t => t.id === activeTopic);

  // =============== شاشة التفاصيل ===============
  if (category && topic) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <button
          onClick={() => setActiveTopic(null)}
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-brand-600"
        >
          <i className="bi bi-arrow-right" /> العودة لـ{category.title}
        </button>

        <h1 className="text-2xl font-bold">{topic.title}</h1>

        <div className="space-y-4">
          {topic.steps.map((step, idx) => (
            <div key={idx} className="card p-5 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-lg">{step.title}</h2>
                  {step.description && (
                    <p className="text-sm text-[var(--muted)] mt-1 leading-relaxed">{step.description}</p>
                  )}
                </div>
              </div>

              {step.whatToDo && step.whatToDo.length > 0 && (
                <ul className="space-y-1.5 text-sm pr-5">
                  {step.whatToDo.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <i className="bi bi-circle-fill text-[6px] text-brand-600 mt-2" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {step.whatToSay && step.whatToSay.length > 0 && (
                <div className="bg-brand-50/40 dark:bg-brand-900/10 rounded-xl p-4 border border-brand-500/20">
                  <h3 className="text-sm font-semibold text-brand-600 mb-2 flex items-center gap-1">
                    <i className="bi bi-chat-quote" /> ماذا أقول؟
                  </h3>
                  <div className="space-y-2">
                    {step.whatToSay.map((s, i) => (
                      <p key={i} className="font-quran text-lg leading-loose">{s}</p>
                    ))}
                  </div>
                </div>
              )}

              {step.source && (
                <div className="text-xs text-[var(--muted)] pt-2 border-t border-[var(--border)]">
                  <i className="bi bi-bookmark" /> {step.source}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =============== شاشة المواضيع ===============
  if (category) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <button
          onClick={() => setActiveCategory(null)}
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-brand-600"
        >
          <i className="bi bi-arrow-right" /> العودة لقائمة التعلم
        </button>

        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
            <i className={`bi ${category.icon} text-3xl text-brand-600`} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{category.title}</h1>
            <p className="text-sm text-[var(--muted)] mt-0.5">{category.description}</p>
          </div>
        </div>

        <div className="space-y-3">
          {category.topics.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTopic(t.id)}
              className="card p-4 flex items-center gap-3 hover:border-brand-500 transition text-right w-full"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center shrink-0">
                <i className="bi bi-book text-xl text-brand-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold">{t.title}</h3>
                <p className="text-xs text-[var(--muted)] mt-0.5">
                  {t.steps.length} خطوة
                </p>
              </div>
              <i className="bi bi-chevron-left text-[var(--muted)]" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // =============== الصفحة الرئيسية ===============
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">التعلم</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          تعلّم أمور دينك خطوة بخطوة — قصص، سيرة، عبادات
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LEARN_CATEGORIES.map(cat => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className="card p-5 text-right hover:border-brand-500 transition flex items-start gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
              <i className={`bi ${cat.icon} text-2xl text-brand-600`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold leading-tight">{cat.title}</h3>
              <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">{cat.description}</p>
              <p className="text-[10px] text-brand-600 mt-2">
                <i className="bi bi-list-check" /> {cat.topics.length} موضوع
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}