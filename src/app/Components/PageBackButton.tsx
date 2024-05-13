import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const PageBackButton = () => {
  return (
    <Link
      href="#"
      onClick={() => window.history.back()}
      className="p-2 bg-black-200 rounded-full absolute top-4 left-4 z-50 text-white"
    >
      <ChevronLeft />
    </Link>
  );
};

export default PageBackButton;
