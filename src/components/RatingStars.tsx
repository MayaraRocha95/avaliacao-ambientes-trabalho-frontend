import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import './ratingstars.css';

interface RatingStarsProps {
  onRatingChange: (rating: number) => void;
  initialValue?: number;
    readOnly?: boolean;
}

const RatingStars: React.FC<RatingStarsProps> = ({ onRatingChange, initialValue = 0, readOnly }) => {
  const [rating, setRating] = useState(initialValue);

  const handleRating = (rate: number) => {
    setRating(rate);
    onRatingChange(rate);
  };

  return (
    <Rating readonly={readOnly} onClick={handleRating} initialValue={rating} className="small-stars" />
  );
};

export default RatingStars;
