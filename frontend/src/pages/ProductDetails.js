import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useCard } from "../context/cardContext";
import { useAuth } from "../context/auth";

const base = process.env.REACT_APP_BASE_URL;

const ProductDetails = () => {
  const { addToCard, setSelectedProduct } = useCard();
  const params = useParams();
  const navigate = useNavigate();
  let temp = null;
  const [product, setProduct] = useState({ _id: "653e94f954fccac9de954835" });
  const [related, setRelated] = useState([]);

  const { auth, setTemp } = useAuth();

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${base}/api/v1/product/single-product/${params.slug}`
      );
      setProduct(data.product);
      setSelectedProduct(data.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${base}/api/v1/product/similar-product/${pid}/${cid}`
      );
      setRelated(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getSingleProduct();
  }, [params?.slug]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6  d-flex justify-content-center align-items-center">
          <img
            src={`${base}/api/v1/product/product-photo/${product?._id}`}
            className="card-img-top card-img"
            alt="product photo"
          />
        </div>
        {product?.name && (
          <div className="col-md-6">
            <h2 className="text-center mb-3">Product Details</h2>
            <p className="big-p">
              <span className="title">Name :</span> {product?.name}
            </p>
            <p className="big-p">
              <span className="title">Price : </span> $ {product?.price}
            </p>
            <p className="big-p">
              <span className="title">Description :</span>
              {product?.description}
            </p>
            <p className="big-p">
              <span className="title">Category :</span> {product?.category.name}
            </p>
            <div>
              <button
                className="btn btn-primary my-3 mx-100"
                onClick={() => {
                  auth?.user ? addToCard(product) : navigate("/login");
                }}
              >
                ADD TO CART
              </button>
            </div>
            <Link
              onClick={() => setTemp(product)}
              to={`/payment/${product._id}`}
              className="btn btn-warning mx-100"
            >
              BUY
            </Link>
          </div>
        )}
      </div>
      <hr />
      <div>
        <h3 className="mb-4">Similar Product</h3>
        <div className="d-flex flex-wrap container" style={{ gap: "25px" }}>
          {related.length === 0 ? (
            <h5 className="text-center">No related product found</h5>
          ) : (
            related.map((pro) => {
              return (
                <div key={pro._id}>
                  <div className="card card-header">
                    <Link className="card-img" to={`/product/${pro.slug}`}>
                      <img
                        src={`${base}/api/v1/product/product-photo/${pro._id}`}
                        className="card-img-top card-img"
                        alt="product photo"
                      />
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title">{pro.name}</h5>
                      <p className="card-text">
                        {pro.description.slice(0, 70)}...
                      </p>
                      <p className="card-text">Price - $ {pro.price}</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          navigate(`/product/${pro.slug}`);
                          window.location.reload();
                        }}
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-secondary ms-1"
                        onClick={() => {
                          auth?.user ? addToCard(pro) : navigate("/login");
                        }}
                      >
                        Add to Card
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
