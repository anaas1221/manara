import { useEffect, useState, useRef } from 'react';
import { db } from '../lib/db';

interface TasbeehStyle {
  id: string;
  name: string;
  beadColor: string;
  beadSize: number;
  stringColor: string;
  hasTassel: boolean;
  beadShape?: 'circle' | 'oval';
  beadCount: number;
}

const STYLES: TasbeehStyle[] = [
  { id: 'emerald', name: 'زمردي',   beadColor: '#1f6d52', beadSize: 24, stringColor: '#d4af37', hasTassel: true,  beadCount: 33 },
  { id: 'wood',    name: 'خشبي',    beadColor: '#8b5a2b', beadSize: 26, stringColor: '#3a2416', hasTassel: true,  beadCount: 33 },
  { id: 'pearl',   name: 'لؤلؤي',   beadColor: '#f5f5dc', beadSize: 22, stringColor: '#c9b878', hasTassel: false, beadCount: 33 },
  { id: 'black',   name: 'أسود',    beadColor: '#1a1a1a', beadSize: 24, stringColor: '#666',    hasTassel: true,  beadCount: 33 },
  { id: 'rose',    name: 'وردي',    beadColor: '#c48b9f', beadSize: 22, stringColor: '#8b5a68', hasTassel: true,  beadCount: 33 },
  { id: 'blue',    name: 'أزرق',    beadColor: '#2c5f8d', beadSize: 24, stringColor: '#d4af37', hasTassel: true,  beadCount: 33 },
  { id: 'gold',    name: 'ذهبي',    beadColor: '#d4af37', beadSize: 22, stringColor: '#8b6914', hasTassel: true,  beadCount: 33 },
  { id: 'silver',  name: 'فضي',     beadColor: '#c0c0c0', beadSize: 22, stringColor: '#808080', hasTassel: false, beadCount: 33 },
  { id: 'purple',  name: 'بنفسجي',  beadColor: '#7b4a95', beadSize: 24, stringColor: '#4a2d5c', hasTassel: true,  beadCount: 33 },
  { id: 'coral',   name: 'مرجاني',  beadColor: '#e07a5f', beadSize: 24, stringColor: '#a0522d', hasTassel: true,  beadCount: 33 },
  { id: 'jade',    name: 'يشبي',    beadColor: '#00a86b', beadSize: 22, stringColor: '#006644', hasTassel: true,  beadCount: 33 },
  { id: 'amber',   name: 'عنبر',    beadColor: '#ffbf00', beadSize: 24, stringColor: '#b38600', hasTassel: true,  beadCount: 33 },
  { id: '99-beads', name: 'تسعة وتسعين', beadColor: '#1f6d52', beadSize: 18, stringColor: '#d4af37', hasTassel: true, beadCount: 99 },
  { id: 'long',    name: 'طويلة 1000', beadColor: '#8b5a2b', beadSize: 14, stringColor: '#3a2416', hasTassel: true, beadCount: 100 }
];

const PRESETS = [
  { text: 'سبحان الله', target: 33 },
  { text: 'الحمد لله', target: 33 },
  { text: 'الله أكبر', target: 34 },
  { text: 'أستغفر الله', target: 100 },
  { text: 'لا إله إلا الله', target: 100 },
  { text: 'لا حول ولا قوة إلا بالله', target: 100 },
  { text: 'سبحان الله وبحمده', target: 100 },
  { text: 'سبحان الله العظيم', target: 33 },
  { text: 'سبحان الله وبحمده سبحان الله العظيم', target: 100 },
  { text: 'اللهم صلِّ على محمد', target: 100 },
  { text: 'اللهم صلِّ وسلم على نبينا محمد', target: 100 },
  { text: 'لا إله إلا الله وحده لا شريك له', target: 10 },
  { text: 'لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير', target: 100 },
  { text: 'حسبي الله ونعم الوكيل', target: 100 },
  { text: 'اللهم اغفر لي', target: 100 },
  { text: 'أستغفر الله العظيم وأتوب إليه', target: 100 },
  { text: 'يا حي يا قيوم برحمتك أستغيث', target: 100 },
  { text: 'اللهم إني أسألك الجنة وأعوذ بك من النار', target: 100 },
  { text: 'سبحان الله والحمد لله ولا إله إلا الله والله أكبر', target: 100 },
  { text: 'اللهم أجرني من النار', target: 100 },
  { text: 'حسبنا الله ونعم الوكيل', target: 100 },
  { text: 'الحمد لله الذي بنعمته تتم الصالحات', target: 100 }
];

