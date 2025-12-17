import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from '../index';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click me',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const Submit: Story = {
  args: {
    children: 'Submit',
    type: 'submit',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: 'Custom Style',
    className: 'bg-green-600 hover:bg-green-700',
  },
};
