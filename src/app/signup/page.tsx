"use client"
import React,{useState,useEffect} from "react"
import axios from "axios"
import  {useRouter} from  "next/navigation"
import toast from "react-hot-toast"
import { Input } from "@/components/ui/input"
export default function signup(){
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [user,setUser] = useState({
        email:"",
        password:"",
        username:""
    })
    const handleOnChange = (e:any)=>{
        setUser((prevData)=>({
            ...prevData,
            [e.target.name]:e.target.value
        }))
    }
    const [buttondisabled, setButtondisabled] = useState(false);
    useEffect(() => {
      if(user.email.length>0 && 
        user.password.length>0 &&
        user.username.length>0
      ){
        setButtondisabled(false)
      }else{
        setButtondisabled(true)
      }
    }, [user])
    
    const onSignup = async ()=>{
        try {
            setLoading(true)
            const resp = await axios.post("api/users/signup",user)
            console.log("signup response",resp.data);
            router.push("/login",{scroll:false});
        } catch (error:any) {
            console.log("signup failed",error.message);
            toast.error(error.message)
        }finally{
            setLoading(false)
        }

    }
    return(
        <div className="flex flex-col items-center
        justify-center min-h-screen py-2 bg-black">
            <div className="z-10">
            <form className="m-6 flex w-full 
            flex-col items-center gap-y-4"
            >
                <label className="w-full">
                    <p className="mb-1 text-sm text-white">
                        Username
                    </p>
                    <Input
                    name="username"
                    className="border-gray-300"
                    type="text"
                    placeholder="enter username"
                    value={user.username}
                    onChange={handleOnChange}
                    />
                </label>
                <label className="w-full">
                    <p className="mb-1 text-sm text-white">
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
                    <p className="mb-1 text-sm text-white">
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
             border-gray-300 rounded-lg mb-4 text-white
             focus:outline-none focus:border-gray-600"
             onClick={onSignup}
             >
                {
                    buttondisabled ? "No Signup":"Signup"
                }
            </button>
            </form>
            </div>
            
        </div>
    )
}