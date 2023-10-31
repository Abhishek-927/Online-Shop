import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";

import AdminManu from "../../components/layout/AdminManu";
import { useAuth } from "../../context/auth";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Deliverd",
    "Cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");

  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/all-orders`
      );
      console.log(data, data.orders);
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (id, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/order-status/${id}`,
        { status: value }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container-fluid my-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminManu />
        </div>
        <div className="col-md-9">
          <h2>All Orders</h2>

          <div className="border shadow">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Status</th>
                  <th scope="col">Buyer</th>
                  <th scope="col">Orders</th>
                  <th scope="col">Status</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              {orders?.map((order, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(order._id, value)}
                          defaultValue={order?.status}
                        >
                          {status.map((s, i) => {
                            return (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            );
                          })}
                        </Select>
                      </td>
                      <td>{order?.buyer?.name}</td>
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

export default AdminOrders;
