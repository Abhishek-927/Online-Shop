import React, { useEffect, useState } from "react";
import AdminManu from "../../components/layout/AdminManu";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const base = process.env.REACT_APP_BASE_URL;

const Products = () => {
  const [product, setProduct] = useState([]);

  //get all category
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${base}/api/v1/product/get-product`);
      setProduct(data.products);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("getting all categories failed");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <div className="row my-4">
        <div className="col-md-3">
          <AdminManu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Product List</h1>
          <div className="d-flex" style={{ flexWrap: "wrap", gap: "15px" }}>
            {product.map((pro) => {
              return (
                <Link
                  style={{ textDecoration: "none" }}
                  key={pro._id}
                  to={`/dashboard/admin/product/${pro.slug}`}
                >
                  <div className="card">
                    <img
                      src={`${base}/api/v1/product/product-photo/${pro._id}`}
                      className="card-img-top card-img"
                      alt="product photo"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{pro.name}</h5>
                      <p className="card-text">
                        {pro.description.slice(0, 35)}...
                      </p>
                      <p className="card-text">Price - $ {pro.price}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
