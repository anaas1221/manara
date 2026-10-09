import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInstallPrompt } from '../lib/hooks/useInstallPrompt';

export function InstallPrompt() {
  const { t } = useTranslation();
  const { canInstall, isInstalled, isIOS, install } = useInstallPrompt();
  const [showModal, setShowModal] = useState(false);

  if (isInstalled) return null;

  const handleClick = async () => {
    if (canInstall) await install();
    else setShowModal(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 transition shadow-sm"
        title={t('install_app_title')}
      >
        <i className="bi bi-download text-sm" />
        <span>{t('install_app')}</span>
      </button>

      {showModal && <InstallModal onClose={() => setShowModal(false)} isIOS={isIOS} t={t} />}
    </>
  );
}

export function InstallButtonLarge() {
  const { t } = useTranslation();
  const { canInstall, isInstalled, isIOS, install } = useInstallPrompt();
  const [showModal, setShowModal] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  if (isInstalled || justInstalled) {
    return (
      <div className="w-full py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-300 text-sm font-semibold flex items-center justify-center gap-2">
        <i className="bi bi-check-circle-fill text-lg" />
        {t('install_installed')}
      </div>
    );
  }

  const handleClick = async () => {
    if (canInstall) {
      const ok = await install();
      if (ok) setJustInstalled(true);
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="w-full py-3 rounded-xl bg-brand-600 text-white text-sm font-bold hover:bg-brand-700 transition flex items-center justify-center gap-2 shadow-sm"
      >
        <i className="bi bi-download text-lg" />
        {t('settings_install_btn')}
      </button>

      {showModal && <InstallModal onClose={() => setShowModal(false)} isIOS={isIOS} t={t} />}
    </>
  );
}

function InstallModal({ onClose, isIOS, t }: { onClose: () => void; isIOS: boolean; t: any }) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 flex items-end md:items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[var(--card)] rounded-2xl p-6 max-w-md w-full space-y-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
              <i className="bi bi-phone text-2xl text-brand-600" />
            </div>
            <div>
              <h3 className="font-bold">{isIOS ? t('install_ios_title') : t('install_app_title')}</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--bg)]" aria-label="Close">
            <i className="bi bi-x-lg" />
          </button>
        </div>

        {isIOS ? (
          <ol className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">1</span>
              <div>{t('install_ios_step1')}</div>
            </li>
            <li className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">2</span>
              <div>{t('install_ios_step2')}</div>
            </li>
          </ol>
        ) : (
          <ol className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">1</span>
              <div>{t('install_step1')}</div>
            </li>
            <li className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">2</span>
              <div>{t('install_step2')}</div>
            </li>
            <li className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">3</span>
              <div>{t('install_step3')}</div>
            </li>
          </ol>
        )}

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-brand-600 text-white font-semibold"
        >
          {t('install_understood')}
        </button>
      </div>
    </div>
  );
}