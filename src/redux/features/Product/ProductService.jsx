import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_API_URL;

const API_URL = `${BACKEND_URL}/api/products`;
//Create New Product
const createProduct = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

//Get All Prodocuts
const getProducts = async () => {
  const response = await axios.get(`${API_URL}/getAll`);
  return response.data;
};

//Delete product
const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/deleteProduct/${id}`);
  return response.data;
};

//Get Product
const getProduct = async (id) => {
  const response = await axios.get(`${API_URL}/getProduct/${id}`);
  return response.data;
};

//Update Prodocut
const updateProduct = async (id, formData) => {
  const response = await axios.put(`${API_URL}/updateProduct/${id}`, formData);
  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct,
};

export default productService;
