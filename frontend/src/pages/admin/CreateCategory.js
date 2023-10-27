import React, { useEffect, useState } from "react";
import AdminManu from "../../components/layout/AdminManu";
import axios from "axios";
import { toast } from "react-toastify";
import CreateCategoryForm from "../../components/forms/CreateCategoryForm";
import { Modal } from "antd";
const base = process.env.REACT_APP_BASE_URL;

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState(null);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${base}/api/v1/category/get-categories`
      );
      setCategory(data.allCategories);
    } catch (error) {
      console.log(error);
      toast.error("getting all categories failed");
    }
  };

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${base}/api/v1/category/create-category`,
        { name }
      );
      if (data.success) {
        toast.success(`${name} is created`);
        setName("");
        getAllCategory();
      } else {
        toast.error("some error in data");
      }
    } catch (error) {
      console.log(error);
      toast.error("while form submition");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //handle delete button
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${base}/api/v1/category/delete-category/${id}`
      );
      toast.success(data.msg);
      getAllCategory();
    } catch (error) {
      console.log(error);
      toast.error("error in update");
    }
  };

  //handle edit button
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${base}/api/v1/category/update-category/${selected._id}`,
        { name: updateName }
      );
      toast.success(data.msg);
      setSelected(null);
      setUpdateName("");
      setVisible(false);
      getAllCategory();
    } catch (error) {
      console.log(error);
      toast.error("error in update");
    }
  };

  return (
    <div className="container-fluid my-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminManu />
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <h4> Category</h4>
            <div>
              <CreateCategoryForm
                value={name}
                setValue={setName}
                handleSubmit={handleSubmit}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((e) => {
                    return (
                      <tr key={e.name}>
                        <td>{e.name}</td>
                        <td>
                          <button
                            className="btn-primary btn"
                            onClick={() => {
                              setVisible(true);
                              setUpdateName(e.name);
                              setSelected(e);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn-danger btn ms-2"
                            onClick={() => handleDelete(e._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
          <CreateCategoryForm
            value={updateName}
            setValue={setUpdateName}
            handleSubmit={handleUpdate}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CreateCategory;
