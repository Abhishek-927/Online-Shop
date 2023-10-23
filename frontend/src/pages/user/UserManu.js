import React from "react";
import { Link } from "react-router-dom";

const UserManu = () => {
  return (
    <div>
      <div className="text-center">
        <h4>User Deshboard</h4>
        <div className="list-group">
          <Link
            to="/deshboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </Link>
          <Link
            to="/deshboard/user/order"
            className="list-group-item list-group-item-action"
          >
            Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserManu;
