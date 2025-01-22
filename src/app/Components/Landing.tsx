"use client";

import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import Button from "./Button";

export default function Landing() {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-landing-background bg-cover bg-center overflow-hidden">
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
              <Button label="Bekijk het aanbod" className="w-[246px]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

//
