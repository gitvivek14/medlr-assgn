"use client"
import React,{useState,useEffect} from "react"
import axios from "axios"
import  {useRouter} from  "next/navigation"
import toast from "react-hot-toast"


export default function page(){
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [user,setUser] = useState({
        email:"",
        password:"",
    })
    const [buttondisabled, setButtondisabled] = useState(false);
    const onLogin = async ()=>{
        try {
            setLoading(true)
            const response = await axios.post("api/users/login",user)
            console.log("login success");
            toast.success("login success")
            router.push("/profile")
            
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
     justify-center min-h-screen py-2">
        <h1>
            {loading ? "Processing":"Login"}
        </h1>
    </div>
  )
}

