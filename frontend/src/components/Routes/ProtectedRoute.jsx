import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, useLocation, useNavigate } from "react-router-dom";
import Loader from "../ui/Loader";

const ProtectedRoute = ({ children, isAdmin  }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();


 
  useEffect(() => {
    if (!loading) {
      if (isAuthenticated === false) {
        return navigate("/login", {state: {from: location.pathname}});
      }
      if(isAdmin === true && user.role !== "admin") {
        return navigate("/login", {state: {from: location.pathname}});
      }
      
    }
  }, [])

  return children;
};

export default ProtectedRoute;
