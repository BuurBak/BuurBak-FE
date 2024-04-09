import type { Meta, StoryObj } from "@storybook/react";
import Card from "../app/Components/Card";
import { useState } from "react";

const meta = {
  title: "InputsAndSelection/Card",
  component: Card,
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
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    titel: "primary",
    location: "place",
    distance: "10km",
    type: "overview",
    img: "https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png",
    accesoires: "thing",
    price: "20",
    discription: "very description",
    link: ""
  },
};