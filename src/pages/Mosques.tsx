import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ls } from '../lib/storage';

export default function Mosques() {
  const { t } = useTranslation();
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
      setError(t('mosques_location_error'));
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
        setError(t('mosques_location_error'));
        setLoading(false);
      },
      { timeout: 10000, enableHighAccuracy: false, maximumAge: 60000 }
    );
  }, [t]);

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

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">{t('mosques_title')}</h1>
        <p className="text-sm text-[var(--muted)] mt-1">{t('mosques_subtitle')}</p>
      </div>

      {loading && (
        <div className="card p-10 text-center text-[var(--muted)]">
          <i className="bi bi-hourglass-split text-3xl animate-pulse" />
          <p className="mt-3 text-sm">{t('qibla_getting_location')}</p>
        </div>
      )}

      {error && (
        <div className="card p-6 text-center">
          <i className="bi bi-exclamation-triangle text-3xl text-red-500" />
          <p className="mt-3 text-sm text-red-500">{error}</p>
          <button
            onClick={() => location.reload()}
            className="mt-4 px-4 py-2 rounded-lg bg-brand-600 text-white text-sm"
          >
            <i className="bi bi-arrow-clockwise" /> {t('quran_retry')}
          </button>
        </div>
      )}

      {coords && (
        <>
          {/* ✅ زر واحد فقط — Google Maps */}
          <button
            onClick={openInGoogle}
            className="w-full py-4 rounded-xl bg-brand-600 text-white text-sm font-bold hover:bg-brand-700 transition flex items-center justify-center gap-2 shadow-md"
          >
            <i className="bi bi-geo-alt-fill text-lg" />
            {t('mosques_find_google')}
          </button>

          <div className="card overflow-hidden">
            <iframe
              title="Mosques"
              src={mapSrc}
              className="w-full h-[450px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="card p-4 text-xs text-[var(--muted)] flex items-center justify-between">
            <span>
              <i className="bi bi-geo" /> {t('mosques_coordinates')}:{' '}
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
              {t('mosques_update')}
            </button>
          </div>

          <div className="card p-4 bg-brand-50/40 dark:bg-brand-900/10 border-brand-500/20">
            <div className="flex gap-3 items-start">
              <i className="bi bi-info-circle text-brand-600 text-lg shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <p className="font-semibold mb-1">{t('mosques_location_hint')}</p>
                <p className="text-[var(--muted)]">{t('mosques_location_hint_desc')}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}