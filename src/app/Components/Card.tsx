import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChangeEventHandler } from "react";

type CardType = {
  label?: string,
  type?: "overview" | "category";
};

const Card = ({ label, type, ...props }: CardType) => {

  return (
    <div className={(type === "overview" ? "w-64 h-80 border border-offWhite-100" : "")}>
      <div className="w-full h-44">
      <img alt="trailer" src={allImages[currentImageIndex]} />
      </div>
      </div>
  )
};

export default Card;