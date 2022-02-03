import React, { useState } from 'react';
/*
const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(10)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
*/
import { Card, CardContent, Button } from "@material-ui/core";
import { FaStar } from "react-icons/fa";
import { rateMovie } from '../../api';
import { Container, Radio, Rating } from "./styles";

const StarRating = () => {
  
  const [rate, setRate] = useState(5);
  // array to store rating values
  let ratings = [];

  const handleRating = (rate) => {
    setRate(rate);
    ratings.push(rate);
    console.log(`Your rate is: ${rate}`);
    console.log(ratings);
    // Some more logic after rate
    
    // calculate the average rating
    let sum = 0;
    for (let i = 0; i < ratings.length; i++) {
        sum += ratings[i];
    }
    let avg = sum / ratings.length;
    console.log(`Average rating is: ${avg}`);

    return (ratings = [...ratings, rate]);
};

  return (
    <Container>
      {[...Array(10)].map((item, index) => {
        const givenRating = index + 1;
        return (
          <label>
            <Radio
              type="radio"
              value={givenRating}
              onClick={() => {
                setRate(givenRating);
              }}
            />
            <Rating
              emptySymbol={<i className="fa fa-star-o fa-2x" />}
              fullSymbol={<i className="fa fa-star fa-2x" />}
              onClick={handleRating}
              ratingValue={rate}
              stars={10}
              readonly={false}
          >
              <FaStar
                color={
                  givenRating < rate || givenRating === rate
                    ? "#FF7F50"
                    : "rgb(192,192,192)"
                }
              />
            </Rating>
          </label>
        );
      })}
    </Container>
  );
  /*
  return (
    <Container>
      {[...Array(10)].map((item, index) => {
        const givenRating = index + 1;
        return (
          <label>
            <Radio
              type="radio"
              value={givenRating}
              onClick={() => {
                setRate(givenRating);
                
              }}
            />
            <Rating>
              <FaStar
                color={
                  givenRating < rate || givenRating === rate
                    ? "#FF7F50"
                    : "rgb(192,192,192)"
                }
              />
            </Rating>
          </label>
        );
      })}
    </Container>
  );
  */
};
  
export default StarRating;