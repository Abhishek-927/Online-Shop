import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Checkbox, Radio } from "antd";
import { prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";

const base = process.env.REACT_APP_BASE_URL;

const Home = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

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
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("getting all categories failed");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${base}/api/v1/category/get-categories`
      );
      setCategories(data.allCategories);
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    if (!checked?.length || !radio?.length) getAllProducts();
    filterProduct();
    // eslint-disable-next-line
  }, [checked.length, radio.length]);

  //get filter product from backend
  const filterProduct = async () => {
    try {
      console.log(checked, radio, "in home");
      const { data } = await axios.post(
        `${base}/api/v1/product/product-filter`,
        { checked, radio }
      );
      setProducts(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <div className="home-page">
      <h1>Welcome to Our E-commerce Store</h1>
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
          <h6 className="text-center mt-4">Filter By Prices</h6>
          <div className="d-flex flex-column">
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
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h2 className="text-cetner">All Products</h2>
          <div className="d-flex flex-wrap">
            {products.map((pro) => {
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
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          navigate(`/product/${pro.slug}`);
                        }}
                      >
                        More Details
                      </button>
                      <button className="btn btn-primary ms-1">
                        Add to Card
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
