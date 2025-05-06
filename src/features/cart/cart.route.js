import express from "express";
import {
  addCart,
  deleteCart,
  getAllCart,
  getSingleCart,
} from "./cart.controller.js";

const cartRouter = express.Router();
cartRouter.route("/").post(addCart);
cartRouter.get("/getall", getAllCart);
cartRouter.delete("/deletecart/:id", deleteCart);
cartRouter.get("/getsingle", getSingleCart);

export default cartRouter;
