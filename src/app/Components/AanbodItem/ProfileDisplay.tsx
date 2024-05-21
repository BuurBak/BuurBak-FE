import { TrailerList } from "@/app/Types/TrailerList";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";

const ProfileDisplay = ({ trailerOffer }: { trailerOffer: TrailerList }) => {
  return (
    <div className="flex items-center gap-4 w-full h-fit bg-offWhite-100 rounded-md p-2">
      <div className="relative h-full w-auto aspect-square">
        {(trailerOffer.owner.profilePictureUrl && (
          <Image
            src={trailerOffer.owner.profilePictureUrl}
            alt="profile picture"
            fill
            sizes="100% 100%"
            priority={false}
            className="rounded-md object-cover"
          />
        )) || <CircleUserRound className="size-[3em]" />}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-normal">{trailerOffer.owner.name}</p>
        <p className="text-small">Verhuurder</p>
      </div>
    </div>
  );
};

export default ProfileDisplay;