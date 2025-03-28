import { Schema, model, Types } from "mongoose";

const cartSchema = new Schema({
  productId: {
    type: [Types.ObjectId],
    ref: "Product",
    required: [true, "productid is required"],
  },
  userId: {
    type: [Types.ObjectId],
    ref: "User",
    required: [true, "userId is required"],
  },
  quantity: {
    type: Number,
    required: [true, "quantity is required"],
  },
});

const Cart = model("Cart", cartSchema);
export default Cart;
