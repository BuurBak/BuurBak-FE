"use client";

import Carousel from "@/app/Components/AanbodItem/Carousel";
import Details from "@/app/Components/AanbodItem/Details";
import DialogComponent from "@/app/Components/AanbodItem/Dialog";
import ImageGallery from "@/app/Components/AanbodItem/ImageGallery";
import ProfileDisplay from "@/app/Components/AanbodItem/ProfileDisplay";
import Reserveren from "@/app/Components/AanbodItem/Reserveren";
import Footer from "@/app/Components/Footer";
import { GoogleMaps } from "@/app/Components/GoogleMaps";
import { GoogleMapsWrapper } from "@/app/Components/GoogleMapsWrapper";
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

  const trailerLocations: readonly google.maps.LatLngLiteral[] = [
    {
      lat: trailerOffer?.nearbyLatitude,
      lng: trailerOffer?.nearbyLongitude,
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-fit flex flex-col items-center gap-4 sm:pt-4 mt-[88px]">
      <PageBackButton />
      <ImageGallery trailerOffer={trailerOffer} setOpen={setOpen} />
      {trailerOffer && (
        <>
          <div className="sm:hidden w-full h-fit ">
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

          <div className="flex justify-center gap-4 relative w-full sm:px-8">
            <div className="flex flex-col gap-8 w-11/12 sm:w-full">
              <h1 className="text-primary-100 text-h4 ">
                {trailerOffer.trailerType.name}
              </h1>

              <ProfileDisplay trailerOffer={trailerOffer} />

              <div>
                <p className="text-h5 font-bold">Omschrijving</p>
                <p>{trailerOffer.description}</p>
              </div>

              <Details trailerOffer={trailerOffer} />

              <div className="flex flex-col gap-2 ">
                <p className="text-h5 font-bold">
                  Locatie - Omgeving {trailerOffer.address.city}
                </p>
                <div className="h-[30dvh] w-full">
                  <GoogleMapsWrapper>
                    <GoogleMaps
                      locations={trailerLocations}
                      price={[trailerOffer.price]}
                      zoomOnLocation={{
                        lat: trailerOffer.nearbyLatitude,
                        lng: trailerOffer.nearbyLongitude,
                      }}
                    />
                  </GoogleMapsWrapper>
                </div>
              </div>
            </div>
            <Reserveren trailerOffer={trailerOffer} />
          </div>
        </>
      )}

    </div>
  );
};

export default Page;
