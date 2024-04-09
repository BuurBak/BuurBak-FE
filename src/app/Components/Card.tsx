import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChangeEventHandler, useEffect, useState } from "react";
import { TrailerList } from "../Types/TrailerList";

type CardType = {
  label?: string,
  type?: "overview" | "category";
};
// code for getting trailers:

// const [data, setData] = useState<TrailerList[]>([])
// const [isLoading, setLoading] = useState(true) 

// useEffect(() => {
//   fetch("https://pilot.buurbak.nl/api/v1/traileroffers")
//     .then((res) => res.json())
//     .then((data) => {
//       setData(data);
//       setLoading(false);
//     });
// }, []);


const Card = ({ label, type, ...props }: CardType) => {

  return (
    <div className={(type === "overview" ? "w-48 xl:w-64 h-fit border border-offWhite-100" : "") + " rounded-md"}>
      <div className="w-full h-32 xl:h-44 overflow-hidden">
        {/* implement Data from database */}
        <img alt="trailer" src="/img/BuurBak_Duurzaam-Delen_Aanhanger02972022_1920_1.webp" className="object-cover object-center" />
      </div>
      <div className="flex flex-col gap-1 p-2">
        <h5 className="hidden xl:flex text-primary-100">Gesloten aanhanger</h5>
        <p className="flex xl:hidden text-primary-100 font-bold">Gesloten aanhanger</p>
        <p className="text-gray-100 xl:text-xl">Laren - 2km</p>
        <p className="text-gray-100 xl:text-xl">accesoires: Dissel slot</p>
        <p className="xl:text-xl">€20 per dag</p>
      </div>
    </div>
  )
};

export default Card;