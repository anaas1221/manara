import { useEffect, useState } from 'react';
import type { PrayerData } from './usePrayerTimes';
import { formatTime12 } from './usePrayerTimes';

const ORDER = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;
const AR: Record<string, string> = {
  Fajr: 'الفجر', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء'
};

export function useNextPrayerCountdown(data: PrayerData | null) {
  const [state, setState] = useState<{ name: string; time: string; remaining: string } | null>(null);

  useEffect(() => {
    if (!data) return;
    const tick = () => {
      const now = new Date();
      let target: Date | null = null;
      let key: string = 'Fajr';

      for (const k of ORDER) {
        const [h, m] = data.timings[k].split(':').map(Number);
        const d = new Date(now); d.setHours(h, m, 0, 0);
        if (d > now) { target = d; key = k; break; }
      }
      if (!target) {
        const [h, m] = data.timings.Fajr.split(':').map(Number);
        const d = new Date(now); d.setDate(d.getDate() + 1);
        d.setHours(h, m, 0, 0);
        target = d; key = 'Fajr';
      }
      const diff = target.getTime() - now.getTime();
      const hh = Math.floor(diff / 3_600_000);
      const mm = Math.floor((diff % 3_600_000) / 60_000);
      const ss = Math.floor((diff % 60_000) / 1000);
      setState({
        name: AR[key],
        time: formatTime12(data.timings[key as keyof typeof data.timings]),
        remaining: `${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}`
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [data]);

  return state;
}