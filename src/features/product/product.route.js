import express from "express";
import {
  CreateProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
} from "./product.controller.js";
import UploadImg from "../../utils/helper/multer-upload.js";

const ProductRouter = express.Router();
ProductRouter.post("/", UploadImg.single("image"), CreateProduct);
ProductRouter.patch("/", UploadImg.array("image"), updateProduct);
ProductRouter.get("/:id", getSingleProduct);
ProductRouter.get("/", getAllProduct);
ProductRouter.delete("/", deleteProduct);

export default ProductRouter;
