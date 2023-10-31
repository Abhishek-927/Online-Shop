import React from "react";
import UserManu from "./UserManu";
import { useAuth } from "../../context/auth";

const Deshboard = () => {
  const { auth } = useAuth();
  return (
    <div className="container-fluid my-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <UserManu />
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <h4> Name : {auth?.user?.name}</h4>
            <h4> Email : {auth?.user?.email}</h4>
            <h4> Phone : {auth?.user?.phone}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deshboard;
