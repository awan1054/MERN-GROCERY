import cError from "../../utils/customErrorHandler.js";
import User from "./user.model.js";
import bcrypt, { hashSync } from "bcrypt";
export const CreateUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    country,
    address,
    zipcode,
    password,
    city,
    state,
  } = req.body;

  try {
    const Newuser = new User({
      firstName,
      lastName,
      email,
      city,
      country,
      zipcode,
      address,
      password,
      state,
    });
    Newuser.password = await bcrypt.hashSync(password, 8);
    await Newuser.save();
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};
//get all api
export const getUsers = async (req, res, next) => {
  try {
    const data = await User.find();
    res.status(201).json({
      message: "Users datas are fetched success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

//update api

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.param;
    const {
      firstName,
      lastName,
      email,
      password,
      zipCode,
      state,
      city,
      country,
      address,
    } = req.body;

    await User.findByIdAndUpdate(id, {
      city,
      firstName,
      lastName,
      email,
      password,
      city,
      state,
      address,
      zipCode,
      country,
    });
    res.status(201).json({
      message: "updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// delete api
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.param;
    await User.findByIdAndDelete(id);
    res.status(201).json({
      message: "deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const singleUser = async (req, res, next) => {
  const { id } = req.param;
  const user = User.findById();
  res.status(201).json({
    message: "single user fetched successfully",
    data: user,
  });
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(cError(400, "email password are required"));
  }

  try {
    const foundAccount = await User.findOne({ email });
    if (!foundAccount) {
      return next(cError(400, "Invalid credentials"));
    }
    const isvalidPassword = bcrypt.compareSync(password, foundAccount.password);
    if (!isvalidPassword) {
      return next(cError(400, "Invalid credentials"));
    }

    res.status(200).json({
      message: "You are logged in " + foundAccount.firstName,
    });
  } catch (error) {
    next(error);
  }
};
