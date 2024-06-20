"use client";

import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ReserveringCard from "../Components/ReserveringCard";

const page = () => {
  type Selected = "jouw aanhanger" | "jouw reservering";

  const [selected, setSelected] = useState<Selected>("jouw reservering");

  const account: string[] = [
    "Mijn gegevens",
    "Account gegevens",
    "Wijzig wachtwoord",
  ];

  return (
    <div className="flex gap-4">
      <div className="border border-gray-100 w-fit h-fit flex flex-col gap-6 p-3">
        <div className="flex flex-col gap-4 items-center">
          <CircleUserRound className="w-auto h-[10vh]" />
          <h1 className="text-normal">Stitch Poppins</h1>
          <h4 className="text-small">Blaricum, Noord-Holland</h4>
        </div>
        <div className="flex flex-col gap-4">
          {account?.map((item) => {
            return (
              <Link key={item} href="/account">
                <p className="text-normal">{item}</p>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="w-[60vw] h-fit">
        <div className="flex gap-2">
          <p
            className={` ${selected !== "jouw reservering" && "text-primary-100"} cursor-pointer`}
            onClick={() => setSelected("jouw aanhanger")}
          >
            Jouw reservering
          </p>
          <p
            className={` ${selected !== "jouw aanhanger" && "text-primary-100"} cursor-pointer`}
            onClick={() => setSelected("jouw reservering")}
          >
            Jouw aanhanger
          </p>
        </div>
        <hr className="w-full bg-gray-100" />
        <div>
          <ReserveringCard />
        </div>
      </div>
    </div>
  );
};

export default page;
