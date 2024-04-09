"use client"

import Card from "./Components/Card";
import Footer from "./Components/Footer";
import Highlights from "./Components/Highlights";
import Landing from "./Components/Landing";

export default function Home() {

  return (
    <div>
      <Card type="overview"/>
      <Card type="category"/>
      <Landing />
      <Highlights />
      <Footer />
    </div>
  );
}
