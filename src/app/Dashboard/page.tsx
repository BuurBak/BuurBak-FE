import React from "react";
import Profiel from "./Profiel";
import JouwReserveringen from "./JouwReserveringen";
import TrailerReserveringen from "./TrailerReserveringen";

export default function page() {
  return (
    <main className="bg-offWhite-100">
      <div className=" mt-[88px]  md:p-2 flex md:flex-row flex-col  mx-auto max-w-[1440px]">
        <div className="bg-white rounded-xl md:w-96  m-2 p-4 md:max-h-[470px]">
          <Profiel />
        </div>
        <div className="bg-white rounded-xl basis-1/2  m-2 p-2">
          <JouwReserveringen />
        </div>
        <div className="bg-white rounded-xl basis-1/2 m-2 p-2">
          <TrailerReserveringen />
        </div>
      </div>
    </main>
  );
}
