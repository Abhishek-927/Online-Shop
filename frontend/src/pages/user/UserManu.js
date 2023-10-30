import React from "react";
import { Link, useLocation } from "react-router-dom";

const UserManu = () => {
  const location = useLocation();
  return (
    <div>
      <div className="text-center">
        <h4>User Deshboard</h4>
        <div className="list-group">
          <Link
            to="/dashboard/user/profile"
            className={`list-group-item list-group-item-action ${
              location.pathname === "/dashboard/user/profile" ? "active" : ""
            }`}
          >
            Update Profile
          </Link>
          <Link
            to="/dashboard/user/order"
            className={`list-group-item list-group-item-action ${
              location.pathname === "/dashboard/user/order" ? "active" : ""
            }`}
          >
            Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserManu;
