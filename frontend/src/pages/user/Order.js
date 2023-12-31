import React, { useEffect, useState } from "react";
import UserManu from "./UserManu";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/auth";

const Order = () => {
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/orders/${auth.user?._id}`
      );
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <div className="container-fluid my-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <UserManu />
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <h4> All Orders</h4>
            <table className="border table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Status</th>
                  <th scope="col">Product</th>
                  <th scope="col">Date</th>
                  <th scope="col">Orders</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              {orders?.map((order, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{order?.status}</td>
                      <td>{order?.products[0]?.name}</td>
                      <td>{moment(order?.date).fromNow()}</td>
                      <td>{order?.payment.success ? "Success" : "Failed"}</td>
                      <td>{order?.products?.length}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
