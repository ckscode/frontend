import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./ProductService";
import { toast } from "react-toastify";

const initialState ={
product:null,
products:[],
isError:false,
isSuccess:false,
isLoading:false,
message:""
}

//Create New Product
export const createProduct = createAsyncThunk(
    "products/create",
    async (formData,thunkAPI) =>{
        try{
            return await productService.createProduct(formData)
        }catch(error){
            const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        console.log(message)
        return thunkAPI.rejectWithValue(message)
        }
    }
)

//get Products
export const getProducts = createAsyncThunk(
    "products/get",
    async (_,thunkAPI) =>{
        try{
            return await productService.getProducts()
        }catch(error){
            const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        console.log(message)
        return thunkAPI.rejectWithValue(message)
        }
    }
)

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
       CALC_STORE_VALUE(state,action){

       }
    },
    extraReducers:(builder)=>{
        builder.addCase(createProduct.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createProduct.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload)
            state.products.push(action.payload);
            toast.success("product added successfully")
        })
        .addCase(createProduct.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload)
        })
        .addCase(getProducts.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload)
            state.products = action.payload;
            // toast.success("product added successfully")
        })
        .addCase(getProducts.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload)
        })
    }
})

export const{CALC_STORE_VALUE} = productSlice.actions;

export const selectIsLoading = (state) => state.product.isLoading

export default productSlice.reducer;