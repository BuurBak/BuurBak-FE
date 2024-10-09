import { icons } from "lucide-react";

export type IconName = keyof typeof icons;

type IconType = {
  name: IconName;
  className: string;
  color?: string;
  size?: number;
};

const Icon = ({ name, color, size, className }: IconType) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} className={className} />;
};

export default Icon;
