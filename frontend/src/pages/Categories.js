import React from "react";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <div className="container">
      <div className="row">
        {categories.map((cat) => {
          return (
            <div key={cat._id} className="col-md-6">
              <Link to={`/category/${cat.slug}`} className="btn btn-dark my-1">
                {cat.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
