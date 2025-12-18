import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { SessionStorageAdapter } from '../sessionStore.js'

describe('SessionStorageAdapter', () => {
  let sessionStorage: SessionStorageAdapter;

  beforeAll(() => {
    global.window = {}
    const storageMock = () => {
      let store: Record<string, string> = {};
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => { store[key] = value },
        removeItem: (key: string) => delete store[key],
        clear: () => {store = {}},
        get length() { return Object.keys(store).length; },
        key: (i: number) => Object.keys(store)[i] || null,
      };
    };

    Object.defineProperty(window, 'sessionStorage', {
      value: storageMock(),
      writable: true,
    });    
  });

  beforeEach(() => {
    sessionStorage = new SessionStorageAdapter();
  });  

  it('should store and retrieve a string', () => {
    sessionStorage.set('key', 'hello');
    expect(sessionStorage.get('key')).toBe('hello');
  });  
});