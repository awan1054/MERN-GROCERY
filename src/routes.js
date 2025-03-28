import express from "express";
import userRouter from "./features/user/user.route.js";
import ProductRouter from "./features/product/product.route.js";

import catgRouter from "./features/category/catg.route.js";
import reviewRouter from "./features/review/review.route.js";
import orderRouter from "./features/order/order.route.js";
import cartRouter from "./features/cart/cart.route.js";
const router = express.Router();

router.use("/user", userRouter);
router.use("/product", ProductRouter);
router.use("/category", catgRouter);
router.use("/review", reviewRouter);
router.use("/order", orderRouter);
router.use("/cart", cartRouter);
export default router;
