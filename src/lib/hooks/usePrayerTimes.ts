import { useEffect, useState } from 'react';
import { ls } from '../storage';

export interface PrayerTimings {
  Fajr: string; Sunrise: string; Dhuhr: string; Asr: string; Maghrib: string; Isha: string;
}
export interface PrayerData { timings: PrayerTimings; date: string; hijri: string; }

export function usePrayerTimes() {
  const [data, setData] = useState<PrayerData | null>(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchByCoords = async (lat: number, lon: number) => {
      try {
        const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=4`);
        const json = await res.json();
        if (cancelled) return;
        const t = json.data.timings;
        setData({
          timings: {
            Fajr: t.Fajr, Sunrise: t.Sunrise, Dhuhr: t.Dhuhr,
            Asr: t.Asr, Maghrib: t.Maghrib, Isha: t.Isha
          },
          date: json.data.date.readable,
          hijri: json.data.date.hijri.date
        });
        try {
          const cRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=ar`);
          const cJson = await cRes.json();
          if (!cancelled) setCity(cJson.city || cJson.locality || '');
        } catch { /* ignore */ }
      } catch { /* ignore */ } finally {
        if (!cancelled) setLoading(false);
      }
    };

    const saved = ls.get<{ lat: number; lon: number; city?: string } | null>('location', null);
    if (saved) {
      setCity(saved.city || '');
      fetchByCoords(saved.lat, saved.lon);
      return;
    }

    if (!navigator.geolocation) { setLoading(false); return; }
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        ls.set('location', { lat: latitude, lon: longitude });
        fetchByCoords(latitude, longitude);
      },
      () => setLoading(false),
      { timeout: 8000 }
    );

    return () => { cancelled = true; };
  }, []);

  return { data, city, loading };
}

export function formatTime12(t: string) {
  const [h, m] = t.split(':').map(Number);
  const am = h < 12;
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, '0')} ${am ? 'ص' : 'م'}`;
}