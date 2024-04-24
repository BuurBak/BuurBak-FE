"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import AanbodList from "../Components/AanbodList";
import Footer from "../Components/Footer";

export default function AanbodPage() {
  return (
    <div>
      <PanelGroup direction="horizontal">
        <Panel defaultSize={50} minSize={20}>
          <div className="h-screen">
            <AanbodList />
          </div>
        </Panel>
        <PanelResizeHandle className="w-3 bg-offWhite-100 flex items-center">
          <div className="w-2 h-10 bg-primary-100 rounded-sm" />
        </PanelResizeHandle>
        <Panel defaultSize={50} minSize={20}>
          <div className="h-screen bg-green-400"></div>
        </Panel>
      </PanelGroup>
      <Footer />
    </div>
  );
}
