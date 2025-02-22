"use client";

import { useEffect } from "react";

const Hotjar = () => {
  useEffect(() => {
    // Hotjar Initialisatie
    try {
      (function (h: any, o: any, t: any, j: any, a?: any, r?: any) {
        h.hj =
          h.hj ||
          function () {
            (h.hj.q = h.hj.q || []).push(arguments);
          };
        h._hjSettings = { hjid: 5241159, hjsv: 6 }; // Hotjar settings
        a = o.getElementsByTagName("head")[0];
        r = o.createElement("script");
        r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
      })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
    } catch (error) {
      console.error("Error initializing Hotjar:", error);
    }

    // Microsoft Clarity Initialisatie
    try {
      (function (c: any, l: any, a: any, r: any, i?: any, t?: any, y?: any) {
        c[a] =
          c[a] ||
          function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
        t = l.createElement(r);
        t.async = 1;
        t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode?.insertBefore(t, y);
      })(window, document, "clarity", "script", "prudemtx5m");
    } catch (error) {
      console.error("Error initializing Microsoft Clarity:", error);
    }

    // Cookiebot Initialisatie
    try {
      const script = document.createElement("script");
      script.id = "Cookiebot";
      script.src = "https://consent.cookiebot.com/uc.js";
      script.setAttribute("data-cbid", "64138b24-59cf-4e36-891f-cd08c83ba9f7");
      script.type = "text/javascript";
      document.head.appendChild(script);
    } catch (error) {
      console.error("Error initializing Cookiebot:", error);
    }
  }, []);
  return <></>;
};

export default Hotjar;
