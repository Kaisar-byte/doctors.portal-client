import React from "react";

const Review = ({ review }) => {
  const { name, description, image, country, review: userReview } = review;
  return (
    <div className="shadow-xl mt-8 rounded-lg p-8">
      <div>
        <h2 className="text-lg text-justify">{description}</h2>
      </div>
      <div className="flex mt-8 space-between rounded-lg  ">
        <figure>
          <img src={image} className="mr-8" alt="Movie" />
        </figure>
        <div className="text-justify">
          <h3 className="card-title">{name}</h3>
          <p>{country}</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
