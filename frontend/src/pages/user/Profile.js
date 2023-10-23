import React from "react";
import UserManu from "./UserManu";

const Profile = () => {
  return (
    <div className="container-fluid my-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <UserManu />
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <h4>Profile</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
