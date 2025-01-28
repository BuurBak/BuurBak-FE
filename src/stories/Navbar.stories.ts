import Navbar from "@/app/Components/NavBar";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Organisms/Navbar",
  component: Navbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
