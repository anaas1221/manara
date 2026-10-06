import Dexie, { type Table } from 'dexie';

export interface Note { id?: number; ref: string; text: string; createdAt: number; }
export interface Bookmark { id?: number; ref: string; type: 'reading'|'favorite'|'review'|'later'; label?: string; createdAt: number; }
export interface TasbeehSession { id?: number; dhikr: string; count: number; date: string; createdAt: number; }
export interface ReadingProgress { key: string; surah: number; ayah: number; page?: number; juz?: number; updatedAt: number; }
export interface PrayerLog { id?: number; date: string; prayer: 'Fajr'|'Dhuhr'|'Asr'|'Maghrib'|'Isha'; status: 'prayed'|'jamaah'|'mosque'|'missed'|'none'; }

export class ManaraDB extends Dexie {
  notes!: Table<Note, number>;
  bookmarks!: Table<Bookmark, number>;
  tasbeeh!: Table<TasbeehSession, number>;
  progress!: Table<ReadingProgress, string>;
  prayerLogs!: Table<PrayerLog, number>;

  constructor() {
    super('manara-db');
    this.version(1).stores({
      notes: '++id, ref, createdAt',
      bookmarks: '++id, ref, type, createdAt',
      tasbeeh: '++id, dhikr, date, createdAt',
      progress: 'key',
      prayerLogs: '++id, date, prayer'
    });
  }
}

export const db = new ManaraDB();