import React, { useContext } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";

const DisplayError = () => {
  const { logOut } = useContext(AuthContext);
  const error = useRouteError();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <p className="text-red-500">Something Went Wrong</p>
      <p className="text-red-400">{error.statusText || error.message}</p>
      <p className="text-3xl">
        Please <button onClick={handleLogOut}>Sign Out</button>
      </p>
    </div>
  );
};

export default DisplayError;
