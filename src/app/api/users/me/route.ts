import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDatafromtoken";
import {connect} from "@/dbConfig/dbConfig"

connect()
export async function GET(request:NextRequest){
    try {
        const userid = await getDataFromToken(request)
        const user = await User.findOne({_id:userid}).select("-password")
        return NextResponse.json({
            message:"User Found",
            data:user
        },{status:200})
    } catch (error:any) {
        console.log(error);
        
    }
}