import type { Meta, StoryObj } from "@storybook/react";
import TextInputField from "../app/Components/TextInputField";

const meta = {
  title: "InputsAndSelection/TextInputField",
  component: TextInputField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Needs this code in parent to work updating the state: const [inputValue1, setInputValue1] = useState(''); const changeInputValue1 = (event: { target: { value: any; }; }) => { if (event.target && event.target.value !== undefined) { setInputValue1(event.target.value)}}"
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
} satisfies Meta<typeof TextInputField>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    label: "primary",
    inputValue: '',
  },
};