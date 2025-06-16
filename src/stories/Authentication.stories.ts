import Authentication from "@/app/Components/Authentication";
import { UserDetails } from "@/app/Types/User";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Molecules/Register",
  component: Authentication,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Authentication>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { user: {} as UserDetails, onLogin: () => { } } };
