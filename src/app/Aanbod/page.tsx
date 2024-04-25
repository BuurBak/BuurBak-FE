"use client";

import { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import AanbodList from "../Components/AanbodList";
import Footer from "../Components/Footer";

export default function AanbodPage() {
  const [mobile, setMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 640) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <PanelGroup
        direction={mobile ? "vertical" : "horizontal"}
        className="min-h-dvh h-fit w-dvw"
      >
        <Panel defaultSize={50} minSize={20}>
          {!mobile ? (
            <AanbodList />
          ) : (
            <div className="bg-green-400 h-full w-full">test</div>
          )}
        </Panel>
        <PanelResizeHandle className="bg-offWhite-100 flex items-center justify-center w-full h-3 sm:w-3 sm:h-auto">
          <div className="bg-primary-100 rounded-sm absolute h-2 w-10 left-2/4 sm:w-2 sm:h-10 sm:top-2/4 sm:left-auto sm:fixed " />
        </PanelResizeHandle>
        <Panel defaultSize={50} minSize={20}>
          {!mobile ? (
            <div className="bg-green-400 h-full w-full">test</div>
          ) : (
            <AanbodList />
          )}
        </Panel>
      </PanelGroup>
      <Footer />
    </div>
  );
}
