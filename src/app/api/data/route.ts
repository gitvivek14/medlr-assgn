import Data from "@/models/dataModel"
import {NextRequest,NextResponse} from "next/server"

import {connect} from "@/dbConfig/dbConfig"
import clientPromise from "@/dbConfig/mongoclient"
connect()

export async function GET(req:NextRequest,res:NextResponse){
    try {
        const client = await clientPromise;
        const db = client.db('Medler')
        const collection = await db.collection('data').find({}).limit(10).toArray();
        return NextResponse.json({
            data:collection
        },
    {status:200})
        // const data = await Data.find({}).limit(10)
        // if(!data){
        //     console.log("no data in backend");
        // }
        // return NextResponse.json({
        //     message:"data fecthed succesfully",
        //     yourdata:data,
        // },{status:200})
        
    } catch (error:any) {
        return NextResponse.json({
            error:error.message,
            message:"failed in fetching the data"
        },
    {status:500})
    }
}