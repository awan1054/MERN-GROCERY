import express from "express"
import { CreateProduct } from "./product.controller.js"
import UploadImg from "../../utils/helper/multer-upload.js"

const ProductRouter=express.Router()
ProductRouter.post("/",UploadImg.single("image"),CreateProduct)
export default ProductRouter

