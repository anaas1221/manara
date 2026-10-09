import { Link } from 'react-router-dom';
import { LEARNING_PATHS, TOTAL_LESSONS } from '../content/learn-paths';
import { useLearningProgress } from '../lib/hooks/useLearningProgress';

export default function MyJourney() {
  const {
    progress,
    completedCount,
    progressPercent,
    isComplete,
    nextLesson,
    resetProgress,
  } = useLearningProgress();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* ✅ زر الرجوع — واضح */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)] text-sm hover:bg-[var(--card)] transition"
        >
          <i className="bi bi-house" /> الرئيسية
        </Link>
        <Link
          to="/learn"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)] text-sm hover:bg-[var(--card)] transition"
        >
          <i className="bi bi-mortarboard" /> المسارات
        </Link>
      </div>

      {/* Header */}
      <div className="text-center space-y-2 py-4">
        <div className="w-20 h-20 mx-auto rounded-full bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
          <i className={`bi ${isComplete ? 'bi-trophy-fill' : 'bi-signpost-2'} text-4xl text-brand-600`} />
        </div>
        <h1 className="text-3xl font-bold">
          {isComplete ? 'ما شاء الله!' : 'رحلتك مع منارة'}
        </h1>
        <p className="text-sm text-[var(--muted)]">
          {isComplete
            ? 'أكملت كل الدروس — تقبّل الله منك'
            : 'تابع خطوة بخطوة، فالقليل الدائم خير من الكثير المنقطع'}
        </p>
      </div>

      {/* Progress Card */}
      <div className="card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">تقدمك</h2>
          <span className="text-2xl font-bold text-brand-600">{Math.round(progressPercent)}%</span>
        </div>

        <div className="h-3 bg-[var(--bg)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-l from-brand-600 to-brand-400 transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="card p-3 bg-[var(--bg)]">
            <div className="text-2xl font-bold text-brand-600">{completedCount}</div>
            <div className="text-xs text-[var(--muted)] mt-1">درس مكتمل</div>
          </div>
          <div className="card p-3 bg-[var(--bg)]">
            <div className="text-2xl font-bold">{TOTAL_LESSONS - completedCount}</div>
            <div className="text-xs text-[var(--muted)] mt-1">درس متبقي</div>
          </div>
          <div className="card p-3 bg-[var(--bg)]">
            <div className="text-2xl font-bold">{TOTAL_LESSONS}</div>
            <div className="text-xs text-[var(--muted)] mt-1">إجمالي الدروس</div>
          </div>
        </div>
      </div>

      {/* Next Lesson */}
      {!isComplete && nextLesson && (
        <div className="card p-6 border-brand-500/40 bg-gradient-to-l from-brand-50/50 dark:from-brand-900/10 to-transparent">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0">
              <i className="bi bi-play-fill text-3xl" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-brand-600 font-semibold mb-1">خطوتك التالية</div>
              <h3 className="font-bold text-lg leading-tight">{nextLesson.title}</h3>
              <p className="text-sm text-[var(--muted)] mt-1">{nextLesson.description}</p>
              <p className="text-xs text-[var(--muted)] mt-2">
                <i className="bi bi-clock" /> {nextLesson.estimatedMinutes} دقائق
              </p>
            </div>
          </div>
          <Link
            to={`/learn/lesson/${nextLesson.id}`}
            className="mt-4 w-full py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition flex items-center justify-center gap-2"
          >
            ابدأ الدرس الآن <i className="bi bi-arrow-left" />
          </Link>
        </div>
      )}

      {/* Message when complete */}
      {isComplete && (
        <div className="card p-6 text-center space-y-3 bg-gradient-to-l from-green-50/50 dark:from-green-900/10 to-transparent border-green-500/30">
          <i className="bi bi-trophy-fill text-5xl text-green-600" />
          <h3 className="text-xl font-bold">أكملت كل الدروس 🎉</h3>
          <p className="text-sm text-[var(--muted)]">
            ما شاء الله! الآن يمكنك:<br />
            • مراجعة الدروس التي تريدها<br />
            • العودة للمحتوى للاستزادة<br />
            • البدء في تطبيق ما تعلمته
          </p>
          <Link
            to="/learn"
            className="inline-block px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold"
          >
            عرض كل المسارات
          </Link>
        </div>
      )}

      {/* المسارات */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <i className="bi bi-signpost-2 text-brand-600" /> المسارات
        </h2>
        {LEARNING_PATHS.map(path => {
          const pathCompleted = path.lessons.filter(l =>
            progress.completedLessons.includes(l.id)
          ).length;
          const pathPercent = (pathCompleted / path.lessons.length) * 100;
          const pathDone = pathCompleted === path.lessons.length;

          return (
            <div key={path.id} className="card p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  pathDone
                    ? 'bg-green-500/20 text-green-600'
                    : 'bg-brand-50 dark:bg-brand-900/30 text-brand-600'
                }`}>
                  <i className={`bi ${pathDone ? 'bi-check-circle-fill' : path.icon} text-2xl`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold leading-tight">{path.title}</h3>
                    {pathDone && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-700 dark:text-green-300 font-semibold">
                        مكتمل
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--muted)] mt-0.5">{path.description}</p>
                </div>
                <div className="text-left shrink-0">
                  <div className="text-xs text-[var(--muted)]">{pathCompleted}/{path.lessons.length}</div>
                </div>
              </div>

              <div className="h-1.5 bg-[var(--bg)] rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${pathDone ? 'bg-green-500' : 'bg-brand-600'}`}
                  style={{ width: `${pathPercent}%` }}
                />
              </div>

              <div className="space-y-1.5">
                {path.lessons.map((lesson, idx) => {
                  const done = progress.completedLessons.includes(lesson.id);
                  return (
                    <Link
                      key={lesson.id}
                      to={`/learn/lesson/${lesson.id}`}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[var(--bg)] transition group"
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        done
                          ? 'bg-green-500 text-white'
                          : 'bg-[var(--bg)] text-[var(--muted)] group-hover:bg-brand-600 group-hover:text-white transition'
                      }`}>
                        {done ? <i className="bi bi-check" /> : idx + 1}
                      </div>
                      <span className={`flex-1 text-sm ${done ? 'text-[var(--muted)] line-through' : ''}`}>
                        {lesson.title}
                      </span>
                      <span className="text-[10px] text-[var(--muted)]">{lesson.estimatedMinutes} د</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reset */}
      {completedCount > 0 && (
        <div className="card p-5">
          <button
            onClick={() => {
              if (confirm('سيتم حذف كل تقدمك في الدروس. متابعة؟')) {
                resetProgress();
              }
            }}
            className="text-sm text-red-600 hover:underline"
          >
            <i className="bi bi-arrow-counterclockwise" /> إعادة تعيين كل التقدم
          </button>
        </div>
      )}

      {/* ✅ زر رئيسي للرجوع في الأسفل */}
      <div className="pt-4 pb-6">
        <Link
          to="/"
          className="w-full py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition flex items-center justify-center gap-2"
        >
          <i className="bi bi-house" /> العودة ل    لرئيسية
        </Link>
      </div>
    </div>
  );
}