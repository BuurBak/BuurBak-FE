import Link from "next/link";

type CardType = {
  title: string;
  type: "overview" | "category";
  img: string;
  location?: string;
  distance?: number;
  accessoires?: string;
  price?: string;
  discription?: string;
  className?: string;
  href: string;
};

const Card = ({
  title,
  type,
  img,
  location,
  distance,
  accessoires,
  price,
  discription,
  className,
  href,
  ...props
}: CardType) => {
  return (
    <Link
      href={href}
      className={
        (className != undefined && className) +
        (type === "overview"
          ? " w-48 xl:w-64"
          : " max-w-96 w-full max-h-[360px] h-full") +
        " flex"
      }
    >
      <div className="w-full rounded-md h-fit border border-offWhite-100 bg-white">
        <img
          alt="trailer"
          src={img}
          className={
            (type === "overview"
              ? "object-center h-32 xl:h-44"
              : "object-top h-64 w-full") +
            " w-full overflow-hidden object-cover"
          }
        />
        <div
          className={
            (type === "overview" ? "flex" : "hidden") + " flex-col gap-1 p-2"
          }
        >
          <h5 className="hidden xl:flex text-primary-100">{title}</h5>
          <p className="flex xl:hidden text-primary-100 font-bold">{title}</p>
          {/* <p className="text-gray-100 xl:text-xl">
            {location}
            {distance !== undefined &&
              distance !== 0 &&
              " - " + distance + "KM"}
          </p> */}
          {/* <p className="text-gray-100 xl:text-xl">accessoires: {accessoires}</p> */}
          <p className="xl:text-xl">€{price} per dag</p>
        </div>
        <div
          className={
            (type === "overview" ? "hidden" : "flex") + " flex-col gap-1 p-2"
          }
        >
          <h5 className="flex text-primary-100">{title}</h5>
          <p className="text-gray-100 xl:text-xl text-md min-h-14">
            {discription}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
