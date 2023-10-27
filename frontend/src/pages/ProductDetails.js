import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const base = process.env.REACT_APP_BASE_URL;

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${base}/api/v1/product/single-product/${params.slug}`
      );
      setProduct(data.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
      console.log(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${base}/api/v1/product/similar-product/${pid}/${cid}`
      );
      console.log("data", data);
      setRelated(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getSingleProduct();
  }, [params?.slug]);

  return (
    <div>
      <div className="row container">
        <div className="col-md-6">
          <img
            style={{ width: "18rem" }}
            src={`${base}/api/v1/product/product-photo/${product?._id}`}
            className="card-img-top"
            alt="product photo"
          />
        </div>
        {product?.name && (
          <div className="col-md-6">
            <h2 className="text-center">Product Details</h2>
            <h5>Name : {product?.name}</h5>
            <h5>Description : {product?.description}</h5>
            <h5>Price : {product?.price}</h5>
            <h5>Category : {product?.category.name}</h5>
            <button className="btn btn-dark">ADD TO CART</button>
          </div>
        )}
      </div>
      <hr />
      <div className="row">
        <h3>Similar Product</h3>
        <div className="d-flex flex-wrap" style={{ gap: "25px" }}>
          {related.length === 0 ? (
            <h5 className="text-center">No related product found</h5>
          ) : (
            related.map((pro) => {
              return (
                <div style={{ width: "18rem" }} key={pro._id}>
                  <div className="card">
                    <img
                      style={{ width: "18rem" }}
                      src={`${base}/api/v1/product/product-photo/${pro._id}`}
                      className="card-img-top"
                      alt="product photo"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{pro.name}</h5>
                      <p className="card-text">{pro.description}</p>
                      <p className="card-text">{pro.price}</p>
                      <button className="btn btn-primary ms-1">
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
