import Product from "../product/product.model.js";
import Cart from "./cart.model.js";

export const addCart = async (req, res, next) => {
  const { productId, quantity, userId } = req.body;

  if (!productId || !quantity) {
    res.status(404).json({
      message: "productid and quantity is required",
    });
  }

  try {
    const foundproduct = await Product.findById(productId);
    if (!foundproduct) {
      res.send("not found product");
    }
    if (foundproduct.remainingStock > quantity) {
      const cartItem = await Cart.findOne({
        productId,
        userId,
      });
      if (cartItem) {
        cartItem.quantity = quantity;
        await cartItem.save();
        return res.status(200).json({
          message: "cart updated",
        });
      }

      const data = await Cart.create({
        productId,
        quantity,
        userId,
      });
      res.status(200).json({
        message: "product added to cart",
        data: data,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteCart = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await Cart.findByIdAndDelete(id);
    res.status(200).json({
      message: "product deleted in the cart successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCart = async (req, res, next) => {
  try {
    const data = await Cart.find();
    res.status(200).json({
      message: "cart fetched successfully",
      data,
    });
  } catch (error) {}
};

export const getSingleCart = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await Cart.findById(id);
    res.status(200).json({
      message: "Single cart fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};
