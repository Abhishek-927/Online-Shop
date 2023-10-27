import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  //to get recent history of user tab

  const location = useLocation();
  const navigate = useNavigate();
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((count) => --count);
    }, 1000);

    //redirecting where he come
    counter === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });

    return () => clearInterval(interval);
  }, [counter, navigate, location, path]);

  return (
    <div className="my-4">
      <h2 className="text-center">Redirecting to Login Page {counter}</h2>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
