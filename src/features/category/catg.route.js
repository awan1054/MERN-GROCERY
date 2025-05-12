import express from "express";

import UploadImg from "../../utils/helper/multer-upload.js";
import {
  createCatgeory,
  getAllCategory,
  getAllProductwithCategoryId,
  getSingleCatgeory,
  upadateCategory,
} from "./catg.controller.js";

const catgRouter = express.Router();
catgRouter.post("/", UploadImg.single("catImg"), createCatgeory);
catgRouter.patch("/", UploadImg.single("catImg"), upadateCategory);
catgRouter.get("/", getAllCategory);
catgRouter.get("/:id", getSingleCatgeory);
catgRouter.get("/:id/product", getAllProductwithCategoryId);

export default catgRouter;
