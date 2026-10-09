import { Link } from 'react-router-dom';
import { LEARNING_PATHS } from '../content/learn-paths';
import { useLearningProgress } from '../lib/hooks/useLearningProgress';

export default function Learn() {
  const { progress, completedCount, totalLessons, progressPercent } = useLearningProgress();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">تعلّم</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          ابدأ رحلتك من الصفر — خطوة بخطوة
        </p>
      </div>

      {/* Progress summary */}
      {completedCount > 0 && (
        <Link to="/my-journey" className="card p-4 flex items-center gap-3 hover:border-brand-500 transition">
          <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
            <i className="bi bi-graph-up-arrow text-2xl text-brand-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-[var(--muted)]">تقدمك</div>
            <div className="font-bold">{completedCount} من {totalLessons} درس</div>
            <div className="h-1.5 bg-[var(--bg)] rounded-full overflow-hidden mt-2">
              <div className="h-full bg-brand-600" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
          <i className="bi bi-arrow-left text-[var(--muted)]" />
        </Link>
      )}

      {/* Paths */}
      <div className="space-y-4">
        {LEARNING_PATHS.map(path => {
          const pathCompleted = path.lessons.filter(l =>
            progress.completedLessons.includes(l.id)
          ).length;
          const firstUncompleted = path.lessons.find(l =>
            !progress.completedLessons.includes(l.id)
          );
          const startLesson = firstUncompleted ?? path.lessons[0];

          return (
            <div key={path.id} className="card p-5 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                  <i className={`bi ${path.icon} text-2xl text-brand-600`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold leading-tight">{path.title}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 font-semibold">
                      {path.levelLabel}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--muted)] mt-1">{path.description}</p>
                  <p className="text-[10px] text-brand-600 mt-2">
                    <i className="bi bi-list-check" /> {path.lessons.length} درس · {pathCompleted} مكتمل
                  </p>
                </div>
              </div>

              <Link
                to={`/learn/lesson/${startLesson.id}`}
                className="w-full py-2.5 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition flex items-center justify-center gap-2"
              >
                {pathCompleted > 0 ? (
                  <><i className="bi bi-play-fill" /> تابع المسار</>
                ) : (
                  <><i className="bi bi-play-fill" /> ابدأ المسار</>
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}