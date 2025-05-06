import Product from "./product.model.js";

export const CreateProduct = async (req, res, next) => {
  const {
    productname,
    details,
    price,
    category,
    stock,
    slug,
    ingredients,
    type,
  } = req.body;
  const image = req.file ? req.file.path : undefined;
  console.log(req.file);
  try {
    await Product.create({
      productname,
      details,
      image,
      price,
      category,
      stock,
      remainingStock: stock,
      slug,
      ingredients,
      type,
    });

    res.status(200).json({
      message: "product created succesfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      message: "product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  const {
    productname,
    details,
    price,
    category,
    stock,
    slug,
    ingredients,
    type,
  } = req.body;
  const image = req.file ? req.file.path : null;
  try {
    await Product.findByIdAndUpdate({
      type,
      productname,
      details,
      price,
      category,
      stock,
      slug,
      ingredients,
      image,
    });

    res.status(202).json({
      message: "Product updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllProduct = async (req, res, next) => {
  try {
    const data = await Product.find();
    res.status(201).json({
      message: "product fetched successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { data } = await Product.findById(id);
    res.status(200).json({
      message: "Single product fetched successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};
