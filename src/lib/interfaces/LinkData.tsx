import { LucideIcon } from "lucide-react";

export interface LinkData {
    name: string;
    href: string;
    icon: LucideIcon | Function;
    displayAsButton?: boolean;
}