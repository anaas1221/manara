import { useEffect, useState, useCallback, useMemo } from 'react';
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

  // قراءة من localStorage — مرة واحدة فقط
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.completedLessons)) {
          setProgress(parsed);
        }
      }
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  // ✅ دوال memoized — مش بتتعمل من جديد كل render
  const markLessonComplete = useCallback((lessonId: string) => {
    setProgress(prev => {
      const next: LearningProgress = {
        ...prev,
        completedLessons: prev.completedLessons.includes(lessonId)
          ? prev.completedLessons
          : [...prev.completedLessons, lessonId],
        lastLessonId: lessonId,
        startedAt: prev.startedAt ?? new Date().toISOString(),
      };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const markLessonIncomplete = useCallback((lessonId: string) => {
    setProgress(prev => {
      const next: LearningProgress = {
        ...prev,
        completedLessons: prev.completedLessons.filter(id => id !== lessonId),
      };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const setLastLesson = useCallback((lessonId: string) => {
    setProgress(prev => {
      // ✅ لو هو هو نفس الدرس، ما نعملش re-render
      if (prev.lastLessonId === lessonId) return prev;
      const next: LearningProgress = {
        ...prev,
        lastLessonId: lessonId,
        startedAt: prev.startedAt ?? new Date().toISOString(),
      };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  }, []);

  // ✅ الحسابات memoized
  const completedCount = progress.completedLessons.length;
  const progressPercent = TOTAL_LESSONS > 0 ? (completedCount / TOTAL_LESSONS) * 100 : 0;
  const isComplete = completedCount >= TOTAL_LESSONS;

  const allLessons = useMemo(() => getAllLessons(), []);

  const nextLesson = useMemo(() => {
    return allLessons.find(l => !progress.completedLessons.includes(l.id)) ?? null;
  }, [allLessons, progress.completedLessons]);

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
    nextLesson,
    allLessons,
  };
}