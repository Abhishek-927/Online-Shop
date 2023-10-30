import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

import { useCard } from "../context/cardContext";

const base = process.env.REACT_APP_BASE_URL;

const Category = () => {
  const navigate = useNavigate();
  const { card, setCard } = useCard();
  const params = useParams();
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  let temp = {};

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
      <div className="my-4">
        <h3 className="text-center mb-2">Category - {category.name}</h3>
        <h5 className="text-center">{products.length} Result Found</h5>
      </div>
      <div className="d-flex flex-wrap gap-25px">
        {products.map((pro) => {
          return (
            <div className="card" key={pro._id}>
              <img
                src={`${base}/api/v1/product/product-photo/${pro._id}`}
                className="card-img-top card-img"
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
                <button
                  className="btn btn-secondary ms-2"
                  onClick={() => {
                    temp = { ...pro };
                    delete temp.photo;
                    setCard([...card, temp]);
                    toast.success("Item added");
                    localStorage.setItem(
                      "card",
                      JSON.stringify([...card, temp])
                    );
                  }}
                >
                  Add to Card
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
