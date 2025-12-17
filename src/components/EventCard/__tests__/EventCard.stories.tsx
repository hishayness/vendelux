import type { Meta, StoryObj } from '@storybook/react';
import EventCard from '../index';
import type { Event } from '../../../api/events';

const mockEvent: Event = {
  id: '1',
  name: 'Taylor Swift | The Eras Tour',
  type: 'event',
  url: 'https://example.com/event/1',
  images: [
    { url: 'https://picsum.photos/200/200', width: 200, height: 200 },
  ],
  dates: {
    start: {
      localDate: '2024-03-15',
      localTime: '19:30:00',
    },
  },
  _embedded: {
    venues: [
      {
        name: 'Madison Square Garden',
        city: { name: 'New York' },
        state: { name: 'New York' },
        country: { name: 'United States' },
      },
    ],
  },
};

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

export const Default: Story = {
  args: {
    event: mockEvent,
  },
};

export const WithoutTime: Story = {
  args: {
    event: {
      ...mockEvent,
      id: '2',
      name: 'Music Festival 2024',
      dates: {
        start: {
          localDate: '2024-06-20',
        },
      },
    },
  },
};

export const WithoutImage: Story = {
  args: {
    event: {
      ...mockEvent,
      id: '3',
      name: 'Comedy Night Special',
      images: [],
    },
  },
};

export const WithoutState: Story = {
  args: {
    event: {
      ...mockEvent,
      id: '4',
      name: 'London Concert',
      _embedded: {
        venues: [
          {
            name: 'O2 Arena',
            city: { name: 'London' },
            country: { name: 'United Kingdom' },
          },
        ],
      },
    },
  },
};

export const WithoutVenue: Story = {
  args: {
    event: {
      ...mockEvent,
      id: '5',
      name: 'Virtual Event',
      _embedded: undefined,
    },
  },
};

export const LongEventName: Story = {
  args: {
    event: {
      ...mockEvent,
      id: '6',
      name: 'The Greatest Show on Earth: A Spectacular Evening of Music, Dance, and Entertainment',
    },
  },
};
