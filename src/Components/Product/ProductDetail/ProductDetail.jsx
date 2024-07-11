import React, { useEffect } from 'react';
import './ProductDetail.css'
import useRedirectLoggedOutUser from '../../../CustomHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct, selectProduct } from '../../../redux/features/Product/ProductSlice';

const ProductDetail = () => {
    useRedirectLoggedOutUser('/login')
    const {id} = useParams()
    const dispatch = useDispatch();
    const product = useSelector(selectProduct);
    useEffect(()=>{
         dispatch(getProduct(id))
    },[dispatch,id])
    console.log(product)
    return (
        <div>
          Product detail  
        </div>
    );
};

export default ProductDetail;