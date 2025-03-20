import Product from "../../model/product.model.js"

export const CreateProduct=async (req,res,next)=>{
    const {name,details,price,category,stack,slug,ingredients,type}=req.body
    const image=req.file.file?req.file.path:undefined
try {
await Product.create({
    name,details,image
    
    ,price,category,stack,slug,ingredients,type
})

res.status(200).json({
    message:"product created succesfully"
})
} catch (error) {
    next(error)
}





}