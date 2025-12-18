export class SessionStorageAdapter {
  private storage: Storage;

  constructor(storage: Storage = window.sessionStorage) {
    this.storage = storage;
  }

  /**
   * Set a value in sessionStorage.
   * Objects/arrays are automatically JSON stringified.
   *
   * @param key - The key under which to store the value
   * @param value - The value to store
   */
  set<T>(key: string, value: T): void {
    if (value === null || value === undefined) {
      this.storage.removeItem(key);
      return;
    }

    try {
      const serialized =
        typeof value === 'object' ? JSON.stringify(value) : String(value);
      this.storage.setItem(key, serialized);
    } catch (error) {
      console.error(`SessionStorageAdapter: Failed to set item "${key}"`, error);
    }
  }

  /**
   * Get a value from sessionStorage.
   *
   * @param key - The key to retrieve
   * @param defaultValue - Value to return if key doesn't exist
   */
  get<T>(key: string, defaultValue: T | null = null): T | null {
    const raw = this.storage.getItem(key);

    if (raw === null) {
      return defaultValue;
    }

    // Try to parse as JSON first
    try {
      return JSON.parse(raw) as T;
    } catch {
      return raw as unknown as T;
    }
  }

  /**
   * Remove an item from sessionStorage
   * @param key - The key to remove
   */
  remove(key: string): void {
    this.storage.removeItem(key);
  }

}