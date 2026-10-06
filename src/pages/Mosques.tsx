import { useEffect, useState } from 'react';
import { ls } from '../lib/storage';

export default function Mosques() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = ls.get<{ lat: number; lon: number } | null>('location', null);
    if (saved) {
      setCoords({ lat: saved.lat, lon: saved.lon });
      setLoading(false);
      return;
    }
    if (!navigator.geolocation) {
      setError('خدمة الموقع غير مدعومة في متصفحك.');
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      p => {
        const { latitude, longitude } = p.coords;
        ls.set('location', { lat: latitude, lon: longitude });
        setCoords({ lat: latitude, lon: longitude });
        setLoading(false);
      },
      () => {
        setError('تعذر الحصول على موقعك. تأكد من السماح بالوصول للموقع.');
        setLoading(false);
      },
      { timeout: 10000, enableHighAccuracy: false, maximumAge: 60000 }
    );
  }, []);

  // OpenStreetMap embed — يعمل دائمًا بدون API key
  const mapSrc = coords
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${
        coords.lon - 0.02
      },${coords.lat - 0.015},${coords.lon + 0.02},${
        coords.lat + 0.015
      }&layer=mapnik&marker=${coords.lat},${coords.lon}`
    : '';

  const openInGoogle = () => {
    if (!coords) return;
    const url = `https://www.google.com/maps/search/مسجد/@${coords.lat},${coords.lon},15z`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openInOSM = () => {
    if (!coords) return;
    const url = `https://www.openstreetmap.org/#map=15/${coords.lat}/${coords.lon}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-5">
      {/* العنوان */}
      <div>
        <h1 className="text-2xl font-bold">المساجد القريبة</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          استعرض موقعك، وابحث عن المساجد حولك
        </p>
      </div>

      {/* حالة التحميل */}
      {loading && (
        <div className="card p-10 text-center text-[var(--muted)]">
          <i className="bi bi-hourglass-split text-3xl animate-pulse" />
          <p className="mt-3 text-sm">جاري تحديد موقعك…</p>
        </div>
      )}

      {/* خطأ */}
      {error && (
        <div className="card p-6 text-center">
          <i className="bi bi-exclamation-triangle text-3xl text-red-500" />
          <p className="mt-3 text-sm text-red-500">{error}</p>
          <button
            onClick={() => location.reload()}
            className="mt-4 px-4 py-2 rounded-lg bg-brand-600 text-white text-sm"
          >
            <i className="bi bi-arrow-clockwise" /> إعادة المحاولة
          </button>
        </div>
      )}

      {/* المحتوى بعد تحديد الموقع */}
      {coords && (
        <>
          {/* أزرار البحث */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={openInGoogle}
              className="py-3 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition flex items-center justify-center gap-2"
            >
              <i className="bi bi-geo-alt-fill" />
              ابحث في Google Maps
            </button>
            <button
              onClick={openInOSM}
              className="py-3 rounded-xl border border-[var(--border)] text-sm font-semibold hover:bg-[var(--card)] transition flex items-center justify-center gap-2"
            >
              <i className="bi bi-map" />
              افتح OpenStreetMap
            </button>
          </div>

          {/* الخريطة */}
          <div className="card overflow-hidden">
            <iframe
              title="خريطة الموقع"
              src={mapSrc}
              className="w-full h-[450px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* معلومات الموقع */}
          <div className="card p-4 text-xs text-[var(--muted)] flex items-center justify-between">
            <span>
              <i className="bi bi-geo" /> إحداثياتك:{' '}
              <span className="font-mono">
                {coords.lat.toFixed(4)}, {coords.lon.toFixed(4)}
              </span>
            </span>
            <button
              onClick={() => {
                ls.remove('location');
                location.reload();
              }}
              className="text-brand-600 underline"
            >
              تحديث الموقع
            </button>
          </div>

          {/* تلميح */}
          <div className="card p-4 bg-brand-50/40 dark:bg-brand-900/10 border-brand-500/20">
            <div className="flex gap-3 items-start">
              <i className="bi bi-info-circle text-brand-600 text-lg shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <p className="font-semibold mb-1">كيف أجد المساجد القريبة؟</p>
                <p className="text-[var(--muted)]">
                  اضغط <strong>"ابحث في Google Maps"</strong> — سيفتح تطبيق/موقع
                  Google Maps مباشرة ويبحث عن المساجد حول موقعك مع إمكانية التنقل
                  إليها.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}   