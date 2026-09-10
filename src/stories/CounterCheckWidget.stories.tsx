import type { Meta, StoryObj } from '@storybook/react';
import { CounterCheckWidget } from '../components/CounterCheckWidget';

const meta: Meta<typeof CounterCheckWidget> = {
  title: 'Fragments/CounterCheckWidget',
  component: CounterCheckWidget,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CounterCheckWidget>;

export const DefaultTrigger: Story = {
  args: {
    productId: 'prod_breville_barista_touch',
    productName: 'Barista Touch Espresso Machine',
    productHeightCm: 40.7,
    productTopClearanceCm: 12.0,
    onSelectAlternative: (id) => alert(`Selected alternative product: ${id}`),
  },
};

export const CompactAppliance: Story = {
  args: {
    productId: 'prod_delonghi_dedica',
    productName: "De'Longhi Dedica Deluxe Slim",
    productHeightCm: 30.5,
    productTopClearanceCm: 5.0,
    onSelectAlternative: (id) => alert(`Selected alternative product: ${id}`),
  },
};

export const TallApplianceWarning: Story = {
  args: {
    productId: 'prod_vitamix_5200',
    productName: 'Vitamix 5200 Professional Blender',
    productHeightCm: 52.0,
    productTopClearanceCm: 6.0,
    onSelectAlternative: (id) => alert(`Selected alternative product: ${id}`),
  },
};
