import { useTheme } from '../components/providers/ThemeProvider';
import { ls } from '../lib/storage';

export default function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold">الإعدادات</h1>

      <section className="card p-5 space-y-3">
        <h2 className="font-semibold">المظهر</h2>
        <div className="flex gap-2">
          {(['light', 'dark'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`px-3 py-1.5 rounded-lg border text-sm ${
                theme === t
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'border-[var(--border)]'
              }`}
            >
              {t === 'light' ? 'فاتح' : 'داكن'}
            </button>
          ))}
        </div>
      </section>

      <section className="card p-5 space-y-3">
        <h2 className="font-semibold">الموقع</h2>
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

      <section className="card p-5 space-y-3">
        <h2 className="font-semibold text-red-600">منطقة الخطر</h2>
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