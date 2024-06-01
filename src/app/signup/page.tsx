"use client"
import React,{useState,useEffect} from "react"
import axios from "axios"
import  {useRouter} from  "next/navigation"
import toast from "react-hot-toast"
export default function signup(){
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [user,setUser] = useState({
        email:"",
        password:"",
        username:""
    })
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
            console.log("signup resp",resp.data);
            router.push('/login');
        } catch (error:any) {
            console.log("signup failed",error.message);
            toast.error(error.message)
        }finally{
            setLoading(false)
        }

    }
    return(
        <div className="flex flex-col items-center
        justify-center min-h-screen py-2 text-3xl">
            <button className="p-2 border
             border-gray-300 rounded-lg mb-4 
             focus:outline-none focus:border-gray-600">
                {
                    buttondisabled ? "No Signup":"Signup"
                }
            </button>
        </div>
    )
}