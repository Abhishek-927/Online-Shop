import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
  const nevigate = useNavigate();
  const location = useLocation();

  const { auth, setAuth } = useAuth();
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
      if (responst.data.success) {
        toast.success("Login Successful");
        localStorage.setItem("token", JSON.stringify(responst.data));
        setAuth({
          ...auth,
          user: responst.data.user,
          token: responst.data.token,
        });
        nevigate(location.state || "/");
      } else {
        toast.error(responst.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg || "Invalid email or password");
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
