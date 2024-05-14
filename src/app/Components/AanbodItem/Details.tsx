import { TrailerList } from "@/app/Types/TrailerList";
import { useState } from "react";
import Button from "../Button";

const Details = ({ trailerOffer }: { trailerOffer: TrailerList }) => {
  const [collapsed, setCollapsed] = useState(false);

  const convertMeterToCentimeter = (meter: number) => {
    const result = (meter / 100).toFixed(1);

    return result;
  };

  const dimensionLabels: Record<string, keyof TrailerList> = {
    Hoogte: "height",
    Lengte: "length",
    Breedte: "width",
  };

  return (
    <div className="relative">
      <div
        className={`flex flex-col gap-5 overflow-hidden transition-[height] ease-in-out duration-300 ${collapsed && "h-[20vh]"}`}
      >
        <p className="text-h5 font-bold">Details</p>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h6 className="text-h6 font-semibold">Afmetingen</h6>
            {["Hoogte", "Lengte", "Breedte"].map((dutchLabel) => (
              <div
                key={dutchLabel}
                className="bg-offWhite-100 p-2 rounded w-full flex justify-between"
              >
                <p>{dutchLabel}:</p>
                <p>
                  {convertMeterToCentimeter(
                    trailerOffer[
                      dimensionLabels[dutchLabel] as keyof TrailerList
                    ]
                  ) + " "}
                  meter
                </p>
              </div>
            ))}
          </div>
          {trailerOffer.accesoires && (
            <div className="flex flex-col gap-2">
              <h6 className="text-h6 font-semibold">Accesoires</h6>
              {trailerOffer.accesoires.map((item, index) => {
                return (
                  <p
                    key={index}
                    className={`${index % 2 === 0 ? "bg-offWhite-100" : "bg-white"} p-2 rounded w-full flex justify-between`}
                  >
                    {item}
                  </p>
                );
              })}
            </div>
          )}
          {trailerOffer.accesoires && (
            <div className="flex flex-col gap-2">
              <h6 className="text-h6 font-semibold ">Overige kenmerken</h6>
              {trailerOffer.accesoires.map((item, index) => {
                return (
                  <p
                    key={index}
                    className={`${index % 2 === 0 ? "bg-offWhite-100" : "bg-white"} p-2 rounded w-full flex justify-between`}
                  >
                    {item}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Button
        label={collapsed ? "Toon meer" : "Toon minder"}
        buttonAction={() => setCollapsed(!collapsed)}
        icon
        type="secondary"
        styling="absolute bottom-[-1rem] left-0 right-0 mx-auto w-1/6 min-w-fit bg-white text-black-100 rounded-md border"
      />
    </div>
  );
};

export default Details;
