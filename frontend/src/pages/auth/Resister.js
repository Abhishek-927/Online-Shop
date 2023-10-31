import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Resister = () => {
  const nevigate = useNavigate();
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
    if (formData.password.length < 8) {
      toast.error("Password At least 8 character");
      return;
    }
    e.preventDefault();
    try {
      const responst = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/createuser`,
        formData
      );
      if (responst.data.success) {
        toast.success("success");
        nevigate("/login");
      } else {
        toast.error(responst.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.msg || "Somthing went wrong Try again"
      );
    }
  };

  return (
    <div className="signup-form">
      <h2>Resister Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={formData.name}
            onChange={handleChangeInput}
            name="name"
            placeholder="Enter Name"
            minLength={3}
            required
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
            required
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
            minLength={10}
            maxLength={10}
            required
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
            minLength={3}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            value={formData.password}
            onChange={handleChangeInput}
            name="password"
            placeholder="Enter Password"
            required
            minLength={8}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Resister;
