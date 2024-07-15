import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_API_URL;

export const registerUser = async(userData) =>{
    try{
       const response = await axios.post(`${BACKEND_URL}/api/users/register`,
        userData,{withCredentials:true})

        if(response.statusText === "OK"){
            toast.success("User Registered successfully")
        }
        return response.data
    }catch(error){
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message) 
    }
}

export const loginUser = async(userData) =>{
    try{
       const response = await axios.post(`${BACKEND_URL}/api/users/login`,
        userData,
        {headers:{
            'Content-Type': 'application/json',
        }})

        if(response.statusText === "OK"){
            toast.success("Logged in successfully")
        }
        return response.data
    }catch(error){
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message) 
    }
}

export const logoutUser = async() =>{
    try{
        const response = await axios.get(`${BACKEND_URL}/api/users/logout`);
         if(response.statusText === "OK"){
             toast.success("Logged Out!")
         }
         return response.data
     }catch(error){
         const message =
         (error.response && error.response.data && error.response.data.message) ||
         error.message ||
         error.toString();
       toast.error(message) 
     }
}


export const forgotPassword = async(email) =>{
    try{
        const response = await axios.post(`${BACKEND_URL}/api/users/forgotPassword`,email);
         if(response.statusText === "OK"){
             toast.success(response.data.message)
         }
         return response.data
     }catch(error){
         const message =
         (error.response && error.response.data && error.response.data.message) ||
         error.message ||
         error.toString();
       toast.error(message) 
     }
}


export const resetPassword = async(userData,resetToken) =>{
    try{
        const response = await axios.put(`${BACKEND_URL}/api/users/resetPassword/${resetToken}`,userData);
         if(response.statusText === "OK"){
             toast.success(response.data.message)
         }
         return response.data
     }catch(error){
         const message =
         (error.response && error.response.data && error.response.data.message) ||
         error.message ||
         error.toString();
       toast.error(message) 
     }
}

export const changePassword = async(formData) =>{
    try{
        const response = await axios.put(`${BACKEND_URL}/api/users/updatePassword`,formData);
         if(response.statusText === "OK"){
             toast.success(response.data.message)
         }
         return response.data
     }catch(error){
         const message =
         (error.response && error.response.data && error.response.data.message) ||
         error.message ||
         error.toString();
       toast.error(message) 
     }
}


export const getLoginStatus = async() =>{
    try{
        const response = await axios.get(`${BACKEND_URL}/api/users/loginStatus`);
         return response.data
     }catch(error){
         const message =
         (error.response && error.response.data && error.response.data.message) ||
         error.message ||
         error.toString();
       toast.error(message) 
     }
}


//get user
export const getUserProfile = async() =>{
    try{
        const response = await axios.get(`${BACKEND_URL}/api/users/getUser`);
         return response.data
     }catch(error){
         const message =
         (error.response && error.response.data && error.response.data.message) ||
         error.message ||
         error.toString();
       toast.error(message) 
     }
}


//update user
export const UpdateUser = async(formData) =>{
    try{
        const response = await axios.put(`${BACKEND_URL}/api/users/UpdateUser`,formData);
         return response.data
     }catch(error){
         const message =
         (error.response && error.response.data && error.response.data.message) ||
         error.message ||
         error.toString();
       toast.error(message) 
     }
}