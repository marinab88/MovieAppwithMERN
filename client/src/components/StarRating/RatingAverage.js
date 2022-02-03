import React from 'react';

export const getSingleDecimalValue = (givenRating) => {
  return (Math.round(givenRating * 10) / 10).toFixed(1);
};