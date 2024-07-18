import React, { useEffect } from 'react';
import './ProductSummary.css';
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from '../../InfoBox/InfoBox';
import { useDispatch, useSelector } from 'react-redux';
import {  CALC_CATEGORY, CALC_OUTOFSTOCK, CALC_STORE_VALUE, CAlC_TODELIVER, selectOutOfStock, selectToBeDelivered, selectTotalStoreValue, selectUniqueCategory } from '../../../redux/features/Product/ProductSlice';
import { TbCoinRupeeFilled, TbTruckDelivery } from 'react-icons/tb';


//Icons
const earningIcon = <TbCoinRupeeFilled size={40} />
{/* <AiFillDollarCircle /> */}
const productIcon = <BsCart4 size={40} />
const categoryIcon = <BiCategory size={40} />
const toBeDeliveredIcon = <TbTruckDelivery size={40} color="var(--color-success)"/>
const outOfStockIcon = <BsCartX size={40} color="var(--color-danger)" />

const ProductSummary = ({products}) => {
    const dispatch = useDispatch();
    const totalStoreValue = useSelector(selectTotalStoreValue);
    const outOfStock = useSelector(selectOutOfStock);
    const totalCategory = useSelector(selectUniqueCategory);
    const toBeDelivered = useSelector(selectToBeDelivered);

    //format amount
     const formatNumbers = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };

    useEffect(()=>{
        if(products){
            dispatch(CALC_STORE_VALUE(products));
            dispatch(CALC_OUTOFSTOCK(products));
            dispatch(CALC_CATEGORY(products));
            dispatch(CAlC_TODELIVER(products));
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
             count={`₹${formatNumbers(totalStoreValue.toFixed(2))}`} 
             bgColor="card2"/>

             
            <InfoBox
             icon={outOfStockIcon} 
             title={"Out of Stock"} 
             count={outOfStock} 
             bgColor="card3"/>

             
            <InfoBox
             icon={toBeDeliveredIcon} 
             title={"To Be Delivered"} 
             count={toBeDelivered} 
             bgColor="card4"/>
           </div>
        </div>
    );
};

export default ProductSummary;