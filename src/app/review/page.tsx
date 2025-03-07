"use client";

import { Star } from "lucide-react";
import Button from "../Components/Button";
import { useState, useEffect } from "react";
import LogoColor from "../Assets/horizontalColorLogo.svg";
import Image from "next/image";
import ProfileDisplay from "../Components/AanbodItem/ProfileDisplay";
import { TrailerData } from "@/app/Types/Reservation";
import { getTrailer } from "@/app/api/Trailer-controller";

const ReviewPage = ({ params }: { params: { AanbodId: string } }) => {
  const [trailerOffer, setTrailerOffer] = useState<TrailerData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTrailer(params.AanbodId);
        setTrailerOffer(data);
        setLoading(false);
      } catch (error: any) {
        console.warn(error.message);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <main className="w-dvw h-dvh flex flex-col justify-center items-center">
      <h2 className="text-center">
        Laat een review achter voor jouw gehuurde aanhanger
      </h2>
      <div className="w-max h-60 flex flex-row justify-center items-center">
        <Image alt="Buurbak logo" src={LogoColor} className={"w-max h-max"} />
        <div className="w-max h-max flex flex-col justify-center">
          <div className="bg-gray-200 w-full h-fit"></div>
          <div></div>
        </div>
      </div>

      <Button label="Verstuur" submit type="primary" />
    </main>
  );
};

export default ReviewPage;
