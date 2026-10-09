import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ls } from '../lib/storage';

const KAABA = { lat: 21.4225, lon: 39.8262 };

function bearing(lat: number, lon: number) {
  const φ1 = (lat * Math.PI) / 180;
  const φ2 = (KAABA.lat * Math.PI) / 180;
  const Δλ = ((KAABA.lon - lon) * Math.PI) / 180;
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

type Status = 'getting-location' | 'ready' | 'need-permission' | 'no-compass' | 'error';

export default function Qibla() {
  const { t } = useTranslation();
  const [qibla, setQibla] = useState<number | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>('getting-location');
  const [error, setError] = useState<string | null>(null);
  const lastRef = useRef<{ h: number | null; t: number }>({ h: null, t: 0 });

  useEffect(() => {
    const saved = ls.get<{ lat: number; lon: number } | null>('location', null);
    if (saved) {
      setQibla(bearing(saved.lat, saved.lon));
      setStatus('ready');
      return;
    }
    if (!navigator.geolocation) {
      setError(t('qibla_location_unsupported'));
      setStatus('error');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      p => {
        const { latitude, longitude } = p.coords;
        ls.set('location', { lat: latitude, lon: longitude });
        setQibla(bearing(latitude, longitude));
        setStatus('ready');
      },
      () => {
        setError(t('qibla_location_error'));
        setStatus('error');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }, [t]);

  useEffect(() => {
    const DOE: any = (window as any).DeviceOrientationEvent;
    if (!DOE) {
      setStatus('no-compass');
      return;
    }
    if (typeof DOE.requestPermission === 'function') {
      DOE.requestPermission()
        .then((res: string) => {
          if (res !== 'granted') setStatus('need-permission');
        })
        .catch(() => setStatus('need-permission'));
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const onOrient = (e: any) => {
      if (cancelled) return;
      let raw: number | null = null;
      if (typeof e.webkitCompassHeading === 'number' && e.webkitCompassHeading >= 0) {
        raw = e.webkitCompassHeading;
      } else if (typeof e.alpha === 'number' && e.alpha !== null) {
        raw = (360 - e.alpha) % 360;
      }
      if (raw === null) return;
      const now = Date.now();
      const last = lastRef.current;
      if (last.h != null && now - last.t < 30) return;
      let smooth: number;
      if (last.h == null) {
        smooth = raw;
      } else {
        let diff = raw - last.h;
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        smooth = (last.h + 0.3 * diff + 360) % 360;
      }
      lastRef.current = { h: smooth, t: now };
      setHeading(smooth);
    };
    window.addEventListener('deviceorientationabsolute', onOrient, true);
    window.addEventListener('deviceorientation', onOrient, true);
    return () => {
      cancelled = true;
      window.removeEventListener('deviceorientationabsolute', onOrient, true);
      window.removeEventListener('deviceorientation', onOrient, true);
    };
  }, []);

  const requestPermission = async () => {
    const DOE: any = (window as any).DeviceOrientationEvent;
    if (!DOE?.requestPermission) return;
    try {
      const res = await DOE.requestPermission();
      if (res === 'granted') setStatus('ready');
    } catch { /* ignore */ }
  };

  const qiblaRotation = qibla != null ? qibla : 0;
  const needleRotation = qibla != null && heading != null
    ? ((qibla - heading) + 360) % 360
    : qiblaRotation;

  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('qibla_title')}</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          {heading != null
            ? t('qibla_active')
            : status === 'need-permission'
              ? t('qibla_need_permission')
              : status === 'no-compass'
                ? t('qibla_no_compass')
                : t('qibla_default')}
        </p>
      </div>

      {error && <div className="card p-4 text-red-500 text-sm">{error}</div>}

      {qibla == null && !error && (
        <p className="text-[var(--muted)]">{t('qibla_getting_location')}</p>
      )}

      {qibla != null && (
        <>
          <div className="relative w-72 h-72 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-[var(--border)] bg-[var(--card)] shadow-inner" />

            {/* اتجاهات البوصلة — N/S/E/W بالترجمة */}
            <span className="absolute top-2 left-1/2 -translate-x-1/2 text-sm text-red-500 font-bold">
              {t('compass_n')}
            </span>
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-[var(--muted)] font-semibold">
              {t('compass_s')}
            </span>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--muted)] font-semibold">
              {t('compass_e')}
            </span>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[var(--muted)] font-semibold">
              {t('compass_w')}
            </span>

            {Array.from({ length: 36 }).map((_, i) => {
              const deg = i * 10;
              const isMajor = deg % 30 === 0;
              return (
                <div
                  key={i}
                  className="absolute top-0 left-1/2 -translate-x-1/2 origin-bottom"
                  style={{ height: '50%', transform: `translateX(-50%) rotate(${deg}deg)` }}
                >
                  <div className={`w-0.5 ${isMajor ? 'h-3 bg-[var(--muted)]' : 'h-1.5 bg-[var(--border)]'} mt-2`} />
                </div>
              );
            })}

            <div
              className="absolute inset-0 flex items-start justify-center pointer-events-none"
              style={{
                transform: `rotate(${needleRotation}deg)`,
                transition: heading != null ? 'transform 0.12s linear' : 'transform 1s ease-out'
              }}
            >
              <div className="mt-4 flex flex-col items-center">
                <i className="bi bi-caret-up-fill text-brand-600 text-5xl drop-shadow-lg" />
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center border-2 border-brand-500/30">
                <span className="text-3xl">🕋</span>
              </div>
            </div>
          </div>

          <div className="card p-4 space-y-1">
            <div className="text-lg font-semibold text-brand-600">
              <i className="bi bi-compass" /> {t('qibla_from_north', { deg: Math.round(qibla) })}
            </div>
            {heading != null && (
              <div className="text-xs text-[var(--muted)]">
                {t('qibla_device_heading', { deg: Math.round(heading) })}
                {Math.abs(((qibla - heading + 540) % 360) - 180) < 10 && ` — ${t('qibla_facing')}`}
              </div>
            )}
          </div>

          {status === 'need-permission' && (
            <button
              onClick={requestPermission}
              className="px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold"
            >
              <i className="bi bi-compass" /> {t('qibla_enable')}
            </button>
          )}
        </>
      )}
    </div>
  );
}