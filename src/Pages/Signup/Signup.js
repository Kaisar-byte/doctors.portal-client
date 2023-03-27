import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import useToken from "../../hooks/useToken";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUser } = useContext(AuthContext);
  const [signupError, setSignupError] = useState("");
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const navigate = useNavigate();
  const [token] = useToken(createdUserEmail);
  if (token) {
    navigate("/");
  }
  const handleSignUp = (data) => {
    console.log(data);
    setSignupError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast("User created successfully");
        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then(() => {
            savedUser(data.name, data.email);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        setSignupError(err.message);
      });
  };

  const savedUser = (name, email) => {
    const user = { name, email };
    fetch(`http://localhost:5000/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCreatedUserEmail(email);
      });
  };

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-center text-xl font-bold">Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
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
              <span className="label-text">Password</span>{" "}
            </label>
            <input
              type="password"
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="input input-bordered w-full"
            />
            {errors.password && (
              <span className="text-red-400">{errors.password.message}</span>
            )}
            <br />
          </div>
          <input
            type="submit"
            value="Sign Up"
            className="btn btn-accent text-white w-full"
          />
          {signupError && <p className="text-red-400">{signupError}</p>}
        </form>
        <h2>
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Please Login
          </Link>
        </h2>
        <div className="divider">OR</div>
        <button className="btn btn-accent btn-outline uppercase w-full">
          Continue with google
        </button>
      </div>
    </div>
  );
};

export default Signup;
