import { useState } from 'react';
import { useInstallPrompt } from '../lib/hooks/useInstallPrompt';

export function InstallPrompt() {
  const { canInstall, isInstalled, isIOS, install } = useInstallPrompt();
  const [showModal, setShowModal] = useState(false);

  // لو مثبت → لا تعرض زر
  if (isInstalled) return null;

  // زر Header العادي
  const handleClick = async () => {
    if (canInstall) {
      await install();
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      {/* ✅ الزر — ظاهر دائمًا */}
      <button
        onClick={handleClick}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 transition shadow-sm"
        title="ثبّت منارة على جهازك"
      >
        <i className="bi bi-download text-sm" />
        <span>ثبّت</span>
      </button>

      {/* Modal التعليمات */}
      {showModal && (
        <InstallModal
          onClose={() => setShowModal(false)}
          isIOS={isIOS}
        />
      )}
    </>
  );
}

// ============================================
// مكون منفصل لعرض التعليمات في الـ Settings
// ============================================
export function InstallButtonLarge() {
  const { canInstall, isInstalled, isIOS, install } = useInstallPrompt();
  const [showModal, setShowModal] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  if (isInstalled || justInstalled) {
    return (
      <div className="w-full py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-300 text-sm font-semibold flex items-center justify-center gap-2">
        <i className="bi bi-check-circle-fill text-lg" />
        التطبيق مثبّت على جهازك
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
        تثبيت منارة كتطبيق
      </button>

      {showModal && (
        <InstallModal
          onClose={() => setShowModal(false)}
          isIOS={isIOS}
        />
      )}
    </>
  );
}

// ============================================
// Modal التعليمات (يعمل على كل المتصفحات)
// ============================================
function InstallModal({ onClose, isIOS }: { onClose: () => void; isIOS: boolean }) {
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
              <h3 className="font-bold">تثبيت منارة كتطبيق</h3>
              <p className="text-xs text-[var(--muted)]">على الشاشة الرئيسية</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--bg)]"
            aria-label="إغلاق"
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        {isIOS ? (
          // iOS Safari
          <ol className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">1</span>
              <div>
                اضغط على زر <i className="bi bi-box-arrow-up text-brand-600" />{' '}
                <strong>المشاركة</strong> أسفل شاشة Safari
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">2</span>
              <div>
                اختر <strong>"إضافة إلى الشاشة الرئيسية"</strong>{' '}
                <i className="bi bi-plus-square text-brand-600" />
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">3</span>
              <div>
                اضغط <strong>"إضافة"</strong> في الأعلى
              </div>
            </li>
          </ol>
        ) : (
          // Android / Desktop Chrome / Edge
          <ol className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">1</span>
              <div>
                افتح قائمة المتصفح{' '}
                <i className="bi bi-three-dots-vertical text-brand-600" />
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">2</span>
              <div>
                اختر <strong>"تثبيت التطبيق"</strong> أو{' '}
                <strong>"إضافة إلى الشاشة الرئيسية"</strong>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">3</span>
              <div>اضغط <strong>"تثبيت"</strong> للتأكيد</div>
            </li>
          </ol>
        )}

        <div className="rounded-xl bg-brand-50/50 dark:bg-brand-900/20 p-3 text-xs text-[var(--muted)] leading-relaxed">
          <i className="bi bi-lightbulb text-brand-600" /> بمجرد التثبيت، سيعمل موقع
          منارة كتطبيق مستقل على جهازك — مع دعم كامل للعمل بدون إنترنت.
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-brand-600 text-white font-semibold"
        >
          فهمت
        </button>
      </div>
    </div>
  );
}