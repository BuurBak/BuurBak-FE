import AanbodPreview from "./Components/AanbodPreview";
import Footer from "./Components/Footer";
import Highlights from "./Components/Highlights";
import Landing from "./Components/Landing";

export default function Home() {
  return (
    <div>
      <Landing />
      <Highlights />
      <AanbodPreview />
      <Footer />
    </div>
  );
}
