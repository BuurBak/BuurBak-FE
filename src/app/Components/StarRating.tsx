import React, { useState } from "react";
import { StarSvg } from "../icons/TrailerIcons";
import { type } from "node:os";

type StarRatingProps = {
  rating: number;
  onRatingChange: (rating: number) => void;
};

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex flex-row p-4">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;

        return (
          <label
            key={index}
            className="m-3 cursor-pointer"
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
          >
            <input
              className="hidden"
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => onRatingChange(ratingValue)}
            />
            <StarSvg
              color={ratingValue <= (hover || rating) ? "#ee7b46" : "#ffffff"}
              className="w-8 h-8"
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
