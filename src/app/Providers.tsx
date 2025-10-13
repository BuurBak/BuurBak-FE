"use client";

import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <HeroUIProvider
      locale="nl-NL"
      navigate={(href) => {
        if (typeof href === "string") router.push(href);
      }}
    >
      {children}
    </HeroUIProvider>
  );
}

