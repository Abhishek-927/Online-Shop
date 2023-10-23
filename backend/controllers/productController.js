const { validationResult } = require("express-validator");
const productModel = require("../models/productModel");
const fs = require("fs");
const slugify = require("slugify");

//creating product
const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(401).json({ msg: "name required" });
      case !description:
        return res.status(401).json({ msg: "description required" });
      case !price:
        return res.status(401).json({ msg: "price required" });
      case !category:
        return res.status(401).json({ msg: "category required" });
      case !quantity:
        return res.status(401).json({ msg: "quantity required" });
    }

    if (!photo || photo.size > 1000000) {
      return res.status(401).json({
        msg: "photo is required and At most 1 MB",
      });
    }

    const product = new productModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();

    res.status(201).json({
      success: true,
      msg: "success",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      msg: "error inside creating product",
    });
  }
};

//get product
const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createAt: -1 });

    res.send({
      success: true,
      totalCount: products.length,
      msg: "All product",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      msg: "error inside getting All product",
    });
  }
};

//get single product
const singleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.send({
      success: true,
      totalCount: product.length,
      msg: "one product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      msg: "error inside getting single product",
    });
  }
};

//get photo product
const getPhotoController = async (req, res) => {
  try {
    const product = await productModel
      .findById({ _id: req.params.id })
      .select("photo")
      .populate("category");

    if (product && product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.send(product.photo.data);
    } else {
      res.send("photo not available");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      msg: "error inside getting single product",
    });
  }
};

//delete product
const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(401).json({ msg: "name required" });
      case !description:
        return res.status(401).json({ msg: "description required" });
      case !price:
        return res.status(401).json({ msg: "price required" });
      case !category:
        return res.status(401).json({ msg: "category required" });
      case !quantity:
        return res.status(401).json({ msg: "quantity required" });
    }

    if (!photo || photo.size > 1000000) {
      return res.status(401).json({
        msg: "photo is required and At most 1 MB",
      });
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();

    res.status(201).json({
      success: true,
      msg: "success",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      msg: "error inside update product",
    });
  }
};

//delete product
const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id).select("-photo");
    res.status(200).send({
      success: true,
      msg: "delete done",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      msg: "error inside getting single product",
    });
  }
};

module.exports = {
  createProductController,
  singleProductController,
  getProductController,
  getPhotoController,
  deleteProductController,
  updateProductController,
};
