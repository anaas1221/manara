import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="max-w-md mx-auto card p-8 text-center space-y-4 my-10">
      <div className="w-20 h-20 mx-auto rounded-full bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
        <i className="bi bi-compass text-4xl text-brand-600" />
      </div>
      <h1 className="text-3xl font-bold">{t('not_found')}</h1>
      <p className="text-[var(--muted)]">{t('not_found_message')}</p>
      <Link
        to="/"
        className="inline-block px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition"
      >
        <i className="bi bi-house" /> {t('back_home')}
      </Link>
    </div>
  );
}