export default function Tasbeeh() {
  const [dhikr, setDhikr] = useState(PRESETS[0].text);
  const [target, setTarget] = useState(PRESETS[0].target);
  const [count, setCount] = useState(0);
  const [todayTotal, setTodayTotal] = useState(0);
  const [styleId, setStyleId] = useState('emerald');
  const [showCustom, setShowCustom] = useState(false);
  const [customText, setCustomText] = useState('');
  const [soundOn, setSoundOn] = useState(true);
  const audioRef = useRef<AudioContext | null>(null);

  const style = STYLES.find(s => s.id === styleId) || STYLES[0];
  const beadCount = style.beadCount;

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    db.tasbeeh.where('date').equals(today).toArray()
      .then(rows => setTodayTotal(rows.reduce((s, r) => s + r.count, 0)));
  }, [count]);

  useEffect(() => {
    const saved = localStorage.getItem('manara:tasbeeh-style');
    if (saved && STYLES.some(s => s.id === saved)) setStyleId(saved);
    const savedSound = localStorage.getItem('manara:tasbeeh-sound');
    if (savedSound !== null) setSoundOn(savedSound === '1');
  }, []);

  const playTick = () => {
    if (!soundOn) return;
    try {
      if (!audioRef.current) audioRef.current = new AudioContext();
      const ctx = audioRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 800 + Math.random() * 200;
      gain.gain.value = 0.08;
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain).connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.08);
    } catch { /* silent */ }
  };

  const increment = () => {
    setCount(c => c + 1);
    if (navigator.vibrate) navigator.vibrate(10);
    playTick();
  };

  const reset = async () => {
    if (count > 0) {
      await db.tasbeeh.add({ dhikr, count, date: new Date().toISOString().slice(0, 10), createdAt: Date.now() });
    }
    setCount(0);
  };

  const changeStyle = (id: string) => { setStyleId(id); localStorage.setItem('manara:tasbeeh-style', id); };
  const toggleSound = () => { const v = !soundOn; setSoundOn(v); localStorage.setItem('manara:tasbeeh-sound', v ? '1' : '0'); };

  const currentBeadIdx = count % beadCount;
  const progress = Math.min(count / target, 1);

  return (
    <div className="space-y-5 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">السبحة</h1>
        <button onClick={toggleSound} className={`p-2 rounded-lg hover:bg-[var(--card)] ${soundOn ? 'text-brand-600' : 'text-[var(--muted)]'}`} aria-label="الصوت">
          <i className={`bi ${soundOn ? 'bi-volume-up' : 'bi-volume-mute'} text-lg`} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map(p => (
          <button key={p.text} onClick={() => { setDhikr(p.text); setTarget(p.target); setCount(0); }}
            className={`px-3 py-1.5 rounded-full text-xs border transition ${dhikr === p.text ? 'bg-brand-600 text-white border-brand-600' : 'border-[var(--border)]'}`}>
            {p.text}
          </button>
        ))}
        <button onClick={() => setShowCustom(true)} className="px-3 py-1.5 rounded-full text-xs border border-dashed border-[var(--border)] hover:border-brand-500">
          <i className="bi bi-plus-lg" /> مخصص
        </button>
      </div>

      {showCustom && (
        <div className="card p-4 space-y-3">
          <input type="text" value={customText} onChange={e => setCustomText(e.target.value)} placeholder="اكتب ذكرك هنا..."
            className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] outline-none focus:border-brand-500 text-sm" />
          <div className="flex gap-2">
            <button onClick={() => { setShowCustom(false); setCustomText(''); }} className="flex-1 py-2 rounded-lg border border-[var(--border)] text-sm">إلغاء</button>
            <button onClick={() => {
              if (!customText.trim()) return;
              setDhikr(customText.trim()); setTarget(33); setCount(0);
              setShowCustom(false); setCustomText('');
            }} className="flex-1 py-2 rounded-lg bg-brand-600 text-white text-sm">حفظ</button>
          </div>
        </div>
      )}

      <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center">
        <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full">
          <circle cx="150" cy="150" r="120" fill="none" stroke={style.stringColor} strokeWidth="1.5" opacity="0.4" />
          {Array.from({ length: beadCount }).map((_, i) => {
            const angle = (i / beadCount) * 2 * Math.PI - Math.PI / 2;
            const cx = 150 + 120 * Math.cos(angle);
            const cy = 150 + 120 * Math.sin(angle);
            const isActive = i === currentBeadIdx && count > 0;
            const isPast = count > 0 && (currentBeadIdx > i || (currentBeadIdx === 0 && count > 0 && i > 0));
            const r = style.beadSize / 2 - 4;
            return (
              <g key={i}>
                <circle cx={cx} cy={cy} r={r}
                  fill={isActive ? '#d4af37' : style.beadColor}
                  stroke={isActive ? '#b8942e' : 'rgba(0,0,0,0.15)'} strokeWidth="1.5"
                  style={{
                    transition: 'all 0.2s',
                    filter: isActive ? 'drop-shadow(0 0 8px rgba(212,175,55,0.9))' : 'none',
                    opacity: isPast ? 0.55 : 1
                  }} />
                <circle cx={cx - 2} cy={cy - 2} r={r - 3} fill="rgba(255,255,255,0.25)" opacity={isPast ? 0.2 : 0.6} />
              </g>
            );
          })}
          {style.hasTassel && (
            <g>
              <line x1="150" y1="270" x2="150" y2="290" stroke={style.stringColor} strokeWidth="2" />
              <circle cx="150" cy="293" r="4" fill={style.beadColor} />
            </g>
          )}
        </svg>

        <button onClick={increment} className="relative w-40 h-40 rounded-full flex flex-col items-center justify-center active:scale-[0.97] transition-transform z-10" aria-label="اضغط للتسبيح">
          <div className="absolute inset-0 rounded-full bg-[var(--card)] border-2 border-[var(--border)] shadow-xl" />
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="var(--border)" strokeWidth="3" />
            <circle cx="50" cy="50" r="46" fill="none" stroke="#1f6d52" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={`${progress * 289} 289`} style={{ transition: 'stroke-dasharray 0.3s' }} />
          </svg>
          <span className="relative text-[10px] text-[var(--muted)] mb-1 leading-tight px-3 text-center line-clamp-2">{dhikr}</span>
          <span className="relative text-5xl font-bold tabular-nums">{count}</span>
          <span className="relative text-[10px] text-[var(--muted)] mt-1">الهدف: {target}</span>
        </button>
      </div>

      <div>
        <p className="text-xs text-[var(--muted)] mb-2">شكل السبحة ({STYLES.length} نمط):</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {STYLES.map(s => (
            <button key={s.id} onClick={() => changeStyle(s.id)}
              className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg border text-[11px] transition ${
                styleId === s.id ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/30' : 'border-[var(--border)] hover:border-brand-500'
              }`}>
              <span className="w-5 h-5 rounded-full" style={{ background: s.beadColor, boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <p className="text-sm text-[var(--muted)]">
          <i className="bi bi-calendar-check" /> اليوم: <span className="font-semibold text-brand-600">{todayTotal}</span>
        </p>
        <button onClick={reset} disabled={count === 0} className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm hover:bg-[var(--card)] disabled:opacity-40">
          <i className="bi bi-arrow-counterclockwise" /> تصفير
        </button>
      </div>
    </div>
  );
}