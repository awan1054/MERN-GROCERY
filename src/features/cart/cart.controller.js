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
