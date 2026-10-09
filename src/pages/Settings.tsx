import { useTheme } from '../components/providers/ThemeProvider';
import { InstallButtonLarge } from '../components/InstallPrompt';
import { ls } from '../lib/storage';

export default function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold">الإعدادات</h1>

      {/* ✅ التثبيت كتطبيق */}
      <section className="card p-5 space-y-3">
        <div className="flex items-center gap-2">
          <i className="bi bi-phone text-xl text-brand-600" />
          <h2 className="font-semibold">تثبيت التطبيق</h2>
        </div>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          ثبّت منارة كتطبيق على جهازك للوصول السريع + العمل بدون إنترنت.
        </p>
        <InstallButtonLarge />
      </section>

      {/* المظهر */}
      <section className="card p-5 space-y-3">
        <div className="flex items-center gap-2">
          <i className="bi bi-palette text-xl text-brand-600" />
          <h2 className="font-semibold">المظهر</h2>
        </div>
        <div className="flex gap-2">
          {(['light', 'dark'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`flex-1 px-3 py-2 rounded-lg border text-sm transition ${
                theme === t
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'border-[var(--border)] hover:border-brand-500'
              }`}
            >
              <i className={`bi ${t === 'light' ? 'bi-sun' : 'bi-moon'} mr-1`} />
              {t === 'light' ? 'فاتح' : 'داكن'}
            </button>
          ))}
        </div>
      </section>

      {/* الموقع */}
      <section className="card p-5 space-y-3">
        <div className="flex items-center gap-2">
          <i className="bi bi-geo-alt text-xl text-brand-600" />
          <h2 className="font-semibold">الموقع</h2>
        </div>
        <p className="text-sm text-[var(--muted)]">
          يُستخدم لحساب مواقيت الصلاة والقبلة والمساجد القريبة.
        </p>
        <button
          onClick={() => {
            ls.remove('location');
            location.reload();
          }}
          className="text-sm text-brand-600 underline"
        >
          حذف الموقع المحفوظ
        </button>
      </section>

      {/* منطقة الخطر */}
      <section className="card p-5 space-y-3">
        <div className="flex items-center gap-2">
          <i className="bi bi-exclamation-triangle text-xl text-red-600" />
          <h2 className="font-semibold text-red-600">منطقة الخطر</h2>
        </div>
        <button
          onClick={async () => {
            if (!confirm('سيتم حذف جميع بياناتك المخزنة على هذا الجهاز. لا يمكن التراجع. متابعة؟')) return;
            const { deleteAll } = await import('../lib/export');
            await deleteAll();
            alert('تم حذف جميع البيانات');
            location.reload();
          }}
          className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm"
        >
          <i className="bi bi-trash" /> حذف جميع بياناتي
        </button>
      </section>
    </div>
  );
}