import mongoose from "mongoose";
import Order from "../../model/order.model.js";
import Product, { ProductType } from "../../model/product.model.js";
import cError from "../../utils/customErrorHandler.js";

// Create a new order

export const createOrder = async (req, res, next) => {
  try {
    const { userId, orderItems, shippingInfo, status } = req.body;

    // Input validation
    if (!userId || !orderItems) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    // Get product IDs from order items
    const ordersproductId = orderItems?.map((item) => {
      return item.producdId;
    });

    // Find all products
    const products = await Product.find({
      _id: { $in: ordersproductId },
    });

    // Validate stock levels
    const hasINStockItem = products.map((p) => {
      console.log("-----", p);
      const orderItem = orderItems.find((o) => o.producdId === p._id);
      console.log("----", orderItem);

      if (!orderItem) return null;

      const hasInStock = Number(p.stock) <= Number(orderItem.qty);
      console(p.stock);
      console(Number(p.stock));
      console(Number(orderItem.qty));
      if (!hasInStock) {
        return res.status(400).json({
          message: `out of stock ${p.productname}`,
        });
      }

      return {
        productId: p._id,
        name: p.productname,
        price: p.price,
        quantity: orderItem.qty,
        image: p.image,
      };
    });
    console.log("-----2");

    // Remove null values (products that were out of stock)
    const validOrderItems = hasINStockItem.filter((item) => item !== null);

    if (validOrderItems.length === 0) {
      return res.status(400).json({
        message: "All products are out of stock",
      });
    }

    // Create new order
    const newOrder = new Order({
      userId,
      orderItems: validOrderItems,
      shippingInfo,
      status: status || "processing",
    });

    // Save the order
    const savedOrder = await newOrder.save();
    return res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
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
    const orders = await Order.find();

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
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
