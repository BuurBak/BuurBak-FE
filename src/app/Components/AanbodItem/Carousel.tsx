import Image from "next/image";
import { useRef, useState } from "react";
import Button from "../Button";

const Carousel = ({ params }: { params: string[] | undefined }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images: string[] = params || [""];
  const touchStartX = useRef<number | null>(null);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStartX.current) return;

    const touchEndX = event.touches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    console.log(diffX);

    if (diffX > 5) {
      nextSlide();
    } else if (diffX < -5) {
      prevSlide();
    }

    touchStartX.current = null;
  };

  return (
    <div
      className="w-full h-[35dvh] sm:h-[80dvh] flex flex-col gap-4"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="relative h-full w-full">
        <Image
          src={images[currentSlide]}
          alt="Trailer image 1"
          fill
          sizes="100% 100%"
          priority={true}
          className="sm:rounded-md object-cover sm:object-contain "
        />
        <div className="absolute inset-0 hidden sm:flex items-end justify-between ">
          <Button buttonAction={prevSlide} label="Vorige" type="secondary" />
          <Button buttonAction={nextSlide} label="Volgende" type="secondary" />
        </div>
        <div className="absolute inset-4 flex sm:hidden items-end justify-center">
          <p className="rounded-full py-3 px-6 bg-black-200 text-white">
            {currentSlide + 1}/{images.length}
          </p>
        </div>
      </div>
      <div className="hidden sm:flex gap-4 h-32 w-full">
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
    </div>
  );
};

export default Carousel;
