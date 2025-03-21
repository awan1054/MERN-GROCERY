import Product from "../../model/product.model.js"

export const CreateProduct=async (req,res,next)=>{
    const {productname,details,price,category,stack,slug,ingredients,type}=req.body
    const image=req.file?req.file.path:null
try {
await Product.create({
    productname,details,image
    
    ,price,category,stack,slug,ingredients,type
})

res.status(200).json({
    message:"product created succesfully"
})
} catch (error) {
    next(error)
}





}