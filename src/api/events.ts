import { apiClient } from './client';

export interface Event {
  id: string;
  name: string;
  type: string;
  url: string;
  images: { url: string; width: number; height: number }[];
  dates: {
    start: {
      localDate: string;
      localTime?: string;
    };
  };
  _embedded?: {
    venues?: {
      name: string;
      city: { name: string };
      state?: { name: string };
      country: { name: string };
    }[];
  };
  priceRanges?: {
    min: number;
    max: number;
    currency: string;
  }[];
}

export interface EventsResponse {
  _embedded?: {
    events: Event[];
  };
  page: {
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
  };
}

export interface SearchParams {
  keyword?: string;
  city?: string;
  startDateTime?: string;
  endDateTime?: string;
  size?: number;
  page?: number;
}

export const eventsApi = {
  // GET /events - Search events
  search: async (params: SearchParams = {}): Promise<EventsResponse> => {
    const response = await apiClient.get<EventsResponse>('/events.json', {
      params: {
        size: params.size || 100,
        page: params.page || 0,
        ...params,
      },
    });
    return response.data;
  },
};
