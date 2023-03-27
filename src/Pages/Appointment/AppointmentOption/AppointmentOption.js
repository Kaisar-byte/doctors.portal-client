import React from "react";

const AppointmentOption = ({ AppointmentOption, setTreatment }) => {
  const { name, slots, price } = AppointmentOption;
  return (
    <div className="card shadow-xl text-center my-10">
      <div className="card-body">
        <h2 className=" text-2xl font-bold text-primary">{name}</h2>
        <p>{slots.length > 0 ? slots[0] : "Try another day"}</p>
        <p>
          {slots.length} {slots.length > 1 ? "spaces" : "space"} are Available
        </p>
        <p>price: {price}</p>
        <div className="card-actions justify-center">
          {/* The button to open modal */}
          <label
            disabled={slots.length === 0}
            onClick={() => setTreatment(AppointmentOption)}
            htmlFor="booking-modal"
            className="btn btn-primary text-white"
          >
            Book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};

export default AppointmentOption;
