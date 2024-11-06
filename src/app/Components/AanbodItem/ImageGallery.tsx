import { TrailerData } from "@/app/Types/Reservation";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

const ImageGallery = ({
  trailerOffer,
  setOpen,
}: {
  trailerOffer: TrailerData | undefined;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <>
      {trailerOffer && (
        <div className="w-5/6 h-96 overflow-hidden hidden sm:block">
          <div className="grid grid-cols-3 grid-rows-2 gap-2 h-full w-full">
            <div className="row-span-2 col-span-1 relative">
              {trailerOffer?.images && (
                <Image
                  onClick={handleClickOpen}
                  src={trailerOffer.images[0]}
                  alt="Trailer image 1"
                  fill
                  sizes="100% 100%"
                  priority={true}
                  className="rounded-md object-cover hover:brightness-75 transition duration-100"
                />
              )}
            </div>
            {trailerOffer.images?.slice(1, 4).map((item, index) => (
              <div key={index} className="col-span-1 row-span-1 relative">
                <Image
                  onClick={handleClickOpen}
                  src={item}
                  alt={`Trailer image ${index + 2}`}
                  fill
                  sizes="100% 100%"
                  priority={true}
                  className="rounded-md object-cover hover:brightness-75 transition duration-100"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
