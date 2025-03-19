"use client";
import StarRating from "../../Components/StarRating";
import Button from "../../Components/Button";
import { useState, useEffect } from "react";
import ProfileDisplay from "../../Components/AanbodItem/ProfileDisplay";
import { TrailerData } from "@/app/Types/Reservation";
import { getTrailer } from "@/app/api/Trailer-controller";
import InputField from "../../Components/InputField";
import Carousel from "@/app/Components/AanbodItem/Carousel"; 
import DialogComponent from "@/app/Components/AanbodItem/Dialog";
import ImageGallery from "@/app/Components/AanbodItem/ImageGallery";
import Image from "next/image";

const ReviewPage = ({ params }: { params: { AanbodId: string } }) => {
  const [trailerOffer, setTrailerOffer] = useState<TrailerData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  }

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
      {trailerOffer && (
        <>
          <div className="w-[80dvw] h-fit flex flex-col md:flex-row justify-evenly items-center p-3">
            <div className="hidden md:flex relative w-[30vw] h-[30vh] ">
              <Image
              onClick={handleClickOpen}
              src={trailerOffer.images[0]}
              alt="Trailer image 1"
              fill
              priority={true}
              className="hover:brightness-75 transition duration-100"/>     
            </div>                   
                            
            <div className="sm:hidden w-full h-fit ">
              <Carousel params={trailerOffer.images} />
            </div>       
            <DialogComponent trailerImageArray={trailerOffer.images} open={open} setOpen={setOpen} />

              
              <div className="flex flex-col justify-evenly items-center md:items-start md:h-[30vh]">
                  <ProfileDisplay trailerOffer={trailerOffer} />               
                
                  <h2 className="text-primary-100 text-h4 text-center md:text-left">
                    {trailerOffer.trailer_type}
                  </h2>
              </div>
          </div>
        </>
      )}
      <form className="flex flex-col items-center justify-center">
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
      </form>
    </main>
  );
};

export default ReviewPage;
