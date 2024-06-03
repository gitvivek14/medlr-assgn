"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  

export default function home() {
    const [Page, setPage] = useState(1)
    const [loading , setloading ] = useState(false)
    const [totalPages, setTotalPages] = useState(1)
    const [data, setdata] = useState("null");
    const [medname, setMedname] = useState('')
  const [MedicineData, setMedicineData] = useState([]);
  const router = useRouter();
  const getalluserdetails = async () => {
    try {
      const userdata = await axios.get("/api/users/me");
      console.log(userdata.data.data._id);
      setdata(userdata.data.data._id);
    } catch (error: any) {
      console.log(error);
    }
  };
  const handlesearch = (e:React.FormEvent)=>{
    e.preventDefault()
    setPage(1)
    getdata()
  }
  const truncateText = (text: string, maxLength: number) => {
    if (text?.length <= maxLength) {
      return text!;
    }
    return text?.substring(0, maxLength) + '...';
  };
  const getdata = async () => {
    try {
        setloading(true)
      const mdata: any = await axios.post("/api/data",{Page,medname});
      console.log("mdata ", mdata.data);
      const { data,totalPages } = mdata.data;
      setMedicineData(data);
      setTotalPages(totalPages)
    } catch (error: any) {
      console.log(error);
    }finally{
        setloading(false)
    }
  };
  const handlePrevPage = ()=>{
    if(Page>1){
        setPage(Page-1)
    }
  }
  const handleNextPage  = ()=>{
    if(Page<totalPages){
        setPage(Page+1);
    }
  }
  useEffect(() => {
    getalluserdetails();
    getdata();
  }, [Page]);

  const logout = async () => {
    try {
        setloading(true)
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
    }finally{
        setloading(false)
    }
  };
  return (
    !loading && 
    <div className="flex flex-col items-center justify-between w-[100vw] overflow-x-hidden">
        <div className="w-11/12 flex items-center justify-evenly text-black text-2xl gap-3 mt-4 font-bold max-w-max">
            <div>
                <p>{`Hello  ${data} ,`}</p>
            </div>
            <div>
                <p>Welcome to Medler</p>
            </div>
            <div className="w-full h-full"> 
<form className="max-w-md mx-auto"
onSubmit={handlesearch}
>   
    <label htmlFor="default-search"
     className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="text"
        name="medname"
        value={medname}
        onChange={(e)=> setMedname(e.target.value)} 
        id="default-search"
         className="block w-full p-4 ps-10 text-sm text-gray-900 border
         border-gray-300 rounded-lg bg-gray-50
          focus:ring-blue-500 focus:border-blue-500
           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Medicines..." required />
        <button type="submit" 
        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 
        focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2
         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>

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
                            <img src={firstImage} loading="lazy" alt={item.Medicine_Name}
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
                                <Link href={item.Medicine_Link}>
                                <Button variant={"destructive"}>
                                Buy
                            </Button>
                                </Link>
                           
                                </div>
                        </div>
                )
               

})
        }

       </div>

       <div className="flex gap-3 w-full h-full items-center justify-center overflow-hidden">
        <div>
            <Button onClick={handlePrevPage}>
                Previous
            </Button>
        </div>
        <div>
            {`Page ${Page} of ${totalPages}`}
        </div>
        <div>
            <Button onClick={handleNextPage}>
                Next
            </Button>
        </div>
       
       </div>

    </div>
  );
}
