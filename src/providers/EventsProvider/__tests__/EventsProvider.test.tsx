import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { EventsProvider, useEventsContext } from '../index';

vi.mock('../../../api/events', () => ({
  eventsApi: {
    search: vi.fn().mockResolvedValue({ _embedded: { events: [] } }),
  },
}));

vi.mock('../../../utils/sessionStore', () => ({
  SessionStorageAdapter: vi.fn(class {
    get = vi.fn().mockReturnValue(null);
    set = vi.fn();
    remove = vi.fn();
  }),
}));


describe('EventsProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <EventsProvider>{children}</EventsProvider>
  );

  it('should provide initial context values', () => {
    const { result } = renderHook(() => useEventsContext(), { wrapper });

    expect(result.current.events).toEqual([]);
    expect(result.current.steps).toHaveLength(3);
    expect(result.current.currentStep).toBe(0);
    expect(result.current.errors).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.filterText).toBe('');
  });

  it('should throw error when useEventsContext is used outside provider', () => {
    expect(() => {
      renderHook(() => useEventsContext());
    }).toThrow('useEventsContext must be used within an EventsProvider');
  });
});
