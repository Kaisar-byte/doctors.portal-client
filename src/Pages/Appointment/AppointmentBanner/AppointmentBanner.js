import React from "react";
import { DayPicker } from "react-day-picker";
import chair from "../../../assets/images/chair.png";
const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {
  return (
    <header>
      <div className="hero mt-6">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={chair} className="max-w-sm rounded-lg shadow-2xl" alt="" />
          <div className="mt-6">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppointmentBanner;
