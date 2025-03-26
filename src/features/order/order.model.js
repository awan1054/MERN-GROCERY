import { Schema, model, Types } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "userid is required"],
    },
    orderItem: [
      {
        productId: {
          type: Types.ObjectId,
          ref: "Product",
          required: [true, "productid is required"],
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        image: {
          type: [String],
        },
      },
    ],
    shippingInfo: [
      {
        country: {
          type: String,
          required: [true, "shipping country is required"],
        },
        city: {
          type: String,
          required: [true, "shipping city is required"],
        },
        state: {
          type: String,
          required: [true, "shipping state is required"],
        },
        address: {
          type: String,
          required: [true, "shipping address is required"],
        },
      },
    ],
    status: {
      type: String,
      enum: ["processing", "delivery", "delivered", "refunded", "rejected"],
      default: "processing",
    },
    total: {
      type: Types.Decimal128,
    },
  },
  {
    timestamps: true,
  }
);
const Order = model("Order", orderSchema);
export default Order;
