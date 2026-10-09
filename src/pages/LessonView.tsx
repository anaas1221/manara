import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { findLesson, getAllLessons } from '../content/learn-paths';
import { useLearningProgress } from '../lib/hooks/useLearningProgress';

export default function LessonView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { markLessonComplete, markLessonIncomplete, progress, setLastLesson } = useLearningProgress();
  const [toast, setToast] = useState<string | null>(null);

  // ✅ نمنع التكرار
  const lastTrackedRef = useRef<string | null>(null);

  const result = id ? findLesson(id) : null;
  const lesson = result?.lesson;
  const path = result?.path;

  // ✅ حفظ آخر درس — مرة واحدة فقط لكل درس
  useEffect(() => {
    if (!lesson) return;
    if (lastTrackedRef.current === lesson.id) return;
    lastTrackedRef.current = lesson.id;
    setLastLesson(lesson.id);
    // scroll للأعلى
    window.scrollTo(0, 0);
  }, [lesson?.id, setLastLesson]);

  if (!lesson || !path) {
    return (
      <div className="max-w-3xl mx-auto card p-8 text-center space-y-4">
        <i className="bi bi-exclamation-triangle text-4xl text-amber-500" />
        <h2 className="text-xl font-bold">الدرس غير موجود</h2>
        <Link to="/learn" className="inline-block px-6 py-2 rounded-lg bg-brand-600 text-white text-sm">
          العودة للتعلم
        </Link>
      </div>
    );
  }

  const isCompleted = progress.completedLessons.includes(lesson.id);

  const allLessons = getAllLessons();
  const currentIdx = allLessons.findIndex(l => l.id === lesson.id);
  const nextLesson = currentIdx >= 0 && currentIdx < allLessons.length - 1
    ? allLessons[currentIdx + 1]
    : null;
  const prevLesson = currentIdx > 0 ? allLessons[currentIdx - 1] : null;

  const handleComplete = () => {
    if (isCompleted) {
      markLessonIncomplete(lesson.id);
      setToast('تم إلغاء إكمال الدرس');
    } else {
      markLessonComplete(lesson.id);
      setToast('أحسنت! تم إكمال الدرس ✓');
    }
    setTimeout(() => setToast(null), 2500);
  };

  const handleNext = () => {
    if (!isCompleted) markLessonComplete(lesson.id);
    if (nextLesson) {
      navigate(`/learn/lesson/${nextLesson.id}`);
    } else {
      navigate('/my-journey');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* رجوع + Breadcrumb */}
      <div className="flex items-center justify-between gap-2">
        <Link
          to="/learn"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)] text-xs sm:text-sm hover:bg-[var(--card)] transition"
        >
          <i className="bi bi-arrow-right" /> العودة للمسارات
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)] text-xs sm:text-sm hover:bg-[var(--card)] transition"
        >
          <i className="bi bi-house" /> الرئيسية
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
            <i className={`bi ${path.icon} text-2xl text-brand-600`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-brand-600 font-semibold">{path.levelLabel}</div>
            <h1 className="text-2xl font-bold leading-tight">{lesson.title}</h1>
          </div>
        </div>
        <p className="text-sm text-[var(--muted)]">{lesson.description}</p>
        <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
          <span><i className="bi bi-clock" /> {lesson.estimatedMinutes} دقيقة</span>
          <span><i className="bi bi-list-ol" /> الدرس {currentIdx + 1} من {allLessons.length}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-[var(--bg)] rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-600 transition-all duration-500"
          style={{ width: `${((currentIdx + 1) / allLessons.length) * 100}%` }}
        />
      </div>

      {/* محتوى الدرس */}
      <div className="space-y-5">
        {lesson.sections.map((section, idx) => (
          <div key={idx} className="card p-5 space-y-2">
            {section.title && (
              <h2 className="font-bold text-lg text-brand-600">{section.title}</h2>
            )}
            <p className="leading-loose whitespace-pre-line text-base">{section.content}</p>
            {section.source && (
              <div className="text-xs text-[var(--muted)] pt-2 border-t border-[var(--border)]">
                <i className="bi bi-bookmark" /> المصدر: {section.source}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ماذا أقول */}
      {lesson.whatToSay && lesson.whatToSay.length > 0 && (
        <div className="card p-5 bg-brand-50/40 dark:bg-brand-900/10 border-brand-500/20 space-y-3">
          <h3 className="font-bold text-sm text-brand-600 flex items-center gap-2">
            <i className="bi bi-chat-quote" /> ماذا أقول؟
          </h3>
          <div className="space-y-2">
            {lesson.whatToSay.map((s, i) => (
              <p key={i} className="font-quran text-lg leading-loose">{s}</p>
            ))}
          </div>
        </div>
      )}

      {/* المصدر الرئيسي */}
      {lesson.source && (
        <div className="card p-4 bg-[var(--bg)] text-xs text-[var(--muted)]">
          <i className="bi bi-book" /> <strong>المصدر:</strong> {lesson.source}
        </div>
      )}

      {/* روابط ذات صلة */}
      {lesson.relatedLinks && lesson.relatedLinks.length > 0 && (
        <div className="card p-5 space-y-3">
          <h3 className="font-bold text-sm flex items-center gap-2">
            <i className="bi bi-link-45deg text-brand-600" /> روابط ذات صلة
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {lesson.relatedLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className="p-3 rounded-lg border border-[var(--border)] hover:border-brand-500 transition text-sm flex items-center justify-between"
              >
                <span>{link.label}</span>
                <i className="bi bi-arrow-left text-[var(--muted)]" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* زر الإكمال */}
      <button
        onClick={handleComplete}
        className={`w-full py-4 rounded-xl font-bold transition ${
          isCompleted
            ? 'bg-green-500/10 border-2 border-green-500/40 text-green-700 dark:text-green-300'
            : 'bg-brand-600 text-white hover:bg-brand-700'
        }`}
      >
        {isCompleted ? (
          <><i className="bi bi-check-circle-fill text-xl" /> تم إكمال الدرس</>
        ) : (
          <><i className="bi bi-check2-circle text-xl" /> إكمال الدرس</>
        )}
      </button>

      {/* التنقل */}
      <div className="flex gap-2">
        {prevLesson ? (
          <Link
            to={`/learn/lesson/${prevLesson.id}`}
            className="flex-1 py-3 rounded-xl border border-[var(--border)] text-sm hover:bg-[var(--card)] flex items-center justify-center gap-2"
          >
            <i className="bi bi-chevron-right" /> السابق
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {nextLesson ? (
          <button
            onClick={handleNext}
            className="flex-1 py-3 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 flex items-center justify-center gap-2"
          >
            التالي <i className="bi bi-chevron-left" />
          </button>
        ) : (
          <Link
            to="/my-journey"
            className="flex-1 py-3 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 flex items-center justify-center gap-2"
          >
            <i className="bi bi-trophy" /> اكتملت الرحلة!
          </Link>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[60] bg-brand-600 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold">
          <i className="bi bi-check-circle-fill" /> {toast}
        </div>
      )}
    </div>
  );
}