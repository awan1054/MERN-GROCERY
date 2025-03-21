import {
    Schema, model
} from "mongoose"

const orderSchema = new Schema({
    userId: {
        type: Types.objectId,
        ref: "User",
        required: [true, "userid is required"]
    },
    orderItem: [
            {
        productId: {
            type: Types.objectId,
            ref: "Product",
            required: [true, "productid is required"]
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number, required: true
        },
        image: {
            type: [String],
            required: true
        },

    },
    ],
    shippingInfo:[{
        country:{
            type:String,
            required:[true,"shipping country is required"]
        },
        city:{
            type:String,
            required:[true,"shipping city is required"]
        },
        state:{
            type:String,
            required:[true,"shipping state is required"]
        },
        address:{
            type:String,
            required:[true,"shipping address is required"]
        }

    }],
    status:{
        type:String,
        enum:["processing","delivery","delivered",
            "refunded","rejected"
        ],
        default:"processing"
    }
    
},{
    timestamps:true
})
const Order=model("Order",orderSchema)
export default Order