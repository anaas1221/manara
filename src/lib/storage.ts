export const ls = {
  get<T>(key: string, fallback: T): T {
    try {
      const v = localStorage.getItem(`manara:${key}`);
      return v ? (JSON.parse(v) as T) : fallback;
    } catch { return fallback; }
  },
  set<T>(key: string, value: T) {
    localStorage.setItem(`manara:${key}`, JSON.stringify(value));
  },
  remove(key: string) {
    localStorage.removeItem(`manara:${key}`);
  }
};