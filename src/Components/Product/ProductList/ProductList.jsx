import React, { useEffect, useState } from 'react';
import "./ProductList.css";
import { Loader2 } from '../../Loader/Loader';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from '../../Search/Search';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_PRODUCTS, selectFilterProducts } from '../../../redux/features/Product/FilterSlice';
import ReactPaginate from 'react-paginate';
import { deleteProduct, getProducts } from '../../../redux/features/Product/ProductSlice';
import { useNavigate } from 'react-router-dom';

const ProductList = ({products,isLoading}) => {
    const [search,setSearch] = useState("");
    const filteredProducts = useSelector(selectFilterProducts);
    const dispatch = useDispatch();
    const [del,setDel] = useState(false);
    const [deleteId,setDeleteId] = useState('');
    const navigate = useNavigate();

const confirmDelete = async(id) =>{
   await dispatch(deleteProduct(id));
   await dispatch(getProducts());
    setDel(false);
}

    //begin pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 7;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
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
            {!isLoading &&filteredProducts?(
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
                        {currentItems.map((item,index)=>{
                           return( <tr key={item._id}>
                             <td>{index+1}</td>
                             <td>{shortenText(item.name,25)}</td>
                             <td>{item.category}</td>
                             <td>{item.quantity}{!item.delivered&&<span className='noti bg-primary text-light'>Yet to Deliver</span>}{item.quantity==0&&<span className='noti bg-danger text-light'>Out Of Stock</span>}</td>
                             <td>₹{item.price}</td>
                             <td>₹{item.price * item.quantity}</td>
                             <td className='icons'>
                                <span>
                                    <AiOutlineEye size={24} onClick={()=>{navigate(`/product-detail/${item._id}`)}}  color={"green"}/>
                                </span>
                                <span>
                                    <FaEdit size={20} onClick={()=>{navigate(`/edit-product/${item._id}`)}}  color={"var(--light-blue)"}/>
                                </span>
                                <span>
                                    <FaTrashAlt size={20} onClick={()=>{setDeleteId(item._id);setDel(true);}}  className='text-danger'/>
                                </span>
                             </td>
                           </tr>)
                        })}
                    </tbody>
                </table>
            ):(<p>No Products found</p>)}
           </div>
                   <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
        {del&&
         <div className='delete'>
         <div className='deleteModal rounded-3 shadow-lg w-25 p-4'>
             <h3>Are You sure,you want to delete the Product?</h3>
             <div >
                 <button onClick={()=>{confirmDelete(deleteId)}} className='btn btn-danger me-2 py-1'>Delete</button>
                 <button onClick={()=>{setDel(false);setDeleteId('')}} className='btn btn-dark py-1'>Cancel</button>
             </div>
         </div>
     </div>}
       
        </div>
        </div>
    );
};

export default ProductList;