import express from "express"
import userRouter from "./features/user/user.route.js";
import ProductRouter from "./features/product/product.route.js";

import catgRouter from "./features/category/catg.route.js";
const router=express.Router();


router.use("/user",userRouter)
router.use("/product",ProductRouter)
router.use("/category",catgRouter)
export default router;