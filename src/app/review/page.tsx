"use client";
import StarRating from "../Components/StarRating";
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
    <main className=" sm:pt-6 flex flex-col items-center mt-[110px]">
      <h2 className="text-center">
        Laat een review achter voor jouw gehuurde aanhanger
      </h2>
      {/* {trailerOffer && ( */}
      {/* <> */}
      <div className="w-[80dvw] h-60 flex flex-col md:flex-row justify-evenly items-center p-3">
        <Image alt="Buurbak logo" src={LogoColor} className={"w-max h-max"} />
        <div className="h-full flex flex-col justify-evenly">
          <div>
            {/* <ProfileDisplay trailerOffer={trailerOffer} /> */} <p>Jippie</p>
          </div>
          <h2 className="text-primary-100 text-h4 ">
            {/* {trailerOffer.trailer_type} */} Gesloten Aanhanger
          </h2>
        </div>
      </div>
      {/* </> */}
      {/* )} */}
      <StarRating />

      <Button label="Verstuur" submit type="primary" />
    </main>
  );
};

export default ReviewPage;
