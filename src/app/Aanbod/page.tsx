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
        <PanelResizeHandle className="w-2" />
        <Panel defaultSize={50} minSize={20}>
          <div className="h-screen bg-primary-100"></div>
        </Panel>
      </PanelGroup>
      <Footer />
    </div>
  );
}
