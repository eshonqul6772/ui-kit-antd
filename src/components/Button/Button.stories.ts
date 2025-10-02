import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { fn } from 'storybook/test';

import Button from './Button.vue';

const meta: Meta<typeof Button> = {
  title: 'System Design/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'default', 'dashed', 'link', 'text'],
    },
    shape: {
      control: 'select',
      options: ['default', 'circle', 'round'],
    },
    size: {
      control: 'select',
      options: ['small', 'middle', 'large'],
    },
    variant: {
      control: 'select',
      options: ['success', 'info', 'danger', 'warning'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    title: { control: 'text' },
  },
  args: {
    type: 'primary',
    shape: 'default',
    size: 'middle',
    loading: false,
    disabled: false,
    title: 'Button',
    onClick: fn(),
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `<Button v-bind="args">{{ args.title }}</Button>`,
  }),
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { type: 'primary', title: 'Primary Button' },
};

export const Default: Story = {
  args: { type: 'default', title: 'Default Button' },
};

export const Dashed: Story = {
  args: { type: 'dashed', title: 'Dashed Button' },
};

export const Link: Story = {
  args: { type: 'link', title: 'Link Button' },
};

export const Text: Story = {
  args: { type: 'text', title: 'Text Button' },
};

export const Loading: Story = {
  args: { type: 'primary', loading: true, title: 'Loading...' },
};

export const Disabled: Story = {
  args: { type: 'primary', disabled: true, title: 'Disabled Button' },
};
