import React, { useEffect } from 'react';
import useRedirectLoggedOutUser from '../../CustomHook/useRedirectLoggedOutUser';
import AddProduct from '../AddProduct/AddProduct';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { getProducts } from '../../redux/features/Product/ProductSlice';
import ProductList from '../../Components/Product/ProductList/ProductList';

const Dashboard = () => {
    useRedirectLoggedOutUser('/login')
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const {products,isLoading,isError,message} = useSelector((state)=> state.product)


    useEffect(()=>{
     if(isLoggedIn === true){
        dispatch(getProducts())
     }
    

     if(isError){
        console.log(message)
     }
    },[isLoggedIn,isError,message,dispatch])
    return (
        <div>
            Dashboard
            <ProductList products={products.data} isLoading={isLoading}/>
        </div>
    );
};

export default Dashboard;