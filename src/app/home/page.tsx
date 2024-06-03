"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import React , { useState,useEffect } from "react";
import toast from "react-hot-toast";
export default function home(){
    const [data, setdata] = useState("null")
    const router = useRouter()
    const getalluserdetails = async ()=>{
        try {
            const userdata = await axios.get('/api/users/me')
            console.log(userdata.data.data._id);
            setdata(userdata.data.data._id)
        } catch (error:any) {
           throw new Error(error.message) 
        }
    }
    useEffect(() => {
     getalluserdetails()
    }, [data])
    
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
        <div 
        className="relative flex mx-auto w-11/12
         text-black flex-col items-center 
         justify-between max-w-max">
            <div>
                <p>
                    Total Medicines 
                </p>
            </div>
            <div className="flex w-full 
            items-center justify-center 
            border p-4
             border-black">
                <div className="flex flex-col items-center justify-center">
                    <img src="/" loading="lazy"></img>
                    <div>
                        <p>Name of Medicine</p>
                    </div>
                    <div className="flex items-center justify-center p-2 gap-4">
                        <div>
                            <p>Price</p>
                        </div>
                        <div>
                            <p>Manufacturer</p>
                        </div>
                    </div>
                </div>
            </div>
           
            <h2>
                {data==='null' ? "Nothing" : <Link href={`/home/${data}`}>
                    Press
                    </Link>}
            </h2>
           
        </div>

    );
}