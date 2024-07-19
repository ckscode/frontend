import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct, getProducts, selectIsLoading, selectProduct, updateProduct } from '../../redux/features/Product/ProductSlice';
import { FormContainer, ImagePreview } from '../../Components/Product/ProductForm/Form.styled';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loader from '../../Components/Loader/Loader';
import useRedirectLoggedOutUser from '../../CustomHook/useRedirectLoggedOutUser';

const EditProduct = () => {
  useRedirectLoggedOutUser('/')
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(selectIsLoading);
    const productEdit = useSelector(selectProduct);
    const [imagePreview,setImagePreview]=useState(null);
    const [deli, setDeli] = useState(false);
    const handleDelivery = (e) => {
      const value = e === "true" ? true : false;
      setDeli(value);
    };

    const getFormattedDate = () => {
      const date = new Date();
    
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns month from 0-11
      const year = date.getFullYear();
    
      return `${year}-${month}-${day}`;
    };
 
    useEffect(()=>{
        dispatch(getProduct(id));  
      
    },[dispatch,id])
   
    useEffect(()=>{
            formik.setValues(productEdit?productEdit.data:[])
            setImagePreview(
                productEdit && productEdit.data.image ? `${productEdit.data.image.filePath}` : null
              );
              if(productEdit&&productEdit.data.delivered){
                setDeli(true)
              }
            
    },[productEdit])


    const ValidationSchema = Yup.object().shape({
        name:Yup.string().required("Enter name of product"),
        category:Yup.string().required("Enter Category of the Product"),
        quantity:Yup.string().matches(/^[0-9]*$/, 'Only non-negative numbers are allowed').required("Add Quantity"),
        price:Yup.string().required("Add Price"),
        description:Yup.string().required("Enter Description of product"),
        image:Yup.mixed().required("File is required"),
        seller: Yup.string().required("Seller Name is Required"),
        sellerAddress: Yup.string().required("Seller Address is Required"),
        pincode: Yup.string().required("Please provide Seller's Pincode"),
        delivered: Yup.boolean().required("Please Give a Delivery Status"),
        deliveryDate: Yup.date().required("Give delivery date"),
    })

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        formik.setFieldValue('image', file);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
      };

const formik = useFormik({
    initialValues:{
        name:"",
        category:"",
        quantity:"",
        price:"",
        description:"",
        image:"",
        seller: "",
        sellerAddress: "",
        pincode: "",
        delivered: false,
        deliveryDate:"",
    },
   ValidationSchema,
   onSubmit:async(values)=>{
    try{
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("category", values.category);
      formData.append("quantity", values.quantity);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("image", values.image);
      formData.append("seller", values.seller);
      formData.append(
        "sellerAddress",
        values.sellerAddress
      );
        formData.append("delivered", deli);
        formData.append("deliveryDate", values.deliveryDate);
   
  
      await dispatch(updateProduct({id,formData}));
     await dispatch(getProduct(id))
  
      navigate("/dashboard")
    }catch(error){
      console.log(error)
      toast.error(error)
 }
  
   }
})


console.log(deli)
    return (
      <div className="row">
        <h1>Edit Product</h1>
        <FormContainer className='col-sm-12 col-md-6 col-xl-4'>
             {isLoading && <Loader/>} 
            <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
            <label htmlFor="exampleInputName6" className="form-label">
              Image
            </label>
            <input
              type="file"
              className="form-control"
              id="exampleInputName6"
              name="image"
              onChange={handleImageChange}
            
            />
               {formik.touched.description && formik.errors.description ? (
         <label className='error text-danger'><small>{formik.errors.description}</small></label>
        ) : null}
           {imagePreview != null ? <div>
                    <ImagePreview src={imagePreview} alt="product"/>
           </div>:<p>No Image set for this product</p>}
          </div>
            <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              name="name"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
            
            />
               {formik.touched.name && formik.errors.name ? (
         <label className='error text-danger'><small>{formik.errors.name}</small></label>
        ) : null}
           
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputName2" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName2"
              name="category"
              placeholder="category"
              value={formik.values.category}
              onChange={formik.handleChange}
            />
               {formik.touched.category && formik.errors.category ? (
         <label className='error text-danger'><small>{formik.errors.category}</small></label>
        ) : null}
           
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputName3" className="form-label">
              Quantity
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputName3"
              name="quantity"
              placeholder="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              min="0"
            />
               {formik.touched.quantity && formik.errors.quantity ? (
         <label className='error text-danger'><small>{formik.errors.quantity}</small></label>
        ) : null}
           
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputName4" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputName4"
              name="price"
              placeholder="price"
              value={formik.values.price}
              onChange={formik.handleChange}
               min="0"
            />
               {formik.touched.price && formik.errors.price ? (
         <label className='error text-danger'><small>{formik.errors.price}</small></label>
        ) : null}
           
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputName5" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              id="exampleInputName5"
              name="description"
              placeholder="Product description"
              value={formik.values.description}
              onChange={formik.handleChange}
              style={{resize:"none"}}
            />
               {formik.touched.description && formik.errors.description ? (
         <label className='error text-danger'><small>{formik.errors.description}</small></label>
        ) : null}
           
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Seller
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              name="seller"
              placeholder="Seller Name"
              value={formik.values.seller}
              onChange={formik.handleChange}
            />
            {formik.touched.seller && formik.errors.seller ? (
              <label className="error text-danger">
                <small>{formik.errors.seller}</small>
              </label>
            ) : null}
          </div>
          {formik.values.quantity==0?<div>Already Delivered</div>:
          <>
          <div className="mb-3">
            <label htmlFor="exampleInputName5" className="form-label">
              Seller's Address
            </label>
            <textarea
              type="text"
              className="form-control"
              id="exampleInputName5"
              name="sellerAddress"
              placeholder="Seller's Address"
              value={formik.values.sellerAddress}
              onChange={formik.handleChange}
              style={{ resize: "none" }}
            />
            {formik.touched.sellerAddress && formik.errors.sellerAddress ? (
              <label className="error text-danger">
                <small>{formik.errors.sellerAddress}</small>
              </label>
            ) : null}
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputName4" className="form-label">
              Delivery Status
            </label>
            <select
              onChange={(e) => {
                formik.handleChange;
                handleDelivery(e.target.value);
              }}
              name="delivered"
              className="form-select "
            >{formik.values.delivered?<>
              <option value={true}>Delivered</option>
              <option value={false}>Yet to be Delivered</option></>
            :<>
               <option value={false}>Yet to be Delivered</option>
               <option value={true}>Delivered</option></>
            }
           
            </select>
            {formik.touched.delivered && formik.errors.delivered ? (
              <label className="error text-danger">
                <small>{formik.errors.delivered}</small>
              </label>
            ) : null}
          </div>
         {deli&&
          <div className="mb-3">
          <label htmlFor="exampleInputName4" className="form-label">
            Date of Delivery
          </label>
          <input
            type="date"
            className="form-control"
            id="exampleInputName4"
            name="deliveryDate"
            value={formik.values.deliveryDate}
            onChange={formik.handleChange}
            required
          />
          {formik.touched.deliveryDate && formik.errors.deliveryDate ? (
            <label className="error text-danger">
              <small>{formik.errors.deliveryDate}</small>
            </label>
          ) : null}
        </div>} </>}
          
           
          
          <button type='submit'  className='btn btn-success'>Save Changes</button>
            </form>
        </FormContainer>  
        </div> 
    );
};

export default EditProduct;