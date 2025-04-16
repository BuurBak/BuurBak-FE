import CommingSoon from "./Components/CommingSoon";
import "./styles.css";

export default function Home() {
  console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  return (
    <div>
      {/* <Landing /> */}
      {/* <AanbodPreview /> */}
      {/* <Highlights /> */}
      {/* <AanbodCategorieën /> */}
      {/* <Hotjar /> */}
      <CommingSoon />
    </div>
  );
}
