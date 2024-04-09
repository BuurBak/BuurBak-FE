"use client"

import Card from "./Components/Card";
import Footer from "./Components/Footer";
import Highlights from "./Components/Highlights";
import Landing from "./Components/Landing";

export default function Home() {

  return (
    <div>
      <Card link="/" titel="Gesloten aanhanger" location="Laren" distance="2km" accesoires="Dissel slot" price="20" type="overview" img="/img/BuurBak_Duurzaam-Delen_Aanhanger02972022_1920_1.webp"/>
      <Card link="/" titel="Open aanhangers" discription="Bied veelzijdigheid en eenvoudig laden." type="category" img="/img/verhuurfoto.png"/>
      <Landing />
      <Highlights />
      <Footer />
    </div>
  );
}
