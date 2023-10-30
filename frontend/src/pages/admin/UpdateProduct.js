import React, { useEffect, useState } from "react";
import AdminManu from "../../components/layout/AdminManu";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";

const { Option } = Select;
const base = process.env.REACT_APP_BASE_URL;

const UpdateProduct = () => {
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    photo: "",
    name: "",
    description: "",
    category: "",
    quantity: "",
    price: "",
    shipping: "",
  });
  const [id, setid] = useState("");
  const navigate = useNavigate();

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${base}/api/v1/product/single-product/${params.slug}`
      );
      setid(data.product._id);
      setFormData({
        ...formData,
        name: data.product.name,
        description: data.product.description,
        price: data.product.price,
        quantity: data.product.quantity,
        shipping: data.product.shipping,
        category: data.product.category._id,
      });
    } catch (error) {
      console.log(error);
      toast.error("getting all categories failed");
    }
  };

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

  //
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("price", formData.price);
      productData.append("quantity", formData.quantity);
      formData.photo && productData.append("photo", formData.photo);
      productData.append("category", formData.category);
      productData.append("shipping", formData.shipping);

      const { data } = await axios.put(
        `${base}/api/v1/product/update-product/${id}`,
        productData
      );

      if (data.success) {
        navigate("/dashboard/admin/products");
        toast.success(data.msg);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("error which create product");
    }
  };

  const handleDeleteProduct = async (e) => {
    let answer = window.prompt("Are you Sure to delete this product");
    if (!answer) return;
    try {
      const { data } = await axios.delete(
        `${base}/api/v1/product/delete-product/${id}`
      );

      if (data.success) {
        toast.success(data.msg);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("error which create product");
    }
  };

  useEffect(() => {
    getSingleProduct();
    getAllCategory();
  }, []);

  return (
    <div className="container-fluid my-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminManu />
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3 text-center">
            <h4> Update Product</h4>
            <div className="m-1 w-75" style={{ marginInline: "auto" }}>
              <Select
                bordered={false}
                placeholder="select category"
                size="large"
                showSearch
                className="form-select my-3"
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    category: value,
                  });
                }}
                value={formData.category}
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
                  {formData.photo ? formData.photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="upload-image"
                    accept="image/*"
                    hidden={true}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        photo: e.target.files[0],
                      });
                    }}
                  />
                </label>
              </div>
              <div className="mb-3">
                {formData.photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(formData.photo)}
                      alt="product photo"
                      className="img img-responsive card-img"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${base}/api/v1/product/product-photo/${id}`}
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
                  className="form-select my-3"
                  onChange={(e) => setFormData({ ...formData, shipping: e })}
                  value={formData.shipping ? "Yes" : "No"}
                >
                  <Option value="1">Yes </Option>
                  <Option value="0">No </Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-dark " onClick={handleUpdateProduct}>
                  Update Product
                </button>
                <button
                  className="btn btn-danger ms-2"
                  onClick={handleDeleteProduct}
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
