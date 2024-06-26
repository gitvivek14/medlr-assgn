import exp from "constants"
import mongoose from "mongoose"
import { type } from "os";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenexpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:String,
})

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User;