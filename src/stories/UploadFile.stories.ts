import TrailerImagesUpload from "@/app/Components/TrailerImagesUpload";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Molecules/FileUpload",
  component: TrailerImagesUpload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TrailerImagesUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onFilesChange: () => { },
  },
};
