import React, { useEffect } from 'react';
import './ProductSummary.css';
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from '../../InfoBox/InfoBox';
import { useDispatch, useSelector } from 'react-redux';
import {  CALC_CATEGORY, CALC_OUTOFSTOCK, CALC_STORE_VALUE, selectOutOfStock, selectTotalStoreValue, selectUniqueCategory } from '../../../redux/features/Product/ProductSlice';


//Icons
const earningIcon = <AiFillDollarCircle size={40} color="white" />
const productIcon = <BsCart4 size={40} color="white" />
const categoryIcon = <BiCategory size={40} color="white" />
const outOfStockIcon = <BsCartX size={40} color="white" />

const ProductSummary = ({products}) => {
    const dispatch = useDispatch();
    const totalStoreValue = useSelector(selectTotalStoreValue);
    const outOfStock = useSelector(selectOutOfStock);
    const totalCategory = useSelector(selectUniqueCategory);


    //format amount
     const formatNumbers = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };

    useEffect(()=>{
        if(products){
            dispatch(CALC_STORE_VALUE(products));
            dispatch(CALC_OUTOFSTOCK(products));
            dispatch(CALC_CATEGORY(products));
        }  
       
    },[dispatch,products])

    return (
        <div className="product-summary">
           <div className="info-summary">
            <InfoBox
             icon={productIcon} 
             title={"Total Products"} 
             count={products?products.length:null} 
             bgColor="card1"/>

            <InfoBox
             icon={earningIcon} 
             title={"Total Value"} 
             count={`${formatNumbers(totalStoreValue.toFixed(2))}`} 
             bgColor="card2"/>

             
            <InfoBox
             icon={outOfStockIcon} 
             title={"Out of Stock"} 
             count={outOfStock} 
             bgColor="card3"/>

             
            <InfoBox
             icon={categoryIcon} 
             title={"Category"} 
             count={totalCategory.length} 
             bgColor="card4"/>
           </div>
        </div>
    );
};

export default ProductSummary;