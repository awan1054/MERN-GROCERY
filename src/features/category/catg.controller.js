import Product from "../product/product.model.js";
import Category from "./catg.model.js";
export const createCatgeory = async (req, res, next) => {
  const { name } = req.body;
  try {
    await Category.create({
      name,
      catgImg: req.file ? req.file.path : null,
    });
    res.status(201).json({
      message: "category created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const upadateCategory = async (req, res, next) => {
  const { name, catgImg } = req.body;
  try {
    const id = req.params.id;
    await Category.findByIdAndUpdate(id, {
      name,
      catgImg,
    });
    res.status(200).json({
      message: "Category updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const getSingleCatgeory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await Category.findById(id);
    res.status(200).json({
      message: " single category fectched successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCategory = async (req, res, next) => {
  try {
    const data = await Category.find();
    res.status(200).json({
      message: "catgeory fetched successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllProductwithCategoryId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.find()
      .where({ category: id })
      .populate("category", "name");
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
