import React, { useState } from "react";

interface StarRatingProps {
  // Hier kunnen eventuele props worden toegevoegd
}

const StarRating: React.FC<StarRatingProps> = () => {
  const [rating, setRating] = useState<number | null>(null);

  const handleRatingChange = (value: number) => {
    setRating(value === rating ? null : value);
  };

  return (
    <div className="rating">
      {[...Array(5)].map((_, index) => {
        const value = index + 1;
        return (
          <label key={index} style={{ fontSize: "34px", cursor: "pointer" }}>
            <input
              type="radio"
              name="rating"
              value={value}
              checked={value === rating}
              onChange={() => handleRatingChange(value)}
              style={{ display: "none" }} // Verberg het standaard radio element
            />
            <span
              style={{ color: value <= (rating || 0) ? "orange" : "#777777" }}
            >
              {value <= (rating || 0) ? "★" : "☆"}
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
