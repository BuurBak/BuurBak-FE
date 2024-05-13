"use client";

import Carousel from "@/app/Components/AanbodItem/Carousel";
import Details from "@/app/Components/AanbodItem/Details";
import DialogComponent from "@/app/Components/AanbodItem/Dialog";
import ImageGallery from "@/app/Components/AanbodItem/ImageGallery";
import ProfileDisplay from "@/app/Components/AanbodItem/ProfileDisplay";
import Button from "@/app/Components/Button";
import Footer from "@/app/Components/Footer";
import Map from "@/app/Components/Map";
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

          <div className="flex gap-4 relative">
            <div className="flex flex-col gap-8 w-full">
              <h1 className="text-primary-100 text-h4">
                {trailerOffer.trailerType.name}
              </h1>

              <ProfileDisplay trailerOffer={trailerOffer} />

              <div>
                <p className="text-h5 font-bold">Omschrijving</p>
                <p>{trailerOffer.description}</p>
              </div>

              <Details trailerOffer={trailerOffer} />

              <div className="flex flex-col gap-2">
                <p className="text-h5 font-bold">
                  Locatie - Omgeving {trailerOffer.address.city}
                </p>
                <div className="h-[30dvh] w-full">
                  <Map />
                </div>
              </div>
            </div>
            <div className="h-fit min-w-fit w-full sm:w-fit p-4 bg-offWhite-100 fixed bottom-0 sm:sticky sm:top-5 flex justify-between ">
              <div className="flex flex-col justify-between sm:hidden">
                <p>
                  <span className="font-bold">€{trailerOffer.price}</span> per
                  dag
                </p>
                <p>Geen datum gekozen</p>
              </div>
              <Button label="Reserveer nu" styling="min-w-fit" />
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Page;
