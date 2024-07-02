import AanbodCategorieën from "./Components/AanbodCategorieën";
import AanbodPreview from "./Components/AanbodPreview";
import Footer from "./Components/Footer";
import Highlights from "./Components/Highlights";
import Landing from "./Components/Landing";
import Navbar from "./Components/NavBar";

export default function Home() {
  return (
    <div>
      <Landing />
      <AanbodPreview />
      <Highlights />
      <AanbodCategorieën />
    </div>
  );
}
