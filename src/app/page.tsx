"use client";

import React, { useEffect } from "react";
import Hotjar from "@hotjar/browser";
import AanbodCategorieën from "./Components/AanbodCategorieën";
import AanbodPreview from "./Components/AanbodPreview";
import Highlights from "./Components/Highlights";
import Landing from "./Components/Landing";

const siteId = 5262796; // Hotjar Site ID
const hotjarVersion = 6;

export default function Home() {
  useEffect(() => {
    // Hotjar Initialization
    console.log("Initializing Hotjar...");
    try {
      Hotjar.init(siteId, hotjarVersion);
      if (Hotjar.isInitialized()) {
        console.log("Hotjar initialized successfully.");
        Hotjar.event("app_loaded"); // Example: Log an event
      } else {
        console.error("Hotjar failed to initialize.");
      }
    } catch (error) {
      console.error("Error initializing Hotjar:", error);
    }
  }, []);

  return (
    <div>
      <Landing />
      <AanbodPreview />
      <Highlights />
      <AanbodCategorieën />
    </div>
  );
}
