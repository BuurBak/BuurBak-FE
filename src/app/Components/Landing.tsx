"use client";

import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import Button from "./Button";
import Image from "next/image";

export default function Landing() {
  return (
    <div className="flex justify-center items-center h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/img/BuurBak_Duurzaam-Delen_Aanhanger02972022_1920_1.webp" // Path to your hero image in the public folder
          alt="Hero Background"
          fill // This makes the image fill the parent div
          style={{ objectFit: 'cover' }} // Ensures the image covers the area without distortion
          priority // Preloads the image as it's above the fold
          quality={80} // Adjust quality for optimization
        />
      </div>
      <div className="flex justify-center items-center flex-col w-full h-full backdrop-brightness-50">
        <h1 className="hidden md:flex text-white w-5/12 text-center font-sans font-bold">
          Huur en verhuur je aanhanger via BuurBak
        </h1>
        <h3 className="flex md:hidden text-white w-full text-center font-sans font-bold">
          Huur en verhuur je aanhanger via BuurBak
        </h3>
        <div className="flex flex-col items-center mt-5 mb-16">
          <div className="hidden md:flex flex-row w-fit justify-between">
            <div className="flex items-center mr-10">
              <CircleCheckBig className="h-8 w-8 text-succes-100 mr-4" />
              <h6 className="text-white">Altijd in de buurt</h6>
            </div>
            <div className="flex items-center mr-10">
              <CircleCheckBig className="h-8 w-8 text-succes-100 mr-4" />
              <h6 className="text-white">Altijd duurzaam</h6>
            </div>
            <div className="flex items-center">
              <CircleCheckBig className="h-8 w-8 text-succes-100 mr-4" />
              <h6 className="text-white">Altijd eenvoudig</h6>
            </div>
          </div>
          <div className="flex justify-between mt-12 w-fit">
            <Link href={"/aanbod"}>
              <Button label="Bekijk het aanbod" className="w-60" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

//
