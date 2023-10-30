import React from "react";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <div className="container mt-3">
      <div className="row">
        {categories.map((cat) => {
          return (
            <div key={cat._id} className="col-md-4 justify-content-center">
              <Link
                to={`/category/${cat.slug}`}
                className="btn btn-secondary my-3 category-btn"
              >
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
