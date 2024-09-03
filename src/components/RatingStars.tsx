// src/components/RatingStars.tsx
import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';

interface RatingStarsProps {
  onRatingChange: (rating: number) => void;
  initialValue?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ onRatingChange, initialValue = 0 }) => {
  const [rating, setRating] = useState(initialValue);

  const handleRating = (rate: number) => {
    setRating(rate);
    onRatingChange(rate);
  };

  return (
    <Rating onClick={handleRating} initialValue={rating} />
  );
};

export default RatingStars;
