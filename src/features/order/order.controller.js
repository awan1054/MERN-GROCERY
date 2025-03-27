import mongoose from "mongoose";
import Order from "./order.model.js";
import Product, { ProductType } from "../product/product.model.js";

// Create a new order

export const createOrder = async (req, res, next) => {
  const session = await Order.startSession();
  session.startTransaction();
  try {
    const { userId, orderItems, shippingInfo, status } = req.body;

    // Input validation
    if (!userId || !orderItems || !shippingInfo) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    const updatedCart = [];
    for (const item of orderItems) {
      const product = await Product.findById(item._id).session(session);
      if (!product) throw new Error(`Product ${item._id} no longer exists`);

      if (product.remainingStock < item.quantity)
        throw new Error(`Not enough stock for ${product.name}`);

      updatedCart.push({
        name: product.productname,
        quantity: item.quantity,
        price: product.price,
        image: product.image,
        productId: product._id,
      });
      product.remainingStock = product.remainingStock - item.quantity;
      await product.save({ session });
    }

    const updatedTotal = updatedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    console.log(updatedCart);
    // Create new order
    const newOrder = new Order({
      userId,
      orderItem: updatedCart,
      shippingInfo,
      total: updatedTotal,
      status: status || "processing",
    });

    // Save the order
    await newOrder.save({ session });
    await session.commitTransaction();
    session.endSession();
    return res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({
      message: "Server error while creating the order",
      error: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error while fetching the order" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: "desc" });

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error); //hello
    return res
      .status(500)
      .json({ message: "Server error while fetching orders" });
  }
};

// Update the status of an order
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = [
      "processing",
      "delivery",
      "delivered",
      "refunded",
      "rejected",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error while updating the order" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error while deleting the order" });
  }
};
