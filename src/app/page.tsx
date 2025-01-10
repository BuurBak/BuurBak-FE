"use client";

import React, { useEffect } from "react";
import AanbodCategorieën from "./Components/AanbodCategorieën";
import AanbodPreview from "./Components/AanbodPreview";
import Highlights from "./Components/Highlights";
import Landing from "./Components/Landing";

const siteId = 5263325; // Vervang met je Hotjar Site ID
const hotjarVersion = 6; // Vervang met je Hotjar versie

export default function Home() {
  useEffect(() => {
    // Hotjar Initialisatie
    console.log("Initializing Hotjar...");
    try {
      (function (h: any, o: any, t: any, j: any, a?: any, r?: any) {
        h.hj =
          h.hj ||
          function () {
            (h.hj.q = h.hj.q || []).push(arguments);
          };
        h._hjSettings = { hjid: siteId, hjsv: hotjarVersion }; // Gebruik de variabelen hier
        a = o.getElementsByTagName("head")[0];
        r = o.createElement("script");
        r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
      })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
      console.log("Hotjar initialized successfully.");
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
