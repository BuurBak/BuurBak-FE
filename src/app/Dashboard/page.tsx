import React from "react";
import Profiel from "./Profiel";
import JouwReserveringen from "./JouwReserveringen";
import TrailerReserveringen from "./TrailerReserveringen";

export default function page() {
  return (
    <main className=" mt-[88px] bg-gray-50 md:p-2 flex md:flex-row flex-col  mx-auto max-w-[1440px]">
      <div className="bg-white md:w-96  m-2 p-2 md:max-h-[470px]">
        <Profiel />
      </div>
      <div className="bg-white basis-1/2  m-2 p-2">
        <JouwReserveringen />
      </div>
      <div className="bg-white basis-1/2 m-2 p-2">
        <TrailerReserveringen />
      </div>
    </main>
  );
}
