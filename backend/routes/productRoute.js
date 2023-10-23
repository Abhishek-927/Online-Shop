const express = require("express");
const { signinRequired, isAdmin } = require("../middlewares/authMiddle");
const {
  createProductController,
  getProductController,
  singleProductController,
  getPhotoController,
  deleteProductController,
  updateProductController,
} = require("../controllers/productController");
const formidable = require("express-formidable");

const router = express.Router();

//create product
router.post(
  "/create-product",
  signinRequired,
  isAdmin,
  formidable(),
  createProductController
);

//get All product
router.get("/get-product", getProductController);

//get single product
router.get("/single-product/:slug", singleProductController);

//get photo
router.get("/product-photo/:id", getPhotoController);

//update product
router.put(
  "/update-product/:id",
  signinRequired,
  isAdmin,
  formidable(),
  updateProductController
);

//delete product
router.delete(
  "/delete-product/:id",
  signinRequired,
  isAdmin,
  deleteProductController
);

module.exports = router;
