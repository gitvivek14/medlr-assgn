"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default function home() {
  const [data, setdata] = useState("null");
  const [MedicineData, setMedicineData] = useState([]);
  const router = useRouter();
  const getalluserdetails = async () => {
    try {
      const userdata = await axios.get("/api/users/me");
      console.log(userdata.data.data._id);
      setdata(userdata.data.data._id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  const truncateText = (text: string, maxLength: number) => {
    if (text?.length <= maxLength) {
      return text!;
    }
    return text?.substring(0, maxLength) + '...';
  };
  const getdata = async () => {
    try {
      const mdata: any = await axios.get("/api/data");
      console.log("mdata ", mdata.data);
      const { data } = mdata.data;
      setMedicineData(data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  useEffect(() => {
    getalluserdetails();
    getdata();
  }, [data]);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout successfull");
    } catch (error: any) {
      toast.error(error.message);
      return NextResponse.json(
        {
          message: "failed",
          error: error.message,
        },
        { status: 400 }
      );
    }
  };
  return (
    <div className="flex flex-col items-center justify-between w-[100vw] h-[100vh] overflow-x-hidden">
        <div className="flex items-center justify-center text-black text-2xl gap-3 mt-4 font-bold">
            <div>
                <p>{`Hello  ${data} ,`}</p>
            </div>
            <div>
                <p>Welcome to Medler</p>
            </div>
        </div>
       <div className="flex items-center justify-evenly w-full h-full 
       flex-wrap flex-auto gap-4 p-4 max-w-max">
        {
            MedicineData.map((item:any,idx:any)=>{
                const imagesArray = item.Images?.split(',');
                const firstImage = imagesArray?.find((img: string) => img.endsWith('.jpg'));
                const truncatedDescription = truncateText(item.Cluster_Description!, 50);

                return (
                    <div className="w-[400px] h-[400px] flex flex-col 
                    items-center justify-start 
                    rounded-lg border border-gray-200 p-3 max-w-sm shadow-md hover:bg-slate-400 aspect-square ">
                        <div>
                            <img src={firstImage} loading="lazy" 
                            width={60} height={60} >
                            </img>
                            </div>
                            <div className="w-full h-full flex flex-col items-center justify-center">
                            <div className="text-md font-semibold">
                                <p>{item.Medicine_Name}</p>
                                </div>
                            <div className="text-sm font-light">
                                <p>
                                    {truncatedDescription}
                                </p>
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-between gap-3">
                            <div className="font-bold">
                                {`Price : $ ${item.Discounted_Price}`}
                            </div>
                            <div className="text-sm font-medium flex flex-col items-end justify-end">
                                <div className="text-sm italic">
                                    Manufactured By : -
                                </div>
                                {item.Manufacturer}
                            </div>
                            </div>

                         
                            <div className="w-full mt-3">
                            <Button variant={"destructive"}>
                                Buy
                            </Button>
                                </div>
                        </div>
                )
               

})
        }

       </div>

    </div>
  );
}
