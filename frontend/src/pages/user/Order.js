import React from "react";
import UserManu from "./UserManu";

const Order = () => {
  return (
    <div className="container-fluid my-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <UserManu />
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <h4> All Orders</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
