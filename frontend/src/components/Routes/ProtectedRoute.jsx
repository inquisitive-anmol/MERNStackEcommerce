import React from "react";
import { useSelector } from "react-redux";
import { Route, useLocation, useNavigate } from "react-router-dom";
import Loader from "../ui/Loader";

const ProtectedRoute = ({ children, isAdmin  }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();


  if (!loading) {
    if (!isAuthenticated) {
      return navigate("/login", {state: {from: location.pathname}});
    }
    if(isAdmin === true && user.role !== "admin") {
      return navigate("/login", {state: {from: location.pathname}});
    }
    return children;
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Loader />
    </div>
  );
};

export default ProtectedRoute;
