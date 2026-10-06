import { useState, useEffect, useMemo, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { db } from '../lib/db';

// ============================================
// الأنواع
// ============================================
interface SurahMeta {
  id: number;
  name: string;
  verses: number;
  type: 'مكية' | 'مدنية';
}

interface VerseResult {
  surahNumber: number;
  surahName: string;
  verseNumber: number;
  text: string;
}

type Ayah = { numberInSurah: number; text: string };

// ============================================
// بيانات السور
// ============================================
const SURAHS: SurahMeta[] = [
  { id: 1,   name: 'الفاتحة',   verses: 7,   type: 'مكية' },
  { id: 2,   name: 'البقرة',    verses: 286, type: 'مدنية' },
  { id: 3,   name: 'آل عمران',  verses: 200, type: 'مدنية' },
  { id: 4,   name: 'النساء',    verses: 176, type: 'مدنية' },
  { id: 5,   name: 'المائدة',   verses: 120, type: 'مدنية' },
  { id: 6,   name: 'الأنعام',   verses: 165, type: 'مكية' },
  { id: 7,   name: 'الأعراف',   verses: 206, type: 'مكية' },
  { id: 8,   name: 'الأنفال',   verses: 75,  type: 'مدنية' },
  { id: 9,   name: 'التوبة',    verses: 129, type: 'مدنية' },
  { id: 10,  name: 'يونس',      verses: 109, type: 'مكية' },
  { id: 11,  name: 'هود',       verses: 123, type: 'مكية' },
  { id: 12,  name: 'يوسف',      verses: 111, type: 'مكية' },
  { id: 13,  name: 'الرعد',     verses: 43,  type: 'مدنية' },
  { id: 14,  name: 'إبراهيم',   verses: 52,  type: 'مكية' },
  { id: 15,  name: 'الحجر',     verses: 99,  type: 'مكية' },
  { id: 16,  name: 'النحل',     verses: 128, type: 'مكية' },
  { id: 17,  name: 'الإسراء',   verses: 111, type: 'مكية' },
  { id: 18,  name: 'الكهف',     verses: 110, type: 'مكية' },
  { id: 19,  name: 'مريم',      verses: 98,  type: 'مكية' },
  { id: 20,  name: 'طه',        verses: 135, type: 'مكية' },
  { id: 21,  name: 'الأنبياء',  verses: 112, type: 'مكية' },
  { id: 22,  name: 'الحج',      verses: 78,  type: 'مدنية' },
  { id: 23,  name: 'المؤمنون',  verses: 118, type: 'مكية' },
  { id: 24,  name: 'النور',     verses: 64,  type: 'مدنية' },
  { id: 25,  name: 'الفرقان',   verses: 77,  type: 'مكية' },
  { id: 26,  name: 'الشعراء',   verses: 227, type: 'مكية' },
  { id: 27,  name: 'النمل',     verses: 93,  type: 'مكية' },
  { id: 28,  name: 'القصص',     verses: 88,  type: 'مكية' },
  { id: 29,  name: 'العنكبوت',  verses: 69,  type: 'مكية' },
  { id: 30,  name: 'الروم',     verses: 60,  type: 'مكية' },
  { id: 31,  name: 'لقمان',     verses: 34,  type: 'مكية' },
  { id: 32,  name: 'السجدة',    verses: 30,  type: 'مكية' },
  { id: 33,  name: 'الأحزاب',   verses: 73,  type: 'مدنية' },
  { id: 34,  name: 'سبأ',       verses: 54,  type: 'مكية' },
  { id: 35,  name: 'فاطر',      verses: 45,  type: 'مكية' },
  { id: 36,  name: 'يس',        verses: 83,  type: 'مكية' },
  { id: 37,  name: 'الصافات',   verses: 182, type: 'مكية' },
  { id: 38,  name: 'ص',         verses: 88,  type: 'مكية' },
  { id: 39,  name: 'الزمر',     verses: 75,  type: 'مكية' },
  { id: 40,  name: 'غافر',      verses: 85,  type: 'مكية' },
  { id: 41,  name: 'فصلت',      verses: 54,  type: 'مكية' },
  { id: 42,  name: 'الشورى',    verses: 53,  type: 'مكية' },
  { id: 43,  name: 'الزخرف',    verses: 89,  type: 'مكية' },
  { id: 44,  name: 'الدخان',    verses: 59,  type: 'مكية' },
  { id: 45,  name: 'الجاثية',   verses: 37,  type: 'مكية' },
  { id: 46,  name: 'الأحقاف',   verses: 35,  type: 'مكية' },
  { id: 47,  name: 'محمد',      verses: 38,  type: 'مدنية' },
  { id: 48,  name: 'الفتح',     verses: 29,  type: 'مدنية' },
  { id: 49,  name: 'الحجرات',   verses: 18,  type: 'مدنية' },
  { id: 50,  name: 'ق',         verses: 45,  type: 'مكية' },
  { id: 51,  name: 'الذاريات',  verses: 60,  type: 'مكية' },
  { id: 52,  name: 'الطور',     verses: 49,  type: 'مكية' },
  { id: 53,  name: 'النجم',     verses: 62,  type: 'مكية' },
  { id: 54,  name: 'القمر',     verses: 55,  type: 'مكية' },
  { id: 55,  name: 'الرحمن',    verses: 78,  type: 'مدنية' },
  { id: 56,  name: 'الواقعة',   verses: 96,  type: 'مكية' },
  { id: 57,  name: 'الحديد',    verses: 29,  type: 'مدنية' },
  { id: 58,  name: 'المجادلة',  verses: 22,  type: 'مدنية' },
  { id: 59,  name: 'الحشر',     verses: 24,  type: 'مدنية' },
  { id: 60,  name: 'الممتحنة',  verses: 13,  type: 'مدنية' },
  { id: 61,  name: 'الصف',      verses: 14,  type: 'مدنية' },
  { id: 62,  name: 'الجمعة',    verses: 11,  type: 'مدنية' },
  { id: 63,  name: 'المنافقون', verses: 11,  type: 'مدنية' },
  { id: 64,  name: 'التغابن',   verses: 18,  type: 'مدنية' },
  { id: 65,  name: 'الطلاق',    verses: 12,  type: 'مدنية' },
  { id: 66,  name: 'التحريم',   verses: 12,  type: 'مدنية' },
  { id: 67,  name: 'الملك',     verses: 30,  type: 'مكية' },
  { id: 68,  name: 'القلم',     verses: 52,  type: 'مكية' },
  { id: 69,  name: 'الحاقة',    verses: 52,  type: 'مكية' },
  { id: 70,  name: 'المعارج',   verses: 44,  type: 'مكية' },
  { id: 71,  name: 'نوح',       verses: 28,  type: 'مكية' },
  { id: 72,  name: 'الجن',      verses: 28,  type: 'مكية' },
  { id: 73,  name: 'المزمل',    verses: 20,  type: 'مكية' },
  { id: 74,  name: 'المدثر',    verses: 56,  type: 'مكية' },
  { id: 75,  name: 'القيامة',   verses: 40,  type: 'مكية' },
  { id: 76,  name: 'الإنسان',   verses: 31,  type: 'مدنية' },
  { id: 77,  name: 'المرسلات',  verses: 50,  type: 'مكية' },
  { id: 78,  name: 'النبأ',     verses: 40,  type: 'مكية' },
  { id: 79,  name: 'النازعات',  verses: 46,  type: 'مكية' },
  { id: 80,  name: 'عبس',       verses: 42,  type: 'مكية' },
  { id: 81,  name: 'التكوير',   verses: 29,  type: 'مكية' },
  { id: 82,  name: 'الانفطار',  verses: 19,  type: 'مكية' },
  { id: 83,  name: 'المطففين',  verses: 36,  type: 'مكية' },
  { id: 84,  name: 'الانشقاق',  verses: 25,  type: 'مكية' },
  { id: 85,  name: 'البروج',    verses: 22,  type: 'مكية' },
  { id: 86,  name: 'الطارق',    verses: 17,  type: 'مكية' },
  { id: 87,  name: 'الأعلى',    verses: 19,  type: 'مكية' },
  { id: 88,  name: 'الغاشية',   verses: 26,  type: 'مكية' },
  { id: 89,  name: 'الفجر',     verses: 30,  type: 'مكية' },
  { id: 90,  name: 'البلد',     verses: 20,  type: 'مكية' },
  { id: 91,  name: 'الشمس',     verses: 15,  type: 'مكية' },
  { id: 92,  name: 'الليل',     verses: 21,  type: 'مكية' },
  { id: 93,  name: 'الضحى',     verses: 11,  type: 'مكية' },
  { id: 94,  name: 'الشرح',     verses: 8,   type: 'مكية' },
  { id: 95,  name: 'التين',     verses: 8,   type: 'مكية' },
  { id: 96,  name: 'العلق',     verses: 19,  type: 'مكية' },
  { id: 97,  name: 'القدر',     verses: 5,   type: 'مكية' },
  { id: 98,  name: 'البينة',    verses: 8,   type: 'مدنية' },
  { id: 99,  name: 'الزلزلة',   verses: 8,   type: 'مدنية' },
  { id: 100, name: 'العاديات',  verses: 11,  type: 'مكية' },
  { id: 101, name: 'القارعة',   verses: 11,  type: 'مكية' },
  { id: 102, name: 'التكاثر',   verses: 8,   type: 'مكية' },
  { id: 103, name: 'العصر',     verses: 3,   type: 'مكية' },
  { id: 104, name: 'الهمزة',    verses: 9,   type: 'مكية' },
  { id: 105, name: 'الفيل',     verses: 5,   type: 'مكية' },
  { id: 106, name: 'قريش',      verses: 4,   type: 'مكية' },
  { id: 107, name: 'الماعون',   verses: 7,   type: 'مكية' },
  { id: 108, name: 'الكوثر',    verses: 3,   type: 'مكية' },
  { id: 109, name: 'الكافرون',  verses: 6,   type: 'مكية' },
  { id: 110, name: 'النصر',     verses: 3,   type: 'مدنية' },
  { id: 111, name: 'المسد',     verses: 5,   type: 'مكية' },
  { id: 112, name: 'الإخلاص',   verses: 4,   type: 'مكية' },
  { id: 113, name: 'الفلق',     verses: 5,   type: 'مكية' },
  { id: 114, name: 'الناس',     verses: 6,   type: 'مكية' }
];

// ============================================
// روابط القرآن الكامل
// ============================================
const FULL_QURAN_LINKS = [
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/%D8%A7%D9%84%D9%82%D8%B1%D8%A2%D9%86_%D8%A7%D9%84%D9%83%D8%B1%D9%8A%D9%85_%D9%88%D9%81%D9%82_%D8%B1%D9%88%D8%A7%D9%8A%D8%A9_%D8%AD%D9%81%D8%B5_%D8%B9%D9%86_%D8%B9%D8%A7%D8%B5%D9%85_%28%D9%85%D8%B5%D8%AD%D9%81_%D9%85%D8%AC%D9%85%D8%B9_%D8%A7%D9%84%D9%85%D9%84%D9%83_%D9%81%D9%87%D8%AF_%D8%A7%D9%84%D8%A3%D8%B2%D8%B1%D9%82_%D8%A7%D9%84%D8%AC%D9%88%D8%A7%D9%85%D8%B9%D9%8A%29_%28IA_Quran_Hafs-L%29.pdf',
    title: 'مصحف المدينة النبوية',
    subtitle: 'إصدار مجمع الملك فهد — رواية حفص',
    size: '~50 MB'
  },
  {
    url: 'https://archive.org/download/holy-quran-beautiful-arabic-text/holy-quran-beautiful-arabic-text.pdf',
    title: 'المصحف الشريف — نسخة بديلة',
    subtitle: 'نص عربي واضح — مناسب للقراءة على الشاشة',
    size: '~30 MB'
  }
];

