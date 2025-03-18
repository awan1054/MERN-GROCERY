
import { Schema,model } from "mongoose";

const productSchema=new Schema({
    productname:{
        type:String,
        required:[true,"product name is required"],
        maxLength:[20,"product name must be of atmost of 20 char "]
    },
    details:{
        type:String,
        required:[true,"details is required"],
        trim: true,
        maxLength:[20,"details must be less than 500 character "],
    },
    price :{
        type:Number,
        required:[true,"price is required"],
        trim:true,
    },
    image:{
        type:{String},
        required:[true,"image is required"],
        trim:true,
    },
    category:{
        type:[Schema.types.objectId],
        ref:"Category",
        required:[true,"category is required"],

    },
    stock:{
        type:mongoose.Types.Decimal128,
        required:[true,"stock is required"],
        trim:true,
    },
    slug:{
        type:String,
        required:[true,"slug is required"],
        trim:true
    },
    ingredients:{
        type:String,
        required:[true,"Ingredients is required"],
        trim:true
    },
    type:{
        type:String,
        required:[true,"type is required"],
        trim:true,
        enum:[
            "kg","litre","pieces"
        ]
    }

},{timestamps:true})

const Product=model("Product",productSchema)
export default Product