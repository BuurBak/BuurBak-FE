import type { Meta, StoryObj } from "@storybook/react";
import InputField from "../app/Components/InputField";

const meta = {
  title: "InputsAndSelection/InputField",
  component: InputField,
  parameters: {
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    label: "primary",
    value: "",
    inputType: "text",
  },
};

export const Secondary: Story = {
  args: {
    label: "secondary",
    value: 0,
    inputType: "star",
  },
};
