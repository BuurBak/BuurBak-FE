"use client";

import Footer from "../Components/Footer";
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels'

export default function AanbodPage() {
    return (
      <div>
        <PanelGroup direction="horizontal">
            <Panel defaultSize={50} minSize={20}>
                <div className='h-screen bg-secondary-100'></div>
            </Panel>
            <PanelResizeHandle className='w-2'/>
            <Panel defaultSize={50} minSize={20}>
                <div className='h-screen bg-primary-100'></div>
            </Panel>
        </PanelGroup>
        <Footer />
      </div>
    );
  }
  