"use client";

import { TrailerList } from "@/app/Types/TrailerList";
import Image from "next/image";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { AanbodId: string } }) => {
  const [trailerOffer, setTrailerOffer] = useState<TrailerList>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pilot.buurbak.nl/api/v1/traileroffers/${params.AanbodId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
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
    <div className="w-dvw h-fit flex flex-col items-center gap-4 pt-4">
      {trailerOffer && (
        <div className="w-5/6 h-96 overflow-hidden">
          <div className="grid grid-cols-3 grid-rows-2 gap-2 h-full w-full">
            <div className="row-span-2 col-span-1 relative">
              {trailerOffer?.coverImage && (
                <Image
                  src={trailerOffer.coverImage}
                  alt="Trailer image 1"
                  fill
                  objectFit="cover"
                  priority={true}
                  className="rounded-md"
                />
              )}
            </div>
            {trailerOffer.images?.slice(0, 4).map((item, index) => (
              <div key={index} className="col-span-1 row-span-1 relative">
                <Image
                  src={item}
                  alt={`Trailer image ${index + 2}`}
                  fill
                  objectFit="cover"
                  priority={true}
                  className="rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

// <div className="col-start-2 row-start-2 ">3</div>
// <div className="col-start-2 row-start-1 ">4</div>
// <div className="col-start-3 row-start-1 ">5</div>
// <div className="col-start-3 row-start-2 ">6</div>
