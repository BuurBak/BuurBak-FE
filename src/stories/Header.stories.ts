import Landing from "@/app/Components/Landing";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Organisms/Landing",
  component: Landing,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Landing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
