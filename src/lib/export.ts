import { db } from './db';

export async function exportAll() {
  const [notes, bookmarks, tasbeeh, progress, prayerLogs] = await Promise.all([
    db.notes.toArray(), db.bookmarks.toArray(), db.tasbeeh.toArray(),
    db.progress.toArray(), db.prayerLogs.toArray()
  ]);
  const settings: Record<string, string | null> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)!;
    if (k.startsWith('manara:')) settings[k] = localStorage.getItem(k);
  }
  return {
    version: 1, app: 'manara',
    exportedAt: new Date().toISOString(),
    data: { notes, bookmarks, tasbeeh, progress, prayerLogs, settings }
  };
}

export async function importAll(payload: any) {
  if (!payload?.data) throw new Error('bad file');
  const d = payload.data;
  await db.transaction('rw',
    db.notes, db.bookmarks, db.tasbeeh, db.progress, db.prayerLogs,
    async () => {
      if (d.notes) await db.notes.bulkPut(d.notes);
      if (d.bookmarks) await db.bookmarks.bulkPut(d.bookmarks);
      if (d.tasbeeh) await db.tasbeeh.bulkPut(d.tasbeeh);
      if (d.progress) await db.progress.bulkPut(d.progress);
      if (d.prayerLogs) await db.prayerLogs.bulkPut(d.prayerLogs);
    });
  if (d.settings) {
    Object.entries(d.settings).forEach(([k, v]) => localStorage.setItem(k, String(v)));
  }
}

export async function deleteAll() {
  await Promise.all([
    db.notes.clear(), db.bookmarks.clear(), db.tasbeeh.clear(),
    db.progress.clear(), db.prayerLogs.clear()
  ]);
  Object.keys(localStorage)
    .filter(k => k.startsWith('manara:'))
    .forEach(k => localStorage.removeItem(k));
  if ('caches' in window) {
    const names = await caches.keys();
    await Promise.all(names.map(n => caches.delete(n)));
  }
}