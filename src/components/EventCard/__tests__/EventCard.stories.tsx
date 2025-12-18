import type { Meta, StoryObj } from '@storybook/react-vite';
import EventCard from '../index';
import type { Event } from '../../../api/events';

const meta = {
  title: 'Components/EventCard',
  component: EventCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ul className="list-none p-0 m-0 max-w-2xl">
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof EventCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockEventWithImage: Event = {
  id: '1',
  name: 'Taylor Swift | The Eras Tour',
  type: 'event',
  url: 'https://example.com/event/1',
  images: [
    { url: 'https://picsum.photos/200/200', width: 200, height: 200 },
  ],
  dates: {
    start: {
      localDate: '2024-12-15',
      localTime: '19:30:00',
    },
  },
  _embedded: {
    venues: [
      {
        name: 'Madison Square Garden',
        city: { name: 'New York' },
        state: { name: 'New York' },
        country: { name: 'USA' },
      },
    ],
  },
};

const mockEventWithoutImage: Event = {
  id: '2',
  name: 'Jazz Festival 2024',
  type: 'event',
  url: 'https://example.com/event/2',
  images: [],
  dates: {
    start: {
      localDate: '2024-08-20',
    },
  },
  _embedded: {
    venues: [
      {
        name: 'Central Park',
        city: { name: 'New York' },
        state: { name: 'New York' },
        country: { name: 'USA' },
      },
    ],
  },
};

const mockEventNoVenue: Event = {
  id: '3',
  name: 'Virtual Concert Experience',
  type: 'event',
  url: 'https://example.com/event/3',
  images: [
    { url: 'https://picsum.photos/200/200?random=2', width: 200, height: 200 },
  ],
  dates: {
    start: {
      localDate: '2024-09-01',
      localTime: '20:00:00',
    },
  },
};

const mockEventInternational: Event = {
  id: '4',
  name: 'Coldplay World Tour',
  type: 'event',
  url: 'https://example.com/event/4',
  images: [
    { url: 'https://picsum.photos/200/200?random=3', width: 200, height: 200 },
  ],
  dates: {
    start: {
      localDate: '2024-07-10',
      localTime: '21:00:00',
    },
  },
  _embedded: {
    venues: [
      {
        name: 'Wembley Stadium',
        city: { name: 'London' },
        country: { name: 'United Kingdom' },
      },
    ],
  },
};

export const Default: Story = {
  args: {
    event: mockEventWithImage,
  },
};

export const WithoutImage: Story = {
  args: {
    event: mockEventWithoutImage,
  },
};

export const NoVenueInfo: Story = {
  args: {
    event: mockEventNoVenue,
  },
};

export const InternationalVenue: Story = {
  args: {
    event: mockEventInternational,
  },
};
