import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nevigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    // not working when wrong input is given

    e.preventDefault();
    try {
      const responst = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`,
        formData
      );
      console.log("by me", responst);
      if (responst.data.success) {
        toast.success("Login Successful");
        nevigate("/");
      } else {
        toast.error(responst.data.msg);
      }
      console.log("at end");
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong !!!! DDFSD");
    }
  };

  return (
    <div className="signup-form">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
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
            type="password"
            className="form-control"
            value={formData.password}
            onChange={handleChangeInput}
            name="password"
            placeholder="Enter Password"
            required
            minLength={6}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
