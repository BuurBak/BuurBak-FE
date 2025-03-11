import React, { useState } from "react";
import { StarSvg } from "../icons/TrailerIcons";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="flex flex-row p-4">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label
            className="m-3"
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
          >
            <input
              className="hidden"
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <StarSvg
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#ffffff"}
              className="w-8 h-8"
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
