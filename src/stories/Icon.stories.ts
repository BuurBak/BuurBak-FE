import Icon from "@/app/Components/Icon";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Atoms/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: "AArrowDown",
    className: "",
  },
};
