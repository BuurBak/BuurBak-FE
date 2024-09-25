import React from "react";
import Profiel from "./Profiel";
import JouwReserveringen from "./JouwReserveringen";
import TrailerReserveringen from "./TrailerReserveringen";

export default function page() {
  return (
    <main className=" mt-[88px] bg-gray-50 md:p-16 flex md:flex-row flex-col  mx-auto">
      <div className="bg-white md:w-96 md:m-4 m-2 p-4">
        <Profiel />
      </div>
      <div className="bg-white basis-1/2 md:m-4 m-2 p-4 ">
        <JouwReserveringen />
      </div>
      <div className="bg-white basis-1/2 md:m-4 m-2 p-4">
        <TrailerReserveringen />
      </div>
    </main>
  );
}