// ============================================
// الكاش
// ============================================
const pdfCache = new Map<number, Blob>();

// ============================================
// أدوات مساعدة
// ============================================
function normalizeArabic(s: string): string {
  return s
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
    .replace(/\u0640/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/ة/g, 'ه');
}

function buildFuzzyRegex(query: string): RegExp {
  const charGroups: Record<string, string> = {
    'ا': '[اأإآٱ]', 'أ': '[اأإآٱ]', 'إ': '[اأإآٱ]', 'آ': '[اأإآٱ]', 'ٱ': '[اأإآٱ]',
    'ي': '[يى]', 'ى': '[يى]',
    'ه': '[هة]', 'ة': '[هة]',
    'و': '[وؤ]', 'ؤ': '[وؤ]',
    'ئ': '[ئي]'
  };
  const DIACRITICS = '[\\u064B-\\u065F\\u0670\\u06D6-\\u06ED\\u0640]*';
  const pattern = query
    .split('')
    .map(c => {
      const base = charGroups[c] || c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return base + DIACRITICS;
    })
    .join('');
  return new RegExp(pattern, 'gi');
}

async function fetchSurahText(surahId: number): Promise<Ayah[]> {
  const cacheKey = `surah-text-${surahId}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    try { return JSON.parse(cached) as Ayah[]; } catch { /* ignore */ }
  }
  const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahId}/quran-uthmani`);
  const json = await res.json();
  if (!json?.data?.ayahs) throw new Error('تعذر التحميل');
  const ayahs = json.data.ayahs as Ayah[];
  try { sessionStorage.setItem(cacheKey, JSON.stringify(ayahs)); } catch { /* ignore */ }
  return ayahs;
}

