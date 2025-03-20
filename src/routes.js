import express from "express"
import userRouter from "./features/user/user.route.js";
import ProductRouter from "./features/product/product.route.js";
const router=express.Router();


router.use("/user",userRouter)
router.use("/product",ProductRouter)
export default router;