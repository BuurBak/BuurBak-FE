"use client";

import Carousel from "@/app/Components/AanbodItem/Carousel";
import DialogComponent from "@/app/Components/AanbodItem/Dialog";
import ImageGallery from "@/app/Components/AanbodItem/ImageGallery";
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
      <ImageGallery trailerOffer={trailerOffer} setOpen={setOpen} />

      {trailerOffer && (
        <>
          <div className="sm:hidden w-full h-fit">
            <Carousel
              params={[trailerOffer?.coverImage, ...trailerOffer?.images]}
            />
          </div>

          <DialogComponent
            trailerImageArray={[
              trailerOffer?.coverImage,
              ...trailerOffer?.images,
            ]}
            open={open}
            setOpen={setOpen}
          />
        </>
      )}
    </div>
  );
};

export default Page;
