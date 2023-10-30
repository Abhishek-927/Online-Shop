import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const base = process.env.REACT_APP_BASE_URL;
const Category = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);

  const getProductViaCategory = async () => {
    try {
      const { data } = await axios.get(
        `${base}/api/v1/product/product-category/${params?.slug}`
      );
      setProducts(data.products);
      setCategory(data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductViaCategory();
  }, [params?.slug]);

  return (
    <div className="container">
      <h4 className="text-center">Category - {category.name}</h4>
      <h5 className="text-center">{products.length} Result Found</h5>
      <div className="row">
        {products.map((pro) => {
          return (
            <div className="col-md-3" key={pro._id}>
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
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      navigate(`/product/${pro.slug}`);
                    }}
                  >
                    More Details
                  </button>
                  <button className="btn btn-primary ms-1">Add to Card</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
