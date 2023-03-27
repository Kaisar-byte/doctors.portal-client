import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthProvider";

const MyAppointment = () => {
  const { user } = useContext(AuthContext);
  const url = `http://localhost:5000/bookings?email=${user?.email}`;

  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  return (
    <div>
      <h2>My appointment</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>treatment</th>
            <th>Date</th>
            <th>Time</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, i) => (
            <tr>
              <th>{i + 1}</th>
              <td>{booking.patient}</td>
              <td>{booking.treatment}</td>
              <td>{booking.appointmentDate}</td>
              <td>{booking.slot}</td>
              <td>
                {booking.price && !booking.paid && (
                  <Link to={`/dashboard/payment/${booking._id}`}>
                    <button className="btn btn-primary btn-sm">Pay</button>
                  </Link>
                )}
                {booking.price && booking.paid && (
                  <span className="text-primary">Paid</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAppointment;
