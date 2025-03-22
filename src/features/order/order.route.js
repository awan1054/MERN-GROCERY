import express from "express"
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrderStatus } from "./order.controller"




const orderRouter=express.Router()
orderRouter.post("/",createOrder)
orderRouter.patch("/",updateOrderStatus)
orderRouter.get("/",getAllOrders)
orderRouter.get("/:id",getOrderById)
orderRouter.delete("/",deleteOrder)

export default orderRouter

