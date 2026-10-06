import { useState } from 'react';
import { HAJJ_CATEGORIES } from '../content/hajj';

export default function Hajj() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const category = HAJJ_CATEGORIES.find(c => c.slug === activeCategory);
  const section = category?.sections.find(s => s.id === activeSection);

  // =============== شاشة الخطوات ===============
  if (category && section) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <button
          onClick={() => setActiveSection(null)}
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-brand-600"
        >
          <i className="bi bi-arrow-right" /> العودة لـ{category.title}
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
            <i className={`bi ${section.icon} text-2xl text-brand-600`} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{section.title}</h1>
            <p className="text-sm text-[var(--muted)] mt-0.5">
              {section.steps.length} خطوة
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {section.steps.map((step, idx) => (
            <div key={step.id} className="card p-5 space-y-4">
              {/* عنوان الخطوة */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-lg">{step.title}</h2>
                  <p className="text-sm text-[var(--muted)] mt-1">{step.description}</p>
                </div>
              </div>

              {/* ماذا أفعل */}
              {step.whatToDo && step.whatToDo.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-brand-600 flex items-center gap-1">
                    <i className="bi bi-check2-circle" /> ماذا أفعل؟
                  </h3>
                  <ul className="space-y-1.5 text-sm pr-5">
                    {step.whatToDo.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <i className="bi bi-circle-fill text-[6px] text-brand-600 mt-2" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ماذا أقول */}
              {step.whatToSay && step.whatToSay.length > 0 && (
                <div className="space-y-2 bg-brand-50/40 dark:bg-brand-900/10 rounded-xl p-4 border border-brand-500/20">
                  <h3 className="text-sm font-semibold text-brand-600 flex items-center gap-1">
                    <i className="bi bi-chat-quote" /> ماذا أقول؟
                  </h3>
                  <div className="space-y-2">
                    {step.whatToSay.map((saying, i) => (
                      <p key={i} className="font-quran text-lg leading-loose">{saying}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* تلميحات */}
              {step.tips && step.tips.length > 0 && (
                <div className="space-y-1.5 bg-amber-50 dark:bg-amber-900/10 rounded-lg p-3 border border-amber-500/20">
                  <h3 className="text-xs font-semibold text-amber-700 dark:text-amber-300 flex items-center gap-1">
                    <i className="bi bi-lightbulb" /> تلميحات
                  </h3>
                  <ul className="text-xs space-y-1 text-amber-800 dark:text-amber-200">
                    {step.tips.map((tip, i) => <li key={i}>• {tip}</li>)}
                  </ul>
                </div>
              )}

              {/* المصدر */}
              {step.source && (
                <div className="text-xs text-[var(--muted)] pt-2 border-t border-[var(--border)]">
                  <i className="bi bi-bookmark" /> المصدر: {step.source}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =============== شاشة الأقسام ===============
  if (category) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <button
          onClick={() => setActiveCategory(null)}
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-brand-600"
        >
          <i className="bi bi-arrow-right" /> العودة
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
          {category.sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className="card p-4 flex items-center gap-3 hover:border-brand-500 transition text-right w-full"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center shrink-0">
                <i className={`bi ${sec.icon} text-xl text-brand-600`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold">{sec.title}</h3>
                <p className="text-xs text-[var(--muted)] mt-0.5">
                  {sec.steps.length} خطوة
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
        <h1 className="text-2xl font-bold">الحج والعمرة</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          دليل شامل خطوة بخطوة — ماذا تفعل وماذا تقول
        </p>
      </div>

      {/* تنبيه */}
      <div className="card p-4 bg-amber-50/60 dark:bg-amber-900/10 border-amber-500/30">
        <div className="flex gap-3">
          <i className="bi bi-info-circle text-amber-600 text-lg shrink-0" />
          <div className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
            هذا الدليل للاسترشاد العام. للفتاوى والتفاصيل الفقهية، يُنصح بسؤال أهل العلم أو الرجوع لكتب المناسك الموثوقة.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {HAJJ_CATEGORIES.map(cat => (
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
                <i className="bi bi-list-check" /> {cat.sections.length} قسم
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}