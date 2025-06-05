import Button from "./Components/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[url('/img/404-background.jpg')] bg-cover bg-center text-white overflow-hidden">
      <div className="flex justify-center items-center flex-col w-full h-full backdrop-brightness-50">
        <h1 className="text-4xl font-bold mb-4 color-white text-center">
          404 - Pagina Niet Gevonden
        </h1>
        <p className="text-lg mb-8 color-white">
          De pagina waar je voor zoekt bestaat niet.
        </p>
        <Link href="/">
          <Button
            label="Ga terug naar de Homepage"
            submit
            type="primary"
            className="m-5"
          ></Button>
        </Link>
      </div>
    </div>
  );
}
