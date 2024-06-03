"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import React , { useState } from "react";
import toast from "react-hot-toast";

const page = () => {
    
    // const [data, setdata] = useState("null")
    // const getalluserdetails = async ()=>{
    //     try {
    //         const userdata = await axios.get('/api/users/me')
    //         console.log(userdata.data);
    //         setdata(userdata.data.data._id)
    //     } catch (error:any) {
    //        throw new Error(error.message) 
    //     }
    // }
    const logout  = async ()=>{
        try {
            await axios.get("/api/users/logout")
            toast.success("logout successfull")
            
        } catch (error:any) {
            toast.error(error.message)
            return NextResponse.json({
                message:"failed",
                error:error.message
            },{status:400})
        }
    }
    return (
        <div className="flex flex-col items-center
         justify-center min-h-screen py-2">
            <h1>Home Linked</h1>
            {/* <h2>
                {data==='null' ? "Nothing" : <Link href={`/home/${data}`}></Link>}
            </h2> */}
            <button className="bg-blue-500
             text-white py-2 px-4" onClick={logout}>
                Logout
            </button>
        </div>
    );
}

export default page;