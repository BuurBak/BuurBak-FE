import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChangeEventHandler, useEffect, useState } from "react";
import { TrailerList } from "../Types/TrailerList";
import Link from "next/link";

type CardType = {
  title: string,
  type: "overview" | "category",
  img: string,
  location?: string,
  distance?: string,
  accesoires?: string,
  price?: string,
  discription?: string,
  link: string;
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

//  Examples:  
// <Card link="/" title="Gesloten aanhanger" location="Laren" distance="2km" accesoires="Dissel slot" price="20" type="overview" img="/img/BuurBak_Duurzaam-Delen_Aanhanger02972022_1920_1.webp"/>
// <Card link="/" title="Open aanhangers" discription="Bied veelzijdigheid en eenvoudig laden." type="category" img="/img/verhuurfoto.png"/>

const Card = ({ title, type, img, location, distance, accesoires, price, discription, link, ...props }: CardType) => {
  return (
    <Link href={link} className="w-fit">
      <div className={(type === "overview" ? "w-48 xl:w-64" : "w-96") + " rounded-md h-fit border border-offWhite-100 bg-white"}>
        <img alt="trailer" src={img} className={(type === "overview" ? "object-center h-32 xl:h-44" : "object-top h-64") + " w-full overflow-hidden object-cover"} />
        <div className={(type === "overview" ? "flex" : "hidden") + " flex-col gap-1 p-2"}>
          <h5 className="hidden xl:flex text-primary-100">{title}</h5>
          <p className="flex xl:hidden text-primary-100 font-bold">{title}</p>
          <p className="text-gray-100 xl:text-xl">{location} - {distance}</p>
          <p className="text-gray-100 xl:text-xl">accesoires: {accesoires}</p>
          <p className="xl:text-xl">€{price} per dag</p>
        </div>
        <div className={(type === "overview" ? "hidden" : "flex") + " flex-col gap-1 p-2"}>
          <h5 className="flex text-primary-100">{title}</h5>
          <p className="text-gray-100 xl:text-xl min-h-14">{discription}</p>
        </div>
      </div>
    </Link>
  )
};

export default Card;