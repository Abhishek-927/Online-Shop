import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BiLogoShopify } from "react-icons/bi";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import SearchInput from "../forms/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCard } from "../../context/cardContext";
import { Badge } from "antd";

const Header = () => {
  const { card, setCard } = useCard();
  const categories = useCategory();
  const location = useLocation();
  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    setCard([]);
    toast.success("Logout Done");
    localStorage.removeItem("token");
    localStorage.removeItem("card");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            onClick={() => {
              if (location.pathname === "/") window.location.reload();
            }}
          >
            <BiLogoShopify className="header-icon" />
            Online Shop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse me-3"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <SearchInput />
              <li className="nav-item ms-4">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to={`/categories`} className="dropdown-item">
                      All Category
                    </Link>
                  </li>
                  {categories.map((cat) => {
                    return (
                      <li key={cat._id}>
                        <Link
                          to={`/category/${cat.slug}`}
                          className="dropdown-item"
                        >
                          {cat.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/login" ? "active" : ""
                      }`}
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/signup" ? "active" : ""
                      }`}
                      to="/signup"
                    >
                      Resister
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          to={`/dashboard/${
                            auth?.user?.role === "ADMIN" ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Badge size="small" count={card?.length} showZero>
                  <NavLink to="/cart" className="nav-link">
                    Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
