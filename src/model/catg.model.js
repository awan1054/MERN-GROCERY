import { Schema,model } from "mongoose";

const categorySchema=new Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        trim: true,
        maxLength:[50,"name must be less than 50 character"],

    },
    catgImg:{
        type:String,
        required:[true,"category image is required"],

    }
},{
    timestamps:true,
})

const Category=model("Category",categorySchema)
export default Category