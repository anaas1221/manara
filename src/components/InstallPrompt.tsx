import { useState } from 'react';
import { useInstallPrompt } from '../lib/hooks/useInstallPrompt';

export function InstallPrompt() {
  const { canInstall, isInstalled, isIOS, install } = useInstallPrompt();
  const [showIOSModal, setShowIOSModal] = useState(false);

  if (isInstalled) return null;

  if (canInstall) {
    return (
      <button
        onClick={() => install()}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 transition"
        title="تثبيت منارة على جهازك"
      >
        <i className="bi bi-download" />
        <span className="hidden sm:inline">ثبّت</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSModal(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 transition"
        >
          <i className="bi bi-download" />
          <span className="hidden sm:inline">ثبّت</span>
        </button>

        {showIOSModal && (
          <div
            className="fixed inset-0 z-50 bg-black/60 flex items-end md:items-center justify-center p-4"
            onClick={() => setShowIOSModal(false)}
          >
            <div
              className="bg-[var(--card)] rounded-2xl p-6 max-w-sm w-full space-y-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <i className="bi bi-apple text-3xl text-brand-600" />
                <div>
                  <h3 className="font-bold">تثبيت منارة على iPhone</h3>
                  <p className="text-xs text-[var(--muted)]">خطوتان فقط</p>
                </div>
              </div>

              <ol className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">1</span>
                  <div>اضغط <i className="bi bi-box-arrow-up text-brand-600" /> <strong>المشاركة</strong> في Safari</div>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">2</span>
                  <div>اختر <strong>"إضافة إلى الشاشة الرئيسية"</strong></div>
                </li>
              </ol>

              <button
                onClick={() => setShowIOSModal(false)}
                className="w-full py-3 rounded-xl bg-brand-600 text-white font-semibold"
              >
                فهمت
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
}