"use client";

import Footer from "../Components/Footer";
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels'
import Map from "../Components/Map";

export default function AanbodPage() {
    return (
      <div>
        <PanelGroup direction="horizontal">
            <Panel defaultSize={50} minSize={20}>
                <div className='h-screen bg-secondary-100'></div>
            </Panel>
            <PanelResizeHandle className='w-2'/>
            <Panel defaultSize={50} minSize={20}>
                <div className='h-screen bg-primary-100'><Map/></div>
            </Panel>
        </PanelGroup>
        <Footer />
      </div>
    );
  }
  