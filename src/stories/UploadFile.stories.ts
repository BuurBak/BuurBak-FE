import FileUpload from "@/app/Components/UploadFile";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Molecules/FileUpload",
  component: FileUpload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onFilesChange: () => {},
  },
};