// تظليل الكلمة المبحوث عنها (بدون تشكيل)
function highlightText(text: string, query: string) {
  const q = query.trim();
  if (!q || q.length < 2) return text;

  const regex = buildFuzzyRegex(q);
  const parts: Array<{ text: string; match: boolean }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  regex.lastIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index), match: false });
    }
    parts.push({ text: match[0], match: true });
    lastIndex = match.index + match[0].length;
    if (match[0].length === 0) regex.lastIndex++;
  }
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), match: false });
  }

  return (
    <>
      {parts.map((p, i) =>
        p.match ? (
          <mark key={i} className="bg-yellow-300 dark:bg-yellow-600/70 text-inherit px-0.5 rounded font-bold">
            {p.text}
          </mark>
        ) : (
          <span key={i}>{p.text}</span>
        )
      )}
    </>
  );
}

function buildSurahHTML(surah: SurahMeta, ayahs: Ayah[]) {
  return `
    <div style="font-family: 'Noto Naskh Arabic', serif; direction: rtl; padding: 20px; background: #fff; color: #0f172a;">
      <h1 style="text-align: center; color: #1f6d52; border-bottom: 2px solid #d4af37; padding-bottom: 8px; margin-bottom: 14px; font-size: 22px;">
        سورة ${surah.name}
      </h1>
      <div style="line-height: 2; font-size: 17px; text-align: justify;">
        ${ayahs.map(a => `<span style="margin-left:3px;">${a.text}<span style="color:#1f6d52;font-weight:bold;font-size:12px;">﴿${a.numberInSurah}﴾</span></span>`).join('')}
      </div>
      <div style="margin-top:20px;padding-top:10px;border-top:1px solid #e4e7e5;text-align:center;color:#64748b;font-size:11px;">
        <strong style="color:#1f6d52;">منارة</strong> — منصة إسلامية شاملة
      </div>
    </div>`;
}

