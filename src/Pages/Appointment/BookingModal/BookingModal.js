import { format } from "date-fns";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../Context/AuthProvider";

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
  const { name: treatmentName, slots, price } = treatment;
  const date = format(selectedDate, "PP");
  const { user } = useContext(AuthContext);

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const slot = form.slot.value;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const booking = {
      appointmentDate: date,
      treatment: treatmentName,
      slot,
      patient: name,
      email,
      phone,
      price,
    };
    console.log(booking);

    fetch(`http://localhost:5000/bookings`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          setTreatment(null);
          toast.success("booking confirmed");
          refetch();
        } else {
          toast.error(data.message);
        }
      });
  };
  return (
    <>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-center text-primary">
            {treatmentName}
          </h3>
          <form onSubmit={handleBooking}>
            <input
              type="text"
              disabled
              value={date}
              className="input input-bordered w-full mb-2 text-center"
            />
            <select name="slot" className="select select-bordered w-full mb-2">
              {slots.map((slot, i) => (
                <option value={slot} key={i}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              disabled
              placeholder="Your Name"
              className="input input-bordered w-full mb-2"
            />
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              disabled
              placeholder="Your Email"
              className="input input-bordered w-full mb-2"
            />
            <input
              type="number"
              name="phone"
              placeholder="Your phone number"
              className="input input-bordered w-full mb-2"
            />
            <input
              type="submit"
              className="input bg-accent text-white input-bordered w-full mb-2"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
