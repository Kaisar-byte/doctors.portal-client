import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import useToken from "../../hooks/useToken";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { signIn } = useContext(AuthContext);
  const [loginError, SetLoginError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  if (token) {
    navigate(from, { replace: true });
  }
  const handleLogin = (data) => {
    console.log(data);
    SetLoginError("");
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setLoginUserEmail(data.email);
      })
      .catch((err) => {
        console.log(err.message);
        SetLoginError(err.message);
      });
  };

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-center text-xl font-bold">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label font-bold text-xl">
              <span className="label-text">Email</span>{" "}
            </label>
            <input
              type="email"
              {...register("email", { required: "email is required" })}
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p role="alert" className="text-red-400 font-bold">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label font-bold text-xl">
              <span className="label-text">Password</span>{" "}
            </label>
            <input
              type="password"
              {...register("password", { required: "password is required" })}
              className="input input-bordered w-full"
            />
            <label className="label font-bold text-lg">
              <span className="label-text">Forgot Password</span>{" "}
            </label>
            {errors.password && (
              <p role="alert" className="text-red-400 font-bold">
                {errors.password?.message}
              </p>
            )}
          </div>
          <input type="submit" className="btn btn-accent text-white w-full" />
          <div>
            {loginError && <p className="text-red-600">{loginError}</p>}
          </div>
        </form>
        <h2>
          New to Doctors Portal?{" "}
          <Link to="/signup" className="text-primary">
            Create an account
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

export default Login;
