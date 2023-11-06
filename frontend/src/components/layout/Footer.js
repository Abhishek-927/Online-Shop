import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-head">
      <div className="footer">All Right Reserve &copy; 2023 Online Shop</div>
      <ul className="footer-links">
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contect Us</Link>
        </li>
        <li>
          <Link to="/policy">Privacy Policy</Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
