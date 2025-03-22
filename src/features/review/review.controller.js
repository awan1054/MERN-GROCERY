
import Review from "../../model/review.model.js"

export const createReview=async(req,res,next)=>{
    const {userId,productId,rating,review}=req.body
    try {
        await Review.create({userId,productId,rating,review

          
        })
        res.status(201).json({
            message:" Review created successfully"

        })
    } catch (error) {
        next(error)
    }
}

export const upadateReview=async(req,res,next)=>{
    const {userId,productId,rating,review}=req.body
try {
    const id=req.params.id
    await Review.findByIdAndUpdate(id,{
        userId,productId,rating,review
    })
    res.status(200).json({
        message:"Category updated successfully"
    })
    
} catch (error) {
    next(error)
    
}
}
export const getSingleReview=async(req,res,next)=>{
    const {id}=req.params
  try {
    const data= await Category.findById(id)
    res.status(200).json({
     message:" single category fectched successfully",
     data:data
    })
    
  } catch (error) {
    next(error)
  }
}

export const getAllReview=async(req,res,next)=>{
   try {
    const data= await Review.find()
    res.status(200).json({
        message:"Review fetched successfully",
        data:data
    })
   } catch (error) {
 next(error)   
   }
}