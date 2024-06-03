import Data from "@/models/dataModel"
import {NextRequest,NextResponse} from "next/server"
import { NextApiRequest,NextApiResponse } from "next"

import {connect} from "@/dbConfig/dbConfig"
import clientPromise from "@/dbConfig/mongoclient"
connect()

export async function POST(req:NextRequest,res:NextApiResponse){
    try {
        const client = await clientPromise;
        const {Page,medname} = await req.json()
        console.log("printing from server pages",Page);
        const skip1 = (Page-1)*10;
        const db = client.db('Medler')
        const query : any = {}
        if(medname){
            query.Medicine_Name= {$regex : medname, $options:'i'};
        }
        const collection = await db.collection('data').find(query).skip(skip1).limit(10).toArray();
        const totalitems = await db.collection('data').countDocuments(query);
        const totalPages = Math.ceil(totalitems/10);
        return NextResponse.json({
            data:collection,
            totalPages : totalPages,
            page : Page
        },
    {status:200})
    } catch (error:any) {
        return NextResponse.json({
            error:error.message,
            message:"failed in fetching the data"
        },
    {status:500})
    }
}