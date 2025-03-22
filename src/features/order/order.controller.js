
import mongoose from 'mongoose';
import Order from '../../model/order.model';

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const { userId, orderItem, shippingInfo, status } = req.body;

        if (!userId || !orderItem || !shippingInfo) {
            return res.status(400).json({ message: "Required fields are missing." });
        }

        const newOrder = new Order({
            userId,
            orderItem,
            shippingInfo,
            status: status || "processing"  // Default status is "processing"
        });

        // Save the new order to the database
        const savedOrder = await newOrder.save();

        return res.status(201).json(savedOrder);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while creating the order" });
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
        return res.status(500).json({ message: "Server error while fetching the order" });
    }
};


export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while fetching orders" });
    }
};

// Update the status of an order
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const validStatuses = ["processing", "delivery", "delivered", "refunded", "rejected"];
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
        return res.status(500).json({ message: "Server error while updating the order" });
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
        return res.status(500).json({ message: "Server error while deleting the order" });
    }
};
