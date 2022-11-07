export class LocalStorage {
  static put = <T>(key: string, value: T): void => {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  };

  static get = <T = any>(key: string): T | null => {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : null;
  };
}
