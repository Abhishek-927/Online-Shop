const categoryModel = require("../models/categoryModel");
const slug = require("slugify");

//create new category
const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(401).json({
        msg: "name is required",
        success: false,
      });
    } else {
      const isExist = await categoryModel.findOne({ name });
      if (isExist) {
        return res.send("Already exist");
      }
      const newCategory = await categoryModel({
        name: name,
        slug: slug(name),
      });
      newCategory.save();
      return res.status(201).json({
        success: true,
        newCategory,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Category error");
  }
};

//updating category
const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send("name is required");
    }
    const update = await categoryModel.findByIdAndUpdate(
      req.params.id,
      { name, slug: slug(name) },
      { new: true }
    );
    res.status(201).json({
      success: true,
      update,
      msg: "updatetion done",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      msg: "error while updating",
    });
  }
};

//get all categories
const getCategoryController = async (req, res) => {
  try {
    const allCategories = await categoryModel.find({});
    return res.send({
      success: true,
      allCategories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      msg: "error while geting categories",
    });
  }
};

//get single category
const singleCategoryController = async (req, res) => {
  try {
    const allCategories = await categoryModel.findOne({
      slug: req.params.slug,
    });
    return res.send({
      success: true,
      allCategories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      msg: "error while geting categories",
    });
  }
};

//get single category
const deleteCategoryController = async (req, res) => {
  try {
    const allCategories = await categoryModel.findOneAndDelete({
      _id: req.params.id,
    });
    return res.send({
      success: true,
      allCategories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      msg: "error while deleting categery",
    });
  }
};

module.exports = {
  createCategoryController,
  updateCategoryController,
  getCategoryController,
  singleCategoryController,
  deleteCategoryController,
};
