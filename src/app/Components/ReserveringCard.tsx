import { Calendar, Check, X } from "lucide-react";
import Image from "next/image";
import BuurBakImage from "../../../public/img/BuurBak_Duurzaam-Delen_Aanhanger02972022_1920_1.webp";

type ReserveringCard = {
  trailerReservering: boolean;
};

const ReserveringCard = ({ trailerReservering }: ReserveringCard) => {
  return (
    <div className="flex gap-4 h-fit w-fit items-center">
      <div className="min-w-40 aspect-video relative">
        <Image
          src={BuurBakImage}
          alt="Trailer image 1"
          fill
          sizes="100% 100%"
          priority={true}
          className="rounded-md object-cover"
        />
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-normal">Open aanhanger</p>
        <div className="flex gap-2">
          <Calendar />
          <p className="text-normal">30 mei tot 31 mei 2024</p>
        </div>
        <p className="p-2 border rounded text-primary-100 text-small w-fit h-fit">
          In behandeling
        </p>
      </div>
      {trailerReservering && (
        <div className="flex gap-4">
          <Check className="text-succes-100 hover:bg-succes-100 hover:bg-opacity-30 rounded-full p-2 w-10 h-10" />
          <X className="text-error-100 hover:bg-error-100 hover:bg-opacity-30 rounded-full p-2 w-10 h-10" />
        </div>
      )}
    </div>
  );
};

export default ReserveringCard;
