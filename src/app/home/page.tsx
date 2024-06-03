"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const [Page, setPage] = useState(1);
  const [loading, setloading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setdata] = useState("null");
  const [sort, setSort] = useState("");
  const [minPrice, setMinPrice] = useState<number | string>("");
  const [maxPrice, setMaxPrice] = useState<number | string>("");
  const [manufacturer, setManufacturer] = useState("");
  const [medname, setMedname] = useState("");
  const [MedicineData, setMedicineData] = useState([]);
  const getalluserdetails = async () => {
    try {
      const userdata = await axios.get("/api/users/me");
      console.log(userdata.data.data._id);
      setdata(userdata.data.data._id);
    } catch (error: any) {
      console.log(error);
    }
  };
  const handlesearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    getdata();
  };
  const truncateText = (text: string, maxLength: number) => {
    if (text?.length <= maxLength) {
      return text!;
    }
    return text?.substring(0, maxLength) + "...";
  };
  const getdata = async () => {
    try {
      setloading(true);
      const mdata: any = await axios.post("/api/data", {
        Page,
        medname,
        minPrice: minPrice !== "" ? parseFloat(minPrice as string) : undefined,
        maxPrice: maxPrice !== "" ? parseFloat(maxPrice as string) : undefined,
        manufacturer,
        sort,
      });
      console.log("mdata ", mdata.data);
      const { data, totalPages } = mdata.data;
      setMedicineData(data);
      setTotalPages(totalPages);
    } catch (error: any) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  const handlePrevPage = () => {
    if (Page > 1) {
      setPage(Page - 1);
    }
  };
  const handleNextPage = () => {
    if (Page < totalPages) {
      setPage(Page + 1);
    }
  };
  useEffect(() => {
    getalluserdetails();
    getdata();
  }, [Page]);

  const logout = async () => {
    try {
      setloading(true);
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
    } finally {
      setloading(false);
    }
  };
  return (
    !loading && (
      <div className="flex flex-col items-center justify-between w-[100vw] overflow-x-hidden">
        <div className="w-full flex items-center justify-evenly text-black text-2xl gap-3 mt-4 flex-wrap font-bold max-w-max">
          <div>
            <p>{`Hello,`}</p>
          </div>
          <div>
            <p>Welcome to Medler</p>
          </div>
          <div className="w-full h-full">
            <form className="max-w-sm mx-auto" onSubmit={handlesearch}>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="medname"
                  value={medname}
                  onChange={(e) => setMedname(e.target.value)}
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border
         border-gray-300 rounded-lg bg-gray-50
          focus:ring-blue-500 focus:border-blue-500
           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Medicines..."
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 
        focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2
         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          <div className="mb-2">
            <form onSubmit={handlesearch}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                <div className="flex flex-col">
                  <input
                    type="text"
                    id="name"
                    placeholder="Manufacturer"
                    name="manufacturer"
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                    className="mt-2 block w-full rounded-md border border-gray-100
             bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>

                <div className="flex flex-col">
                  {/* <label htmlFor="date" className="text-sm font-medium text-stone-600">Min Price</label> */}
                  <input
                    type="number"
                    name="minPrice"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="mt-2 cursor-pointer rounded-md border
             border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none
              focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="flex flex-col">
                  {/* <label htmlFor="date" className="text-sm font-medium text-stone-600">Max Price</label> */}
                  <input
                    type="number"
                    name="maxPrice"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="mt-2 block w-full cursor-pointer
             rounded-md border
             border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none
              focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    placeholder="Max Price"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <select
                    name="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="mt-2 block w-full cursor-pointer
             rounded-md border
             border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none
              focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option value="">Sort By</option>
                    <option value="price_asc">Price - Low to High</option>
                    <option value="price_desc">Price - High to Low</option>
                    <option value="name_asc">Name - A to Z</option>
                    <option value="name_desc">Name - Z to A</option>
                  </select>
                </div>
                <div className="mt-2 rounded-md">
                  <Button type="submit">Apply Filter</Button>
                </div>
              </div>
              {/* <div className="relative w-full max-w-sm">
                    <svg className="absolute top-1/2 -translate-y-1/2 left-4 z-50" width="20" height="20"
                        viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16.5555 3.33203H3.44463C2.46273 3.33203 1.66675 4.12802 1.66675 5.10991C1.66675 5.56785 1.84345 6.00813 2.16004 6.33901L6.83697 11.2271C6.97021 11.3664 7.03684 11.436 7.0974 11.5068C7.57207 12.062 7.85127 12.7576 7.89207 13.4869C7.89728 13.5799 7.89728 13.6763 7.89728 13.869V16.251C7.89728 17.6854 9.30176 18.6988 10.663 18.2466C11.5227 17.961 12.1029 17.157 12.1029 16.251V14.2772C12.1029 13.6825 12.1029 13.3852 12.1523 13.1015C12.2323 12.6415 12.4081 12.2035 12.6683 11.8158C12.8287 11.5767 13.0342 11.3619 13.4454 10.9322L17.8401 6.33901C18.1567 6.00813 18.3334 5.56785 18.3334 5.10991C18.3334 4.12802 17.5374 3.33203 16.5555 3.33203Z"
                            stroke="black" stroke-width="1.6" stroke-linecap="round" />
                    </svg>
                    <select id="Offer"
                        className="h-12 border border-gray-300 text-gray-900 pl-11 text-base font-normal leading-7 rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50">
                        <option selected>Sort </option>
                        <option value="option 1">option 1</option>
                        <option value="option 2">option 2</option>
                        <option value="option 3">option 3</option>
                        <option value="option 4">option 4</option>
                    </select>
                    <svg className="absolute top-1/2 -translate-y-1/2 right-4 z-50" width="16" height="16"
                        viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609" stroke="#111827" stroke-width="1.6"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div> */}
            </form>
          </div>
        </div>
        <div
          className="flex items-center justify-evenly w-full h-full 
       flex-wrap flex-auto gap-4 p-4 max-w-max"
        >
          {MedicineData.map((item: any, idx: any) => {
            const imagesArray = item.Images?.split(",");
            const firstImage = imagesArray?.find((img: string) =>
              img.endsWith(".jpg")
            );
            const truncatedDescription = truncateText(
              item.Cluster_Description!,
              50
            );

            return (
              <div
                className="w-[400px] h-[400px] flex flex-col 
                    items-center justify-start 
                    rounded-lg border border-gray-200 p-3 max-w-sm shadow-md hover:bg-gray-400 aspect-square "
                key={idx}
              >
                <div>
                  <Image
                    src={firstImage}
                    loading="lazy"
                    alt={item.Medicine_Name}
                    width={60}
                    height={60}
                  ></Image>
                </div>
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="text-md font-semibold">
                    <p>{item.Medicine_Name}</p>
                  </div>
                  <div className="text-sm font-light">
                    <p>{truncatedDescription}</p>
                  </div>
                </div>
                <div className="w-full flex items-center justify-between gap-3">
                  <div className="font-bold">
                    {`Price : ₹ ${item.Discounted_Price}`}
                  </div>
                  <div className="text-sm font-medium flex flex-col items-end justify-end">
                    <div className="text-sm italic">Manufactured By : -</div>
                    {item.Manufacturer}
                  </div>
                </div>

                <div className="w-full mt-3">
                  <Link href={item.Medicine_Link}>
                    <Button variant={"destructive"}>Buy</Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3 w-full h-full items-center justify-center overflow-hidden">
          <div>
            <Button onClick={handlePrevPage}>Previous</Button>
          </div>
          <div>{`Page ${Page} of ${totalPages}`}</div>
          <div>
            <Button onClick={handleNextPage}>Next</Button>
          </div>
        </div>
      </div>
    )
  );
}
