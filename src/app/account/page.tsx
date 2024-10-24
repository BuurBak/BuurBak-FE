"use client";

import { CaravanIcon, CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReserveringCard from "../Components/ReserveringCard";
import { ReservationResponse } from "../Types/Reservation";
import { LoggedUser } from "../Types/User";
import { getAccount } from "../api/Customer-controller";
import {
  getTrailerReservationsOwner,
  getTrailerReservationsRenter,
} from "../api/Reservation-controller";

const page = () => {
  type Selected = "jouw aanhanger" | "jouw reservering";

  const [selected, setSelected] = useState<Selected>("jouw aanhanger");
  const [user, setUser] = useState<LoggedUser>();
  const [renter, setRenter] = useState<ReservationResponse | null>(null);
  const [owner, setOwner] = useState<ReservationResponse | null>(null);

  const account: string[] = [
    "Mijn gegevens",
    "Account gegevens",
    "Wijzig wachtwoord",
  ];

  useEffect(() => {
    const getApi = async () => {
      setUser(await getAccount());
    };
    getApi();
  }, []);

  useEffect(() => {
    const getApi = async () => {
      if (user) {
        setOwner(null);
        setRenter(null);
        let trailerReservationsOwner = await getTrailerReservationsOwner(
          user.id
        );
        if (trailerReservationsOwner) {
          console.log("trailerReservationsOwner", trailerReservationsOwner);
          setOwner(trailerReservationsOwner);
        }
        let trailerReservationsRenter = await getTrailerReservationsRenter(
          user.id
        );
        if (trailerReservationsRenter) setRenter(trailerReservationsRenter);
      }
    };
    getApi();
  }, [user]);

  const empty = (
    <div className="flex flex-col gap-4 justify-center items-center text-center">
      <CaravanIcon />
      <p className="text-normal">Er zijn nog geen trailers</p>
    </div>
  );

  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <div className="flex gap-10">
        <div className="border border-gray-100 w-fit h-fit flex flex-col gap-6 p-3">
          <div className="flex flex-col gap-4 items-center">
            <CircleUserRound className="w-auto h-[10vh]" />
            <h1 className="text-normal">{user?.name}</h1>
            <h4 className="text-small">{user?.address.city}</h4>
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
        <div className="w-[40vw] h-fit flex flex-col gap-3">
          <div className="flex gap-2">
            <p
              className={` ${
                selected !== "jouw reservering" && "text-primary-100"
              } cursor-pointer`}
              onClick={() => setSelected("jouw aanhanger")}
            >
              Jouw reservering
            </p>
            <p
              className={` ${
                selected !== "jouw aanhanger" && "text-primary-100"
              } cursor-pointer`}
              onClick={() => setSelected("jouw reservering")}
            >
              Jouw aanhanger
            </p>
          </div>
          <hr className="w-full bg-gray-100" />
          {selected === "jouw reservering" && renter?.content
            ? renter.content.map((item) => (
                <ReserveringCard
                  key={item.id}
                  trailerReservering={true}
                  image={item.trailer.coverImage}
                  title={item.trailer.trailerType.name}
                  state={item.confirmed}
                  startDate={item.startTime}
                  endDate={item.endTime}
                />
              ))
            : renter === undefined
            ? empty
            : null}

          {selected === "jouw aanhanger" && owner?.content
            ? owner?.content?.map((item) => {
                return (
                  <ReserveringCard
                    key={item.id}
                    trailerReservering={false}
                    image={item.trailer.coverImage}
                    title={item.trailer.trailerType.name}
                    state={item.confirmed}
                    startDate={item.startTime}
                    endDate={item.endTime}
                  />
                );
              })
            : owner === undefined
            ? empty
            : null}
        </div>
      </div>
    </div>
  );
};

export default page;
