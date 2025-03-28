import express from "express";
import { addCart } from "./cart.controller.js";

const cartRouter = express.Router();
cartRouter.route("/").post(addCart);

export default cartRouter;
