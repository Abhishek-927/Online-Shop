import React from "react";
import AdminManu from "../../components/layout/AdminManu";

const Users = () => {
  return (
    <div className="container-fluid my-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminManu />
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <h4> All Users</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
