import Footer from "./Components/Footer";
import Highlights from "./Components/Highlights";
import TextInputField from "./Components/TextInputField";

export default function Home() {
  return (
    <div>
      <TextInputField label="test" outline/>
      <Highlights />
      <Footer />
    </div>
  );
}
