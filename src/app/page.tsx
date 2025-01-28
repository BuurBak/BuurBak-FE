import AanbodPreview from "./Components/AanbodPreview";
import Highlights from "./Components/Highlights";
import Hotjar from "./Components/Hotjar";
import Landing from "./Components/Landing";
import "./styles.css";

export default function Home() {
  return (
    <div>
      <Landing />
      <AanbodPreview />
      <Highlights />
      {/* <AanbodCategorieën /> */}
      <Hotjar />
    </div>
  );
}
