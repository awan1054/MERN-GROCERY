import Category from "../../model/catg.model"

export const createCatgeory=async(req,res,next)=>{
    const {name,catgImg}=req.body
    try {
        await Category.create({
            name,catgImg
        })
        res.status(201).json({
            message:"category created successfully"

        })
    } catch (error) {
        next(error)
    }
}

export const upadateCategory=async(req,res,next)=>{
const {name,catgImg}=req.body
try {
    const id=req.params.id
    await Category.findByIdAndUpdate(id,{
        name,catgImg
    })
    res.status(200).json({
        message:"Category updated successfully"
    })
    
} catch (error) {
    next(error)
    
}
}
export const getSingleCatgeory=async(req,res,next)=>{
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

export const getAllCategory=async(req,res,next)=>{
   try {
    const data= await Category.find()
    res.status(200).json({
        message:"catgeory fetched successfully",
        data:data
    })
   } catch (error) {
 next(error)   
   }
}