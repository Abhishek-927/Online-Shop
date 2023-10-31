import React from "react";
import { useSearch } from "../context/searchContext";

const base = process.env.REACT_APP_BASE_URL;

const Search = () => {
  const { values, setvalues } = useSearch();

  return (
    <div className="text-center">
      <h2>Search Result</h2>
      <h5>
        {values.results.length < 1
          ? "No Products Found"
          : `Found ${values.results.length}`}
      </h5>
      <div className="d-flex flex-wrap" style={{ gap: "25px" }}>
        {values.results.map((pro) => {
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
                  <p className="card-text">{pro.description.slice(0, 48)}...</p>
                  <p className="card-text">{pro.price}</p>
                  <button className="btn btn-primary">More Details</button>
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

export default Search;
