import User from "@/models/userModel"
import {NextRequest,NextResponse} from "next/server"

import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import {connect} from "@/dbConfig/dbConfig"

connect()

export async function POST(request : NextRequest) {
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody
        console.log("printing reqbody from backend",reqBody);

        const user = await User.findOne({email:email})
        if(!user){
            return NextResponse.json({error:"user doesnot exist"},
                {status:400}
            )
        }
        const validpwd = await bcryptjs.compare(password,user.password)
        if(!validpwd){
            return NextResponse.json({error:"invalid password"},
                {status:400}
            )
        }
        const tokendata = {
            id:user._id,
            username:user.username,
            email:user.email
        }
        const token =  await jwt.sign(tokendata,process.env.JWT_SECRET_KEY!,{
            expiresIn:"1h"
        })

        const response = NextResponse.json({
            message:"Login Successful",
            success:true
        })
        response.cookies.set("token",token,{
            httpOnly:true,
        })

        return response;

    } catch (error:any) {
        return NextResponse.json({error:error.message,message:"failed in api"},
            {status:500}
        )
    }
    
}
