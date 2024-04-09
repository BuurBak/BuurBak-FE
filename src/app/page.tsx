import Button from "./Components/Button";
import Footer from "./Components/Footer";
import Highlights from "./Components/Highlights";
import Landing from "./Components/Landing";

export default function Home() {

  return (
    <div>
      <Button label='Bekijk het aanbod' icon disabled/>
      <Landing />
      <Highlights />
      <Footer />
    </div>
  );
}
