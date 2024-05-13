import { TrailerList } from "@/app/Types/TrailerList";

const Details = ({ trailerOffer }: { trailerOffer: TrailerList }) => {
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
    <div className="flex flex-col gap-5">
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
                  trailerOffer[dimensionLabels[dutchLabel] as keyof TrailerList]
                )}
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
            <h6 className="text-h6 font-semibold">Overige kenmerken</h6>
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
  );
};

export default Details;
