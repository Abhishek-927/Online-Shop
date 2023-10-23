import React from "react";
import { Link } from "react-router-dom";

const AdminManu = () => {
  return (
    <div className="text-center">
      <h4>Admin Panel</h4>
      <div className="list-group">
        <Link
          to="/deshboard/admin/create-category"
          className="list-group-item list-group-item-action"
        >
          Create Category
        </Link>
        <Link
          to="/deshboard/admin/create-product"
          className="list-group-item list-group-item-action"
        >
          Create Product
        </Link>
        <Link
          to="/deshboard/admin/users"
          className="list-group-item list-group-item-action"
        >
          Users
        </Link>
      </div>
    </div>
  );
};

export default AdminManu;
