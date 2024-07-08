import React, { useEffect, useState } from 'react';
import "./ProductList.css";
import { Loader2 } from '../../Loader/Loader';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from '../../Search/Search';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_PRODUCTS, selectFilterProducts } from '../../../redux/features/Product/FilterSlice';

const ProductList = ({products,isLoading}) => {
    const [search,setSearch] = useState("");
    const filteredProducts = useSelector(selectFilterProducts);
    const dispatch = useDispatch();
    
    //begin pagination


    //end pagination


    useEffect(()=>{
            dispatch(FILTER_PRODUCTS({products,search}));
    },[products,dispatch,search])

    const shortenText = (text,n) =>{
       if(text.length>n){
        const shortenedText = text.substring(0,n).concat("...")
        return shortenedText
       }
       return text;
    };

    return (
        <div className="product-list">
        <hr/>
        <div className='table'>
            <div className='d-flex justify-content-between align-items-center'>
                
                <h2 className='mb-0'>Inventory</h2>
                 
            <Search value={search} setSearch={setSearch}/>
               
            </div>
           {isLoading && <Loader2/>}

           <div className="table">
            {!isLoading && products?(
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Value</th>
                            <th>Options</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredProducts.map((item,index)=>{
                           return( <tr key={item._id}>
                             <td>{index+1}</td>
                             <td>{shortenText(item.name,25)}</td>
                             <td>{item.category}</td>
                             <td>{item.quantity}</td>
                             <td>{item.price}</td>
                             <td>{item.price * item.quantity}</td>
                             <td className='icons'>
                                <span>
                                    <AiOutlineEye size={24} color={"green"}/>
                                </span>
                                <span>
                                    <FaEdit size={20}  color={"var(--light-blue)"}/>
                                </span>
                                <span>
                                    <FaTrashAlt size={20}  className='text-danger'/>
                                </span>
                             </td>
                           </tr>)
                        })}
                    </tbody>
                </table>
            ):(<p>No Products found</p>)}
           </div>
        </div>
        </div>
    );
};

export default ProductList;