import express from "express"
import { CreateProduct } from "./product.controller.js"
import UploadImg from "../../utils/helper/multer-upload.js"
import { upadateCategory } from "../category/catg.controller.js"

const ProductRouter=express.Router()
ProductRouter.post("/",UploadImg.array("image"),CreateProduct)


export default ProductRouter

