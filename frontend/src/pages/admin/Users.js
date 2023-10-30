import React, { useEffect, useState } from "react";
import AdminManu from "../../components/layout/AdminManu";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/all-users`
      );
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="container-fluid my-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminManu />
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <h2 className="text-center">All Users</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">S. No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone No.</th>
                </tr>
              </thead>
              {users.map((u, i) => {
                return (
                  <tbody key={i}>
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
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

export default Users;
