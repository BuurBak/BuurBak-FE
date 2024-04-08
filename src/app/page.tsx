"use client"

import { useState } from "react";
import Footer from "./Components/Footer";
import Highlights from "./Components/Highlights";
import TextInputField from "./Components/TextInputField";
import Landing from "./Components/Landing";

export default function Home() {

  return (
    <div>
      <Landing />
      <Highlights />
      <Footer />
    </div>
  );
}
