import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const PageBackButton = ({ ...props }) => {
  return (
    <Link
      href="#"
      onClick={() => window.history.back()}
      className="p-2 bg-black-200 rounded-full absolute top-4 left-4 z-50 text-white sm:hidden"
      {...props}
    >
      <ChevronLeft />
    </Link>
  );
};

export default PageBackButton;
