import mongoose from "mongoose";
import { type } from "os";

const dataSchema = new mongoose.Schema({
    Availability:{
        type:Boolean
    },
    Cluster_Description:{
        type:String
    },
    Cluster_ID:{
        type:Number
    },
    Index:{
        type:Number
    },
    Unique_Index:{
        type:Number
    },
    Medicine_Name:{
        type:String
    },
    Medicine_Link:{
        type:String
    },
    Prescription_Required:{
        type:Boolean
    },
    Retail_Price:{
        type:Number
    },
    Discounted_Price:{
        type:Number
    },
    Manufacturer:{
        type:String
    },
    Form:{
        type:String
    },
    Manufacturer_ID:{
        type:Number
    },
    Cluster_Name:{
        type:String
    },
    Dummy_Cluster_Name:{
        type:String
    },
    Total_Pharmacies:{
        type:Number
    },
    Source:{
        type:String
    }
},{collection: 'data'})
const Data = mongoose.model.data || mongoose.model("data",dataSchema)


export default Data;