import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NAMES_OF_ALLAH, type DivineName } from '../content/names';

export default function Names() {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState<DivineName | null>(null);
  const isAr = i18n.language === 'ar';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('names_title')}</h1>
        <p className="text-sm text-[var(--muted)] mt-1">{t('names_subtitle')}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {NAMES_OF_ALLAH.map(n => (
          <button
            key={n.id}
            onClick={() => setSelected(n)}
            className="group card p-4 text-center hover:border-brand-500 focus:border-brand-500 outline-none transition relative overflow-hidden"
          >
            {/* العربي دائمًا ظاهر (زخرفة) */}
            <div className="text-xl font-quran font-semibold">{n.name}</div>

            {/* الإنجليزية - تظهر حسب اللغة */}
            {!isAr && (
              <div className="text-[11px] text-brand-600 font-semibold mt-0.5">
                {n.transliteration}
              </div>
            )}

            <p
              className="
                text-xs text-[var(--muted)] mt-2 line-clamp-3
                md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-200
              "
            >
              {isAr ? n.meaning : n.meaningEn}
            </p>

            <span className="absolute top-2 left-2 text-[10px] text-[var(--muted)] tabular-nums">
              {n.id}
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="card max-w-md w-full p-6 text-center"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-sm text-[var(--muted)] mb-2">
              {t('names_number', { n: selected.id })}
            </div>
            <div className="text-3xl font-quran font-bold text-brand-600 mb-1">
              {selected.name}
            </div>
            {!isAr && (
              <div className="text-base text-brand-600 font-semibold mb-4">
                {selected.transliteration}
              </div>
            )}
            <p className="text-base leading-relaxed">
              {isAr ? selected.meaning : selected.meaningEn}
            </p>
            <button
              onClick={() => setSelected(null)}
              className="mt-6 px-6 py-2 rounded-lg bg-brand-600 text-white text-sm"
            >
              {t('names_close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}