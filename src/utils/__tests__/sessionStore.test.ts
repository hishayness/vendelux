import { describe, it, expect, beforeEach } from 'vitest';
import { SessionStorageAdapter } from '../sessionStore.js'

describe('SessionStorageAdapter', () => {
  let sessionStorage: SessionStorageAdapter;

  beforeEach(() => {
    sessionStorage = new SessionStorageAdapter();
  });  

  it('should store and retrieve a string', () => {
    sessionStorage.set('key', 'hello');
    expect(sessionStorage.get('key')).toBe('hello');
  });  

  it('should store and retrieve a step and currentStep', () => {
    sessionStorage.set('eventSessions', {
      step: [],
      currentStep: 2
    });
    expect(sessionStorage.get('eventSessions')).toStrictEqual({
      step: [],
      currentStep: 2
    });
  });    
});