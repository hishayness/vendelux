import { describe, it, expect } from 'vitest';
import { isValidExactFormat } from '../date';

describe('isValidExactFormat', () => {
  it('should return true for valid ISO 8601 format', () => {
    expect(isValidExactFormat('2024-12-15T19:30:00Z')).toBe(true);
  });
});
