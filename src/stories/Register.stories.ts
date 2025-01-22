import Register from "@/app/Components/Register";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Molecules/Register",
  component: Register,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Register>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
