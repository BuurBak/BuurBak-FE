"use client";
import React, { useState, ChangeEvent } from "react";
import StarRating from "../../Components/StarRating";
import Button from "../../Components/Button";
import SuccessPopup from "@/app/contact/SuccesPopup";
import InputField from "../../Components/InputField";
import ProfileDisplay from "../../Components/AanbodItem/ProfileDisplay";
import DialogComponent from "@/app/Components/AanbodItem/Dialog";
import Carousel from "@/app/Components/AanbodItem/Carousel";
import Image from "next/image";
import { getTrailer } from "@/app/api/Trailer-controller";
import { TrailerData } from "@/app/Types/Reservation";
import { useEffect } from "react";

const ReviewPage = ({ params }: { params: { AanbodId: string } }) => {
  const [formData, setFormData] = useState({
    reviewText: "",
    rating: 0,
  });
  const [showPopup, setShowPopup] = useState(false);
  const [trailerOffer, setTrailerOffer] = useState<TrailerData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(formData);
      //  await sendReview(formData);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      setFormData({ reviewText: "", rating: 0 });
    } catch (error) {
      console.error("Fout bij verzenden review:", error);
      alert("Er is een probleem opgetreden bij het verzenden van je review.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="sm:pt-6 flex flex-col items-center mt-[110px] sm:pt-6">
      {showPopup && <SuccessPopup message="Review succesvol verzonden!" />}

      <h2 className="text-center text-h5 md:text-h2 m-3">
        Laat een review achter voor jouw gehuurde aanhanger
      </h2>

      {trailerOffer && (
        <div className="w-[80dvw] h-fit flex flex-col md:flex-row justify-evenly items-center p-3 gap-5">
          <div className="hidden md:flex relative w-[30vw] h-[30vh] ">
            <Image
              onClick={handleClickOpen}
              src={trailerOffer.images[0]}
              alt="Trailer image 1"
              fill
              priority={true}
              className="hover:brightness-75 transition duration-100 object-cover rounded-md"
            />
          </div>

          <div className="sm:hidden w-full h-fit ">
            <Carousel params={trailerOffer.images} />
          </div>
          <DialogComponent
            trailerImageArray={trailerOffer.images}
            open={open}
            setOpen={setOpen}
          />

          <div className="flex flex-col justify-evenly items-center md:items-start md:h-[30vh] gap-4  ">
            <ProfileDisplay trailerOffer={trailerOffer} />

            <h2 className="text-primary-100 text-h4 text-center md:text-left">
              {trailerOffer.trailer_type}
            </h2>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <StarRating
          rating={formData.rating}
          onRatingChange={(rating) => setFormData({ ...formData, rating })}
        />
        <InputField
          type="text"
          className="md:w-[50dvw] w-[80dvw] m-5"
          label="Type hier je review..."
          inputType="text"
          value={formData.reviewText}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, reviewText: e.target.value })
          }
          required
        />
        <Button label="Verstuur" submit type="primary" className="m-5" />
      </form>
    </main>
  );
};

export default ReviewPage;
