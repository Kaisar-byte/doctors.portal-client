import React from "react";
import treatment from "../../../../assets/images/treatment.png";
import PrimaryButton from "../../../../component/PrimaryButton/PrimaryButton";

const DentalCares = () => {
  return (
    <div className="flex px-16">
      <div className="w-1/2">
        <figure className="m-10">
          <img src={treatment} className="w-3/4" alt="Movie" />
        </figure>
      </div>
      <div className="w-1/2 my-16 -ml-8 mr-10 p-16">
        <h2 className="font-bold text-4xl uppercase">
          Exceptional Dental Care, on Your Terms
        </h2>
        <p className="text-xl my-6">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsumis that it has a more-or-less normal distribution of
          letters,as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page
        </p>
        <div className="card-actions justify-center">
          <PrimaryButton>Get Started</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default DentalCares;
