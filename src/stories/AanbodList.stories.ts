import AanbodList from "@/app/Components/AanbodList";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Organisms/AanbodList",
  component: AanbodList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AanbodList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
