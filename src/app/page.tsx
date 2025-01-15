import AanbodPreview from "./Components/AanbodPreview";
import Highlights from "./Components/Highlights";
import Landing from "./Components/Landing";

export default function Home() {
  return (
    <div>
      <Landing />
      <AanbodPreview />
      <Highlights />
      {/* <AanbodCategorieën /> */}
    </div>
  );
}
