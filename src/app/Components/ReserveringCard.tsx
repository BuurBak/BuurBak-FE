import { Calendar, Check, X } from "lucide-react";
import Image from "next/image";
import BuurBakImage from "../../../public/img/BuurBak_Duurzaam-Delen_Aanhanger02972022_1920_1.webp";

const ReserveringCard = () => {
  return (
    <div className="flex gap-2 h-fit w-fit">
      <div className="w-20 h-full aspect-square relative">
        <Image
          src={BuurBakImage}
          alt="Trailer image 1"
          fill
          sizes="100% 100%"
          priority={true}
          className="rounded-md object-cover hover:brightness-75 transition duration-100"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p>Open aanhanger</p>
        <div className="flex gap-2">
          <Calendar />
          <p>30 mei tot 31 mei 2024</p>
        </div>
        <p className="p-2 border rounded text-primary-100 w-fit h-fit">
          In behandeling
        </p>
      </div>
      <div>
        <Check className="text-succes-100" />
        <X className="text-error-100" />
      </div>
    </div>
  );
};

export default ReserveringCard;
