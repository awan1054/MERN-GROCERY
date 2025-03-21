import { Schema,model,Types } from "mongoose";

const reviewSchema =new Schema({
    userId:{
        type:Types.objectId,
        ref:"User",
        required:[true,"userid is required"]
    },
    productId:{
        type:Types.objectId,
        ref:"Product",
        required:[true,"productid is required"]
    },
    rating:{
        type:Number,
        default:0,
        validate:{
            validator:
                function(value)
                {
                    return value<5
                },
                message:"rating must be less than 5"

            
        }
    },
    review:{
        type:String,
        maxLength:[200,"review shouldnot be greater than 200 "]
    }
},{
    timestamps:true
})

const Review=model("reviewSchema",reviewSchema)
export default Review
