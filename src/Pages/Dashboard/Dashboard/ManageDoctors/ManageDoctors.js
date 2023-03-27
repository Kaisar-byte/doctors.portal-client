import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import ConfirmationModal from "../../../Shared/ConfimationModal/ConfirmationModal";
import Loading from "../../../Shared/Loading/Loading";

const ManageDoctors = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null);
  const {
    data: doctors = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      try {
        const res = await fetch(`http://localhost:5000/doctors`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        const data = await res.json();
        return data;
      } catch (e) {}
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  const closeModal = () => {
    setDeletingDoctor(null);
  };

  const handleDeletingDoctor = (doctor) => {
    fetch(`http://localhost:5000/doctors/${doctor._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(`${doctor.name} deleted successfully`);
          refetch();
        }
      });
  };
  return (
    <div>
      <h2 className="text-3xl bg-slate-500 text-white">
        Manage Doctors {doctors.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>SPECIALITY</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, i) => (
              <tr key={doctor._id} value={doctor}>
                <th>{1 + i}</th>
                <td>
                  <div className="avatar">
                    <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={doctor.image} alt="" />
                    </div>
                  </div>
                </td>
                <td>{doctor.name}</td>
                <td>{doctor.specialty}</td>
                <td>
                  <label
                    onClick={() => setDeletingDoctor(doctor)}
                    htmlFor="confirmation-modal"
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
          {deletingDoctor && (
            <ConfirmationModal
              closeModal={closeModal}
              title={`Are you sure you want to delete`}
              message={`Are you sure you want to delete ${deletingDoctor.name}`}
              successAction={handleDeletingDoctor}
              modalData={deletingDoctor}
              successActionBtn="Delete"
            ></ConfirmationModal>
          )}
        </table>
      </div>
    </div>
  );
};

export default ManageDoctors;
