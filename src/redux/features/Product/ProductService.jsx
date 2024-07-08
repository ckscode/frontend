import axios from "axios";


const BACKEND_URL = process.env.REACT_APP_API_URL;


const API_URL = `${BACKEND_URL}/api/products`
//Create New Product
 const createProduct = async(formData)=>{
     const response = await axios.post(API_URL,formData)
     return response.data
};


//Get All Prodocuts
const getProducts = async()=>{
        const response = await axios.get(`${API_URL}/getAll`)
        return response.data
   };

const productService = {
        createProduct,
        getProducts
}

export default productService;