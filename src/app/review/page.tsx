"use client";
import StarRating from "../Components/StarRating";
import Button from "../Components/Button";
import { useState, useEffect } from "react";
import LogoColor from "../Assets/horizontalColorLogo.svg";
import Image from "next/image";
import ProfileDisplay from "../Components/AanbodItem/ProfileDisplay";
import { TrailerData } from "@/app/Types/Reservation";
import { getTrailer } from "@/app/api/Trailer-controller";
import InputField from "../Components/InputField";

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
      <h2 className="text-center text-h5 md:text-h2 h-fit m-3">
        Laat een review achter voor jouw gehuurde aanhanger
      </h2>
      {/* {trailerOffer && ( */}
      {/* <> */}
      <div className="w-[80dvw] h-60 flex flex-col md:flex-row justify-evenly items-center p-3">
        <Image alt="Buurbak logo" src={LogoColor} className={"w-max h-max"} />
        <div className="h-full flex flex-col justify-evenly items-center md:items-start">
          <div>
            {/* <ProfileDisplay trailerOffer={trailerOffer} /> */} <p>Jan de Boom</p>
          </div>
          <h2 className="text-primary-100 text-h4 text-center md:text-left">
            {/* {trailerOffer.trailer_type} */} Gesloten Aanhanger
          </h2>
        </div>
      </div>
      {/* </> */}
      {/* )} */}
      <StarRating />
      <InputField
            type="text"
            // pattern="^(?:[A-Z]|[a-z])[a-z ]+(?: [A-Z]?[a-z ]*)*$"
            className=" md:w-[50dvw] w-[80dvw]  m-5"
            label="Type hier je review..."
            inputType="text"
            outline={true}
            required
            />

      <Button label="Verstuur" submit type="primary" className="m-5" />
    </main>
  );
};

export default ReviewPage;