function smartSearch(query: string): SurahMeta[] {
  const q = query.trim();
  if (!q) return SURAHS;

  const verseMatch = q.match(/^(\d+)\s*[:،]\s*(\d+)$/);
  if (verseMatch) return SURAHS.filter(x => x.id === parseInt(verseMatch[1]));

  if (/^\d+$/.test(q)) return SURAHS.filter(s => s.id === parseInt(q));

  const normalizedQ = normalizeArabic(q);
  return SURAHS.filter(s => normalizeArabic(s.name).includes(normalizedQ));
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ============================================
// المكوّن الرئيسي
// ============================================
export default function Quran() {
  const [query, setQuery] = useState('');
  const [activeSurah, setActiveSurah] = useState<SurahMeta | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfProgress, setPdfProgress] = useState(0);
  const [prefetchDone, setPrefetchDone] = useState(false);
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());
  const [lastRead, setLastRead] = useState<{ surah: number; ayah: number } | null>(null);

  const [verseResults, setVerseResults] = useState<VerseResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchMode, setSearchMode] = useState<'surahs' | 'verses'>('surahs');

  const [matchedAyahs, setMatchedAyahs] = useState<number[]>([]);
  const [currentMatchIdx, setCurrentMatchIdx] = useState(0);
  const [activeQuery, setActiveQuery] = useState('');

  const ayahRefs = useRef<Map<number, HTMLSpanElement>>(new Map());

  // Prefetch + بيانات محفوظة
  useEffect(() => {
    const conn = (navigator as any).connection;
    if (conn?.effectiveType === '4g' || !conn) {
      FULL_QURAN_LINKS.forEach(link => {
        const l = document.createElement('link');
        l.rel = 'prefetch';
        l.href = link.url;
        l.as = 'document';
        document.head.appendChild(l);
      });
      setTimeout(() => setPrefetchDone(true), 3000);
    }
    db.bookmarks.where('type').equals('favorite').toArray().then(rows => {
      const set = new Set<number>();
      rows.forEach(r => {
        const m = r.ref.match(/^quran:(\d+)/);
        if (m) set.add(parseInt(m[1]));
      });
      setBookmarks(set);
    });
    db.progress.get('quran').then(p => {
      if (p) setLastRead({ surah: p.surah, ayah: p.ayah });
    });
  }, []);

  // بحث في الآيات
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2 || /^\d+$/.test(q) || /[:،]/.test(q)) {
      setVerseResults([]);
      setSearching(false);
      return;
    }

    const cacheKey = `search:${q}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      try {
        setVerseResults(JSON.parse(cached));
        setSearching(false);
        return;
      } catch { /* ignore */ }
    }

    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.alquran.cloud/v1/search/${encodeURIComponent(q)}/all/quran-uthmani`
        );
        const json = await res.json();
        const matches = json?.data?.matches || [];
        const results: VerseResult[] = matches.slice(0, 60).map((m: any) => ({
          surahNumber: m.surah.number,
          surahName: m.surah.name.replace(/^(سُورَةُ|سورة)\s*/, ''),
          verseNumber: m.numberInSurah,
          text: m.text
        }));
        setVerseResults(results);
        try { sessionStorage.setItem(cacheKey, JSON.stringify(results)); } catch { /* ignore */ }
      } catch {
        setVerseResults([]);
      } finally {
        setSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // تبديل تلقائي لوضع الآيات
  useEffect(() => {
    if (query.trim().length < 2) return;
    const surahMatches = smartSearch(query);
    if (surahMatches.length === 0 && verseResults.length > 0) {
      setSearchMode('verses');
    } else if (surahMatches.length > 0) {
      setSearchMode('surahs');
    }
  }, [verseResults, query]);

  // الآيات المطابقة داخل السورة المفتوحة
  useEffect(() => {
    if (ayahs && activeQuery && activeQuery.trim().length >= 2) {
      const regex = buildFuzzyRegex(activeQuery.trim());
      const matches = ayahs
        .filter(a => { regex.lastIndex = 0; return regex.test(a.text); })
        .map(a => a.numberInSurah);
      setMatchedAyahs(matches);
    } else {
      setMatchedAyahs([]);
    }
  }, [ayahs, activeQuery]);

  // Scroll للآية الحالية
  useEffect(() => {
    if (matchedAyahs.length > 0 && ayahs) {
      const targetAyah = matchedAyahs[currentMatchIdx];
      if (targetAyah) {
        const el = ayahRefs.current.get(targetAyah);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('ring-2', 'ring-yellow-400', 'rounded', 'bg-yellow-100', 'dark:bg-yellow-900/30');
            setTimeout(() => {
              el.classList.remove('ring-2', 'ring-yellow-400', 'bg-yellow-100', 'dark:bg-yellow-900/30');
            }, 2000);
          }, 200);
        }
      }
    }
  }, [matchedAyahs, currentMatchIdx, ayahs]);

  const filtered = useMemo(() => smartSearch(query), [query]);

  const openSurah = async (surah: SurahMeta, scrollAyah?: number, searchQuery?: string) => {
    setActiveSurah(surah);
    setAyahs(null);
    setError(null);
    setLoading(true);
    setActiveQuery(searchQuery ?? '');
    setCurrentMatchIdx(0);

    try {
      const data = await fetchSurahText(surah.id);
      setAyahs(data);

      if (searchQuery && searchQuery.trim().length >= 2) {
        const regex = buildFuzzyRegex(searchQuery.trim());
        const matches = data
          .filter(a => { regex.lastIndex = 0; return regex.test(a.text); })
          .map(a => a.numberInSurah);
        setMatchedAyahs(matches);
        if (scrollAyah && matches.includes(scrollAyah)) {
          setCurrentMatchIdx(matches.indexOf(scrollAyah));
        } else if (matches.length > 0) {
          setCurrentMatchIdx(0);
        }
      } else if (scrollAyah) {
        setMatchedAyahs([scrollAyah]);
        setCurrentMatchIdx(0);
      }

      await db.progress.put({
        key: 'quran',
        surah: surah.id,
        ayah: scrollAyah ?? 1,
        updatedAt: Date.now()
      });
      setLastRead({ surah: surah.id, ayah: scrollAyah ?? 1 });
    } catch {
      setError('تعذر تحميل السورة. تأكد من اتصالك بالإنترنت.');
    } finally {
      setLoading(false);
    }
  };

  const closeSurah = () => {
    setActiveSurah(null);
    setAyahs(null);
    setError(null);
    setCopied(false);
    setPdfLoading(false);
    setPdfProgress(0);
    setMatchedAyahs([]);
    setCurrentMatchIdx(0);
    setActiveQuery('');
    ayahRefs.current.clear();
  };

  const goToSurah = (delta: number) => {
    if (!activeSurah) return;
    const target = SURAHS.find(s => s.id === activeSurah.id + delta);
    if (target) openSurah(target);
  };

  const nextMatch = () => {
    if (matchedAyahs.length === 0) return;
    setCurrentMatchIdx((currentMatchIdx + 1) % matchedAyahs.length);
  };
  const prevMatch = () => {
    if (matchedAyahs.length === 0) return;
    setCurrentMatchIdx((currentMatchIdx - 1 + matchedAyahs.length) % matchedAyahs.length);
  };

  const toggleBookmark = async () => {
    if (!activeSurah) return;
    const ref = `quran:${activeSurah.id}`;
    const existing = await db.bookmarks.where({ ref, type: 'favorite' }).first();
    if (existing) {
      await db.bookmarks.delete(existing.id!);
      const next = new Set(bookmarks);
      next.delete(activeSurah.id);
      setBookmarks(next);
    } else {
      await db.bookmarks.add({
        ref,
        type: 'favorite',
        label: activeSurah.name,
        createdAt: Date.now()
      });
      const next = new Set(bookmarks);
      next.add(activeSurah.id);
      setBookmarks(next);
    }
  };

  const downloadPDF = async () => {
    if (!activeSurah || !ayahs) return;
    const cached = pdfCache.get(activeSurah.id);
    if (cached) {
      triggerDownload(cached, `منارة - سورة ${activeSurah.name}.pdf`);
      return;
    }

    setPdfLoading(true);
    setPdfProgress(10);

    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.left = '-9999px';
    wrapper.style.top = '0';
    wrapper.innerHTML = buildSurahHTML(activeSurah, ayahs);
    document.body.appendChild(wrapper);

    try {
      setPdfProgress(35);
      const blob: Blob = await html2pdf()
        .set({
          margin: 6,
          filename: `منارة - سورة ${activeSurah.name}.pdf`,
          image: { type: 'jpeg', quality: 0.75 },
          html2canvas: {
            scale: 1.0,
            useCORS: false,
            logging: false,
            imageTimeout: 0,
            removeContainer: true,
            backgroundColor: '#fff'
          },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .from(wrapper.firstElementChild as HTMLElement)
        .outputPdf('blob');

      setPdfProgress(90);
      pdfCache.set(activeSurah.id, blob);
      triggerDownload(blob, `منارة - سورة ${activeSurah.name}.pdf`);
      setPdfProgress(100);
    } catch {
      alert('تعذر إنشاء PDF. حاول مرة أخرى.');
    } finally {
      document.body.removeChild(wrapper);
      setPdfLoading(false);
      setTimeout(() => setPdfProgress(0), 500);
    }
  };

  const downloadTXT = () => {
    if (!activeSurah || !ayahs) return;
    const content =
      `سورة ${activeSurah.name}\n\n` +
      ayahs.map(a => `${a.text} ﴿${a.numberInSurah}﴾`).join('\n') +
      `\n\n———\nمنارة — منصة إسلامية شاملة\n`;
    triggerDownload(
      new Blob([content], { type: 'text/plain;charset=utf-8' }),
      `منارة - سورة ${activeSurah.name}.txt`
    );
  };

  const copyText = async () => {
    if (!activeSurah || !ayahs) return;
    const content =
      `سورة ${activeSurah.name}\n\n` +
      ayahs.map(a => `${a.text} ﴿${a.numberInSurah}﴾`).join('\n') +
      `\n\nمنارة`;
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareSurah = async () => {
    if (!activeSurah) return;
    const url = `${window.location.origin}/quran/${activeSurah.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `سورة ${activeSurah.name}`,
          text: `اقرأ من منارة`,
          url
        });
      } catch { /* المستخدم ألغى */ }
    } else {
      await navigator.clipboard.writeText(url);
      alert('تم نسخ الرابط');
    }
  };

  const hasVerseResults = verseResults.length > 0;
  const lastReadSurah = lastRead ? SURAHS.find(s => s.id === lastRead.surah) : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">القرآن الكريم</h1>
      </div>

      {/* بطاقة "تابع القراءة" + المفضلة */}
      {(lastReadSurah || bookmarks.size > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {lastReadSurah && (
            <button
              onClick={() => openSurah(lastReadSurah, lastRead!.ayah)}
              className="card p-4 flex items-center gap-3 hover:border-brand-500 transition text-right border-brand-500/50"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0">
                <i className="bi bi-bookmark-check text-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-[var(--muted)]">تابع القراءة</div>
                <div className="font-bold">سورة {lastReadSurah.name}</div>
                <div className="text-xs text-brand-600 mt-0.5">الآية {lastRead!.ayah}</div>
              </div>
              <i className="bi bi-arrow-left text-[var(--muted)]" />
            </button>
          )}
          {bookmarks.size > 0 && (
            <div className="card p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gold-400/20 text-gold-500 flex items-center justify-center shrink-0">
                <i className="bi bi-bookmark-fill text-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-[var(--muted)]">المفضلة</div>
                <div className="font-bold">{bookmarks.size} سورة محفوظة</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {Array.from(bookmarks).slice(0, 3).map(id => {
                    const s = SURAHS.find(x => x.id === id);
                    return s ? (
                      <button
                        key={id}
                        onClick={() => openSurah(s)}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600"
                      >
                        {s.name}
                      </button>
                    ) : null;
                  })}
                  {bookmarks.size > 3 && (
                    <span className="text-[10px] text-[var(--muted)]">+{bookmarks.size - 3}</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* روابط القرآن الكامل */}
      <div>
        <h2 className="text-sm font-semibold text-[var(--muted)] mb-3">
          تحميل القرآن كامل (PDF)
          {prefetchDone && (
            <span className="text-xs text-brand-600 mr-2">
              <i className="bi bi-lightning-charge-fill" /> جاهز
            </span>
          )}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {FULL_QURAN_LINKS.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-4 flex items-center gap-3 hover:border-brand-500 transition"
            >
              <i className="bi bi-file-earmark-pdf text-3xl text-brand-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{link.title}</p>
                <p className="text-xs text-[var(--muted)] mt-0.5 truncate">{link.subtitle}</p>
                <p className="text-[10px] text-brand-600 mt-1">
                  <i className="bi bi-hdd" /> {link.size}
                </p>
              </div>
              <i className="bi bi-download text-[var(--muted)] shrink-0" />
            </a>
          ))}
        </div>
      </div>

      {/* البحث */}
      <div className="relative">
        <i className="bi bi-search absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="ابحث باسم السورة، رقمها، أو أي كلمة من غير تشكيل..."
          className="w-full pr-10 pl-10 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] outline-none focus:border-brand-500"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--fg)]"
            aria-label="مسح"
          >
            <i className="bi bi-x-circle-fill" />
          </button>
        )}
      </div>

      {/* تبديل البحث */}
      {query.length >= 2 && filtered.length > 0 && hasVerseResults && (
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setSearchMode('surahs')}
            className={`px-3 py-1.5 rounded-full border transition ${
              searchMode === 'surahs'
                ? 'bg-brand-600 text-white border-brand-600'
                : 'border-[var(--border)]'
            }`}
          >
            <i className="bi bi-book" /> السور ({filtered.length})
          </button>
          <button
            onClick={() => setSearchMode('verses')}
            className={`px-3 py-1.5 rounded-full border transition ${
              searchMode === 'verses'
                ? 'bg-brand-600 text-white border-brand-600'
                : 'border-[var(--border)]'
            }`}
          >
            <i className="bi bi-quote" /> الآيات ({verseResults.length})
          </button>
        </div>
      )}

      {/* نتائج البحث في الآيات */}
      {searchMode === 'verses' && query.length >= 2 && (
        <div className="space-y-3">
          {searching && (
            <p className="text-center text-sm text-[var(--muted)] py-6">
              <i className="bi bi-hourglass-split animate-pulse" /> جاري البحث في الآيات…
            </p>
          )}
          {!searching && !hasVerseResults && (
            <p className="text-center text-sm text-[var(--muted)] py-6">
              لا توجد آيات تحتوي على "<span className="font-semibold">{query}</span>"
            </p>
          )}
          {!searching &&
            verseResults.map((r, i) => (
              <button
                key={`${r.surahNumber}-${r.verseNumber}-${i}`}
                onClick={() => {
                  const s = SURAHS.find(x => x.id === r.surahNumber);
                  if (s) openSurah(s, r.verseNumber, query);
                }}
                className="card p-4 text-right w-full hover:border-brand-500 transition"
              >
                <div className="flex items-center justify-between mb-2 text-xs text-[var(--muted)]">
                  <span className="font-semibold text-brand-600">
                    <i className="bi bi-book" /> سورة {r.surahName} · الآية {r.verseNumber}
                  </span>
                  <i className="bi bi-arrow-left" />
                </div>
                <div className="font-quran text-lg leading-loose">
                  {highlightText(r.text, query)}
                </div>
              </button>
            ))}
        </div>
      )}

      {/* قائمة السور */}
      {searchMode === 'surahs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map(s => (
            <SurahCard
              key={s.id}
              surah={s}
              onOpen={openSurah}
              isBookmarked={bookmarks.has(s.id)}
            />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full card p-8 text-center text-[var(--muted)]">
              <i className="bi bi-search text-3xl mb-3 block" />
              <p>لا توجد سور مطابقة</p>
              {hasVerseResults && (
                <button
                  onClick={() => setSearchMode('verses')}
                  className="mt-3 text-sm text-brand-600 hover:underline"
                >
                  <i className="bi bi-quote" /> عرض {verseResults.length} آية تحتوي على الكلمة
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* نافذة السورة */}
      {activeSurah && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-end md:items-center justify-center p-0 md:p-4"
          onClick={closeSurah}
        >
          <div
            className="bg-[var(--card)] w-full md:max-w-2xl md:rounded-2xl rounded-t-2xl max-h-[92vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* الهيدر */}
            <div className="flex items-center justify-between p-3 border-b border-[var(--border)] shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={closeSurah}
                  className="p-2 rounded-lg hover:bg-[var(--bg)]"
                  aria-label="رجوع"
                >
                  <i className="bi bi-arrow-right text-lg" />
                </button>
                <div>
                  <div className="font-bold text-sm">سورة {activeSurah.name}</div>
                  <div className="text-[10px] text-[var(--muted)]">
                    {activeSurah.verses} آية · {activeSurah.type}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={toggleBookmark}
                  className={`p-2 rounded-lg hover:bg-[var(--bg)] ${
                    bookmarks.has(activeSurah.id) ? 'text-brand-600' : ''
                  }`}
                  aria-label="حفظ"
                  title="إضافة للمفضلة"
                >
                  <i
                    className={`bi ${
                      bookmarks.has(activeSurah.id) ? 'bi-bookmark-fill' : 'bi-bookmark'
                    } text-lg`}
                  />
                </button>
                <button
                  onClick={closeSurah}
                  className="p-2 rounded-lg hover:bg-[var(--bg)] text-lg"
                  aria-label="إغلاق"
                >
                  <i className="bi bi-x-lg" />
                </button>
              </div>
            </div>

            {/* شريط التنقل بين الآيات المطابقة */}
            {matchedAyahs.length > 0 && activeQuery && (
              <div className="px-3 py-2 bg-yellow-50 dark:bg-yellow-900/20 border-b border-[var(--border)] flex items-center justify-between shrink-0">
                <div className="text-xs">
                  <span className="font-semibold text-yellow-700 dark:text-yellow-300">
                    "{activeQuery}"
                  </span>
                  <span className="text-[var(--muted)] mr-2">
                    · {currentMatchIdx + 1} من {matchedAyahs.length}
                  </span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={prevMatch}
                    disabled={matchedAyahs.length <= 1}
                    className="p-1.5 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/40 disabled:opacity-30"
                    aria-label="السابق"
                  >
                    <i className="bi bi-chevron-up text-sm" />
                  </button>
                  <button
                    onClick={nextMatch}
                    disabled={matchedAyahs.length <= 1}
                    className="p-1.5 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/40 disabled:opacity-30"
                    aria-label="التالي"
                  >
                    <i className="bi bi-chevron-down text-sm" />
                  </button>
                </div>
              </div>
            )}

            {/* المحتوى */}
            <div className="flex-1 overflow-y-auto p-4">
              {loading && (
                <div className="text-center py-10 text-[var(--muted)]">
                  <i className="bi bi-hourglass-split text-2xl animate-pulse" />
                  <p className="mt-2 text-sm">جاري التحميل…</p>
                </div>
              )}
              {error && (
                <div className="text-center py-10 text-red-500 text-sm">
                  <i className="bi bi-exclamation-triangle text-2xl" />
                  <p className="mt-2">{error}</p>
                </div>
              )}
              {ayahs && (
                <div className="font-quran text-xl leading-[2.4] text-justify" dir="rtl">
                  {activeSurah.id !== 1 && activeSurah.id !== 9 && (
                    <p className="text-center text-brand-600 mb-4 text-lg">
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </p>
                  )}
                  {ayahs.map(a => (
                    <span
                      key={a.numberInSurah}
                      ref={el => {
                        if (el) ayahRefs.current.set(a.numberInSurah, el);
                      }}
                      className="ml-1 inline transition-all"
                    >
                      {activeQuery ? highlightText(a.text, activeQuery) : a.text}
                      <span className="text-brand-600 font-bold text-sm mx-1">
                        ﴿{a.numberInSurah}﴾
                      </span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* الفوتر */}
            {ayahs && (
              <div className="border-t border-[var(--border)] shrink-0">
                <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--border)]">
                  <button
                    onClick={() => goToSurah(-1)}
                    disabled={activeSurah.id === 1}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs hover:bg-[var(--bg)] disabled:opacity-30"
                  >
                    <i className="bi bi-chevron-right" /> السابقة
                  </button>
                  <span className="text-[10px] text-[var(--muted)]">
                    {activeSurah.id} / 114
                  </span>
                  <button
                    onClick={() => goToSurah(1)}
                    disabled={activeSurah.id === 114}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs hover:bg-[var(--bg)] disabled:opacity-30"
                  >
                    التالية <i className="bi bi-chevron-left" />
                  </button>
                </div>

                {pdfLoading && (
                  <div className="px-3 pt-2">
                    <div className="flex items-center justify-between text-xs text-[var(--muted)] mb-1">
                      <span>جاري تجهيز PDF…</span>
                      <span>{pdfProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[var(--bg)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-600 transition-all duration-300"
                        style={{ width: `${pdfProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-4 gap-2 p-3">
                  <button
                    onClick={downloadPDF}
                    disabled={pdfLoading}
                    className="flex flex-col items-center gap-1 py-2 rounded-lg hover:bg-[var(--bg)] text-brand-600 disabled:opacity-50"
                  >
                    <i
                      className={`bi ${
                        pdfLoading ? 'bi-hourglass-split animate-pulse' : 'bi-file-earmark-pdf'
                      } text-xl`}
                    />
                    <span className="text-[11px]">{pdfLoading ? 'جاري...' : 'PDF'}</span>
                  </button>
                  <button
                    onClick={downloadTXT}
                    className="flex flex-col items-center gap-1 py-2 rounded-lg hover:bg-[var(--bg)] text-brand-600"
                  >
                    <i className="bi bi-file-earmark-text text-xl" />
                    <span className="text-[11px]">TXT</span>
                  </button>
                  <button
                    onClick={copyText}
                    className="flex flex-col items-center gap-1 py-2 rounded-lg hover:bg-[var(--bg)] text-brand-600"
                  >
                    <i
                      className={`bi ${
                        copied ? 'bi-check-circle-fill' : 'bi-clipboard'
                      } text-xl`}
                    />
                    <span className="text-[11px]">{copied ? 'تم النسخ' : 'نسخ'}</span>
                  </button>
                  <button
                    onClick={shareSurah}
                    className="flex flex-col items-center gap-1 py-2 rounded-lg hover:bg-[var(--bg)] text-brand-600"
                  >
                    <i className="bi bi-share text-xl" />
                    <span className="text-[11px]">مشاركة</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// مكوّن بطاقة السورة
// ============================================
function SurahCard({
  surah,
  onOpen,
  isBookmarked
}: {
  surah: SurahMeta;
  onOpen: (s: SurahMeta) => void;
  isBookmarked: boolean;
}) {
  return (
    <button
      onClick={() => onOpen(surah)}
      className="card p-4 flex items-center gap-3 hover:border-brand-500 transition text-right w-full"
    >
      <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600 font-bold text-sm shrink-0">
        {surah.id}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold flex items-center gap-2">
          {surah.name}
          {isBookmarked && <i className="bi bi-bookmark-fill text-brand-600 text-xs" />}
        </div>
        <div className="text-xs text-[var(--muted)] mt-0.5">
          {surah.verses} آية · {surah.type}
        </div>
      </div>
      <i className="bi bi-chevron-left text-[var(--muted)]" />
    </button>
  );
}