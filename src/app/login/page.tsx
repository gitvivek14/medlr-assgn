"use client"
import React,{useState,useEffect} from "react"
import axios from "axios"
import  {useRouter} from  "next/navigation"
import toast from "react-hot-toast"
import { Input } from "@/components/ui/input"

export default function Page(){
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [user,setUser] = useState({
        email:"",
        password:"",
    })
    const handleOnChange = (e:any)=>{
      setUser((prevData)=>({
          ...prevData,
          [e.target.name]:e.target.value
      }))
  }
    const [buttondisabled, setButtondisabled] = useState(false);
    const onLogin = async ()=>{
        try {
            setLoading(true)
            const response = await axios.post("api/users/login",user)
            console.log("login success");
            toast.success("login success")
            router.push("/home")
            router.forward()
            
        } catch (error:any) {
            console.log("login failed",error.message);
            toast.error(error.message)
            
        }finally{
            setLoading(false)
        }

    }
    useEffect(() => {
        if(user.email.length>0 && 
            user.password.length>0
          ){
            setButtondisabled(false)
          }else{
            setButtondisabled(true)
          }
    }, [user])
    
  return (
    <div className="flex flex-col items-center
     justify-center min-h-screen py-2 text-black">
        <h1>
            {loading ? "Processing":"Login"}
        </h1>
        <div className="z-10">
            <form className="m-6 flex w-full 
            flex-col items-center gap-y-4"
            >
                <label className="w-full">
                    <p className="mb-1 text-sm text-black">
                        Email
                    </p>
                    <Input
                    name="email"
                    className="border-gray-300 focus:border-gray-600"
                    type="email"
                    placeholder="enter email"
                    value={user.email}
                    onChange={handleOnChange}
                    />
                </label>
                <label className="w-full">
                    <p className="mb-1 text-sm text-black">
                        Password
                    </p>
                    <Input
                    name="password"
                    className="border-gray-300"
                    type="password"
                    placeholder="enter password"
                    value={user.password}
                    onChange={handleOnChange}
                    />
                </label>
                <button className="p-2 border
             border-gray-300 rounded-lg mb-4 text-black
             focus:outline-none focus:border-gray-600"
             onClick={onLogin}
             >
                {
                    buttondisabled ? "No Login":"Login"
                }
            </button>
            </form>
            </div>
    </div>
  )
}

