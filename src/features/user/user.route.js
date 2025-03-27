import express from "express";
import {
  CreateUser,
  deleteUser,
  getUsers,
  loginUser,
  singleUser,
  updateUser,
} from "./user.conroller.js";

const userRouter = express.Router();

userRouter.post("/create", CreateUser);
userRouter.get("/get", getUsers);
userRouter.patch("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);
userRouter.get("/getsingle/:id", singleUser);
userRouter.post("/login", loginUser);
export default userRouter;
