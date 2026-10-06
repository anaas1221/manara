import { useEffect, useState } from 'react';
import { db } from '../lib/db';

const PRAYERS = [
  { key: 'Fajr'    as const, label: 'الفجر' },
  { key: 'Dhuhr'   as const, label: 'الظهر' },
  { key: 'Asr'     as const, label: 'العصر' },
  { key: 'Maghrib' as const, label: 'المغرب' },
  { key: 'Isha'    as const, label: 'العشاء' }
];

type Status = 'prayed' | 'jamaah' | 'mosque';

export default function Prayer() {
  const today = new Date().toISOString().slice(0, 10);
  const [logs, setLogs] = useState<Record<string, Status | null>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    db.prayerLogs.where('date').equals(today).toArray().then(rows => {
      const map: Record<string, Status | null> = {};
      rows.forEach(r => {
        if (r.status !== 'none') map[r.prayer] = r.status as Status;
      });
      setLogs(map);
    });
  }, [today]);

  const toggle = (prayer: string, status: Status) => {
    setLogs(s => ({ ...s, [prayer]: s[prayer] === status ? null : status }));
    setSaved(false);
  };

  const handleSubmit = async () => {
    // امسح تسجيلات اليوم القديمة
    const existing = await db.prayerLogs.where('date').equals(today).toArray();
    await Promise.all(existing.map(r => db.prayerLogs.delete(r.id!)));

    // أضف التسجيلات الجديدة
    const entries = Object.entries(logs)
      .filter(([, status]) => status !== null)
      .map(([prayer, status]) => ({
        date: today,
        prayer: prayer as any,
        status: status as Status
      }));

    if (entries.length > 0) {
      await db.prayerLogs.bulkAdd(entries);
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold">صلاتي — اليوم</h1>

      <div className="space-y-3">
        {PRAYERS.map(p => (
          <div key={p.key} className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold">{p.label}</span>
              {logs[p.key] && (
                <i className="bi bi-check-circle-fill text-brand-600 text-xl" />
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {([
                { value: 'prayed', label: 'صليت' },
                { value: 'jamaah', label: 'جماعة' },
                { value: 'mosque', label: 'في المسجد' }
              ] as const).map(opt => (
                <button
                  key={opt.value}
                  onClick={() => toggle(p.key, opt.value)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition ${
                    logs[p.key] === opt.value
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'border-[var(--border)] hover:border-brand-500'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition"
      >
        <i className="bi bi-check2-circle" /> حفظ تسجيلات اليوم
      </button>

      {saved && (
        <p className="text-center text-sm text-brand-600">
          <i className="bi bi-check-circle" /> تم الحفظ بنجاح
        </p>
      )}
    </div>
  );
}