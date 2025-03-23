import express from "express"
import { createReview, getAllReview, getSingleReview, upadateReview } from "./review.controller.js"



const reviewRouter=express.Router()
reviewRouter.post("/",createReview)
reviewRouter.patch("/",upadateReview)
reviewRouter.get("/",getAllReview)
reviewRouter.get("/:id",getSingleReview)

export default reviewRouter

