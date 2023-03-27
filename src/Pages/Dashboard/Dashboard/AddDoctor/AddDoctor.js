import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Shared/Loading/Loading";

const AddDoctor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: specialities, isLoading } = useQuery({
    queryKey: ["appointmentSpecialty"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/appointmentSpecialty`);
      const data = await res.json();
      return data;
    },
  });
  const imgHostKey = process.env.REACT_APP_imgbb_Key;
  console.log(imgHostKey);

  const navigate = useNavigate();
  const handleAddDoctor = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        console.log(imgData);

        if (imgData.success) {
          // console.log(imgData.data.url);
          const doctor = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            image: imgData.data.url,
          };
          fetch(`http://localhost:5000/doctors`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
            body: JSON.stringify(doctor),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              toast.success(`${data.name} is added successfully`);
            });
          navigate("/dashboard/manageDoctors");
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="flex border-2 mx-10 py-8 bg-pink-200 justify-center items-center ">
      <div className="w-96 p-10">
        <h2 className="text-3xl text-orange-300 font-bold">Add A Doctor</h2>
        <form onSubmit={handleSubmit(handleAddDoctor)}>
          <div className="form-control w-full max-w-xs">
            <label className="label font-bold text-xl">
              <span className="label-text">Name</span>{" "}
            </label>
            <input
              type="text"
              {...register("name")}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label font-bold text-xl">
              <span className="label-text">Email</span>{" "}
            </label>
            <input
              type="email"
              {...register("email", {
                required: "email is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.email && (
              <span className="text-red-500">email is required</span>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label font-bold text-xl">
              <span className="label-text">Specialty</span>{" "}
            </label>
            <select
              {...register("specialty")}
              className="select select-bordered w-full max-w-xs"
            >
              {specialities?.map((specialty) => (
                <option key={specialty._id} value={specialty.name}>
                  {specialty.name}
                </option>
              ))}
            </select>
            <br />
            <div className="form-control w-full max-w-xs">
              <label className="label font-bold text-xl">
                <span className="label-text">photo</span>{" "}
              </label>
              <input
                type="file"
                {...register("image")}
                className="input input-bordered w-full"
              />
              {errors.image && (
                <span className="text-red-500">Image is required</span>
              )}
            </div>{" "}
            <br />
          </div>
          <input
            type="submit"
            value="Add A Doctor"
            className="btn btn-accent text-white w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
