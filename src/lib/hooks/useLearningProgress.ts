import { useEffect, useState } from 'react';
import { db } from '../db';
import { getAllLessons, TOTAL_LESSONS } from '../../content/learn-paths';

export interface LearningProgress {
  completedLessons: string[];
  lastLessonId: string | null;
  startedAt: string | null;
}

const DEFAULT_PROGRESS: LearningProgress = {
  completedLessons: [],
  lastLessonId: null,
  startedAt: null,
};

const STORAGE_KEY = 'manara:learning-progress';

export function useLearningProgress() {
  const [progress, setProgress] = useState<LearningProgress>(DEFAULT_PROGRESS);
  const [loading, setLoading] = useState(true);

  // قراءة من localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  // حفظ في localStorage عند التغيير
  const save = (next: LearningProgress) => {
    setProgress(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch { /* ignore */ }
  };

  const markLessonComplete = (lessonId: string) => {
    const next: LearningProgress = {
      ...progress,
      completedLessons: progress.completedLessons.includes(lessonId)
        ? progress.completedLessons
        : [...progress.completedLessons, lessonId],
      lastLessonId: lessonId,
      startedAt: progress.startedAt ?? new Date().toISOString(),
    };
    save(next);
  };

  const markLessonIncomplete = (lessonId: string) => {
    const next: LearningProgress = {
      ...progress,
      completedLessons: progress.completedLessons.filter(id => id !== lessonId),
    };
    save(next);
  };

  const setLastLesson = (lessonId: string) => {
    save({
      ...progress,
      lastLessonId: lessonId,
      startedAt: progress.startedAt ?? new Date().toISOString(),
    });
  };

  const resetProgress = () => {
    save(DEFAULT_PROGRESS);
  };

  // حسابات
  const allLessons = getAllLessons();
  const completedCount = progress.completedLessons.length;
  const progressPercent = TOTAL_LESSONS > 0 ? (completedCount / TOTAL_LESSONS) * 100 : 0;
  const isComplete = completedCount >= TOTAL_LESSONS;

  // الدرس التالي المقترح
  const getNextLesson = () => {
    // 1. لو فيه درس لم يكتمل آخر واحد
    const firstUncompleted = allLessons.find(
      l => !progress.completedLessons.includes(l.id)
    );
    return firstUncompleted ?? null;
  };

  return {
    progress,
    loading,
    markLessonComplete,
    markLessonIncomplete,
    setLastLesson,
    resetProgress,
    completedCount,
    totalLessons: TOTAL_LESSONS,
    progressPercent,
    isComplete,
    nextLesson: getNextLesson(),
    allLessons,
  };
}