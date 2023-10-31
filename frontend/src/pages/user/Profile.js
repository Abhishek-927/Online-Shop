//Not working Beacuse i not set user in auth context

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import UserManu from "./UserManu";
import { useAuth } from "../../context/auth";

const Profile = () => {
  const { auth, setAuth } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/profile-update`,
        formData
      );
      if (data.success) {
        let ls = localStorage.getItem("token");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("token", JSON.stringify(ls));
        setAuth({ ...auth, user: data?.updatedUser });
        toast.success("success");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
    }
  };

  useEffect(() => {
    if (auth.user) {
      const { email, name, phone, address } = auth?.user;
      setFormData({ ...formData, name, email, phone, address });
    }
  }, [auth?.user]);

  return (
    <div className="container-fluid my-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <UserManu />
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChangeInput}
                  name="name"
                  placeholder="Enter Name"
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChangeInput}
                  name="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter Email"
                  disabled
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChangeInput}
                  name="phone"
                  placeholder="Enter Phone Number"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChangeInput}
                  name="address"
                  placeholder="Enter Address"
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
