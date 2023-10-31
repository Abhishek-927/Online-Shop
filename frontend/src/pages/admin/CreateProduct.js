import React, { useEffect, useState } from "react";
import AdminManu from "../../components/layout/AdminManu";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import SpinnerOnly from "../../components/SpinnerOnly";

const { Option } = Select;
const base = process.env.REACT_APP_BASE_URL;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    quantity: "",
    price: "",
    shipping: false,
  });
  const [photo, setPhoto] = useState("");
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${base}/api/v1/category/get-categories`
      );
      setCategories(data.allCategories);
    } catch (error) {
      console.log(error);
      toast.error("getting all categories failed");
    }
  };

  //handle create product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const productData = new FormData();
      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("price", formData.price);
      productData.append("quantity", formData.quantity);
      productData.append("photo", photo);
      productData.append("shipping", formData.shipping);
      console.log(formData);
      productData.append("category", formData.category);

      const { data } = await axios.post(
        `${base}/api/v1/product/create-product`,
        productData
      );

      if (data.success) {
        console.log(data, formData);
        toast.success(data.msg);
        setLoading(false);
        navigate("/dashboard/admin/products");
      } else {
        setLoading(false);
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error?.response?.data?.msg || "error which create product");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div className="container-fluid my-3 p-3">
      {loading ? (
        <SpinnerOnly />
      ) : (
        <div className="row">
          <div className="col-md-3">
            <AdminManu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3 text-center">
              <h4> Create Product </h4>
              <div className="m-1 w-75" style={{ marginInline: "auto" }}>
                <Select
                  bordered={false}
                  placeholder="select category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setFormData({
                      ...formData,
                      category: value,
                    });
                  }}
                >
                  {categories.map((val) => {
                    return (
                      <Option key={val._id} value={val._id}>
                        {val.name}
                      </Option>
                    );
                  })}
                </Select>
                <div className="mb-3">
                  <label className="btn btn-outline-primary col-md-12">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      hidden={true}
                      onChange={(e) => {
                        setPhoto(e.target.files[0]);
                      }}
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {photo && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product photo"
                        className="img img-responsive card-img"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={formData.name}
                    placeholder="write name of product"
                    className="form-control"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    cols="30"
                    rows="3"
                    value={formData.description}
                    placeholder="write description of product"
                    className="form-control"
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  ></textarea>
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={formData.price}
                    placeholder="write price of product"
                    className="form-control"
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={formData.quantity}
                    placeholder="write quantity of product"
                    className="form-control"
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="write name of product"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(e) => setFormData({ ...formData, shipping: e })}
                  >
                    <Option value="1">Yes </Option>
                    <Option value="0">No </Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button
                    className="btn btn-dark"
                    onClick={handleCreateProduct}
                  >
                    Create Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateProduct;
