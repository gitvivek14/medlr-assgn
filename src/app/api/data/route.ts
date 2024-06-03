import Data from "@/models/dataModel"
import {NextRequest,NextResponse} from "next/server"
import { NextApiRequest,NextApiResponse } from "next"

import {connect} from "@/dbConfig/dbConfig"
import clientPromise from "@/dbConfig/mongoclient"
connect()

export async function POST(req:NextRequest,res:NextApiResponse){
    try {
        const client = await clientPromise;
        const {Page,medname,minPrice,maxPrice,manufacturer,sort} = await req.json()
        console.log("printing from server pages",Page);
        const skip1 = (Page-1)*10;
        const db = client.db('Medler')
        const query : any = {}
        if(medname){
            query.Medicine_Name= {$regex : medname, $options:'i'};
        }
        if (minPrice) query.Discounted_Price = { $gte: minPrice };
    if (maxPrice) {
      query.Discounted_Price = query.Discounted_Price || {};
      query.Discounted_Price.$lte = maxPrice;
    }
    let sortOption: any = {};
    if (sort === 'price_asc') {
      sortOption = { Discounted_Price: 1 };
    } else if (sort === 'price_desc') {
      sortOption = { Discounted_Price: -1 };
    } else if (sort === 'name_asc') {
      sortOption = { Medicine_Name: 1 };
    } else if (sort === 'name_desc') {
      sortOption = { Medicine_Name: -1 };
    }
    if (manufacturer) query.Manufacturer = { $regex: manufacturer, $options: 'i' };
        const collection = await db.collection('data').find(query).sort(sort).skip(skip1).limit(10).toArray();
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