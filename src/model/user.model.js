import { Schema,model } from "mongoose"

const UserSchema=new Schema({
    firstName:{
        type:String,
        required:[true,"first name is required"],
        trim:true,
        maxLength:[50,"first name must be less than 50 character"]
    },
    lastName:{
        type:String,
        required:false,
        trim:true,
        maxLength:[50,"last name must be less than 50 character"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
    },
    password:
    {
        type:String,
        required:[true,"password is required"],
        trim:true,
        minLength:[8,"password must be at least 8 character"]

    },
        country:{
            type:String,
            required:[true,"country is required"],
            trim:true
        },
        state:{
            type:String,
            required:[true,"state  is required"],
            trim:true
        },
       city:{
            type:String,
            required:[true,"city is required"],
            trim:true
        },
        address:{
       
            type:String,
            required:[true]
        },
    zipcode:{
        type:String,
        required:true,
        trim:true
    }
    },{timestamps:true}
)
const User=model("User",UserSchema);
export default User;