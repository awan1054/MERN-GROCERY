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

}