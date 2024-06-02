import User from "@/models/userModel"
import {NextRequest,NextResponse} from "next/server"

import bcryptjs from "bcryptjs"
import {connect} from "@/dbConfig/dbConfig"

connect()

export async function POST(request:NextRequest){
    try {
       const reqbody = await request.json ()
       const {email, password,username} = reqbody
       console.log(reqbody)
       const user = await User.findOne({email:email})
        if(user){
            return NextResponse.json({
                error:"User Already Exist"
            },{status:400})
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedpass = await bcryptjs.hash(password,salt)
        const newUser = new User({
            username,
            email,
            password:hashedpass
        })

        const saveduser = await newUser.save()
        console.log(saveduser)
        return NextResponse.json({
            message:"User Created Successfully",
            success:true,
            saveduser
        },{status:200})
    } catch (error:any) {
        return NextResponse.json({
            status:500,
            error:error.message
        })
        
    }
}