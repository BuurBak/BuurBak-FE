import Image from "next/image";
import { useState } from "react";
import Button from "../Button";

const Carousel = ({
  params,
  mobile,
}: {
  params: string[] | undefined;
  mobile: boolean;
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images: string[] = params || [""];

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full h-[80dvh] flex flex-col gap-4">
      <div className="relative h-full w-full">
        <Image
          src={images[currentSlide]}
          alt="Trailer image 1"
          fill
          sizes="100% 100%"
          priority={true}
          className="rounded-md object-contain"
        />
        <div className="absolute inset-0 flex items-end justify-between ">
          <Button buttonAction={prevSlide} label="Vorige" type="secondary" />
          <Button buttonAction={nextSlide} label="Volgende" type="secondary" />
        </div>
      </div>
      {mobile && (
        <div className="flex gap-4 h-32 w-full ">
          {images?.map((item, index) => {
            return (
              <div
                key={index}
                className={`h-full w-32 relative ${index === currentSlide && "border-primary-100 border-4 rounded-md"}`}
              >
                <Image
                  src={item}
                  alt="Trailer image 1"
                  fill
                  sizes="100% 100%"
                  priority={true}
                  className="rounded-md object-cover "
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Carousel;
