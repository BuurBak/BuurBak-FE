import { Calendar, Check, X } from "lucide-react";
import Image from "next/image";

type ReserveringCard = {
  trailerReservering: boolean;
  image: string;
  title: string;
  startDate: string;
  endDate: string;
  state: boolean;
  paid?: boolean;
};

const ReserveringCard = ({
  trailerReservering,
  image,
  title,
  startDate,
  endDate,
  state,
  paid,
}: ReserveringCard) => {
  return (
    <div className="flex gap-4 h-fit w-fit items-center">
      <div className="min-w-40 aspect-video relative">
        <Image
          src={image}
          alt="Trailer image 1"
          fill
          sizes="100% 100%"
          priority={true}
          className="rounded-md object-cover"
        />
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-normal">{title}</p>
        <div className="flex gap-2">
          <Calendar />
          <p className="text-normal">
            {startDate} {endDate}
          </p>
        </div>
        <p className="p-2 border rounded text-primary-100 text-small w-fit h-fit">
          {state ? "In behandeling" : "Bevestigd"}
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
