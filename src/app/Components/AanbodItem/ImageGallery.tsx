import { TrailerList } from "@/app/Types/TrailerList";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

const ImageGallery = ({
  trailerOffer,
  setOpen,
}: {
  trailerOffer: TrailerList | undefined;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <>
      {trailerOffer && (
        <div className="w-5/6 h-96 overflow-hidden">
          <div className="grid grid-cols-3 grid-rows-2 gap-2 h-full w-full">
            <div className="row-span-2 col-span-1 relative">
              {trailerOffer?.coverImage && (
                <Image
                  onClick={handleClickOpen}
                  src={trailerOffer.coverImage}
                  alt="Trailer image 1"
                  fill
                  sizes="100% 100%"
                  priority={true}
                  className="rounded-md object-cover hover:brightness-75 transition duration-100"
                />
              )}
            </div>
            {trailerOffer.images?.slice(0, 4).map((item, index) => (
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
