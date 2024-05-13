"use client";

import Carousel from "@/app/Components/AanbodItem/Carousel";
import Details from "@/app/Components/AanbodItem/Details";
import DialogComponent from "@/app/Components/AanbodItem/Dialog";
import ImageGallery from "@/app/Components/AanbodItem/ImageGallery";
import ProfileDisplay from "@/app/Components/AanbodItem/ProfileDisplay";
import PageBackButton from "@/app/Components/PageBackButton";
import { TrailerList } from "@/app/Types/TrailerList";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { AanbodId: string } }) => {
  const [trailerOffer, setTrailerOffer] = useState<TrailerList>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pilot.buurbak.nl/api/v1/traileroffers/${params.AanbodId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: TrailerList = await response.json();
        setTrailerOffer(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
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
    <div className="w-dvw h-fit flex flex-col items-center gap-4 sm:pt-4">
      <PageBackButton />
      <ImageGallery trailerOffer={trailerOffer} setOpen={setOpen} />
      {trailerOffer && (
        <>
          <div className="sm:hidden w-full h-fit">
            <Carousel
              params={[trailerOffer.coverImage, ...trailerOffer.images]}
            />
          </div>

          <DialogComponent
            trailerImageArray={[
              trailerOffer.coverImage,
              ...trailerOffer.images,
            ]}
            open={open}
            setOpen={setOpen}
          />

          <div className="flex flex-col gap-4 w-11/12">
            <h1 className="text-primary-100 text-h4">
              {trailerOffer.trailerType.name}
            </h1>

            <ProfileDisplay trailerOffer={trailerOffer} />

            <div>
              <p className="text-h5 font-bold">Omschrijving</p>
              <p>{trailerOffer.description}</p>
            </div>

            <Details trailerOffer={trailerOffer} />
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
