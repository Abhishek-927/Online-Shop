import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Checkbox, Radio } from "antd";
import { prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCard } from "../context/cardContext";
import SpinnerOnly from "../components/SpinnerOnly";

const base = process.env.REACT_APP_BASE_URL;

const Home = () => {
  const navigate = useNavigate();
  const { card, setCard } = useCard();
  const [checked, setChecked] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  let temp = {};

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${base}/api/v1/product/product-count`);
      setTotal(data?.count);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${base}/api/v1/product/get-product`);
      setProducts(data.products);
      console.log("dafsdf ", data);
    } catch (error) {
      console.log(error);
      toast.error("getting all categories failed");
    }
  };

  const getAllCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${base}/api/v1/category/get-categories`
      );
      setCategories(data.allCategories);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const addToCard = (pro) => {
    temp = { ...pro };
    delete temp.photo;
    setCard([...card, temp]);
    toast.success("Item added");
    localStorage.setItem("card", JSON.stringify([...card, temp]));
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //handle filter for checkbox/category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //get filter product from backend
  const filterProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${base}/api/v1/product/product-filter`,
        { checked, radio }
      );
      setProducts(data?.product);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    filterProduct();
  }, [checked, radio]);

  return (
    <div className="home-page">
      <h1 className="my-3">Welcome to Our E-commerce Store</h1>
      <div className="row mt-3">
        <div className="col-md-2">
          <h6 className="text-center">Filter By Category</h6>
          <div className="d-flex flex-column">
            {categories?.map((c) => {
              return (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              );
            })}
          </div>
          <hr />
          <h6 className="text-center mt-4">Filter By Prices</h6>
          <div className="d-flex flex-column text-align-start">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {prices?.map((p) => {
                return (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                );
              })}
            </Radio.Group>
          </div>
          <hr style={{ marginBottom: "10px" }} />
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-10">
          {loading ? (
            <SpinnerOnly />
          ) : (
            <div className="d-flex flex-wrap gap-25px">
              {products.map((pro) => {
                return (
                  <div key={pro._id}>
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
                            addToCard(pro);
                          }}
                        >
                          Add to Card
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
