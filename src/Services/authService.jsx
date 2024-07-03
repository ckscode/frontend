import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_API_URL;

export const registerUser = async(userData) =>{
    try{
        console.log(BACKEND_URL)
       const response = await axios.post(`${BACKEND_URL}/api/users/register`,
        userData,{withCredentials:true})

        if(response.statusText === "OK"){
            toast.success("User Registered successfully")
        }
        return response.data
    }catch(error){
      toast.error(error) 
    }
}