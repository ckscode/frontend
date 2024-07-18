import React, { useState } from "react";
import { FormContainer, ImagePreview } from "./Form.styled";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  createProduct,
  selectIsLoading,
} from "../../../redux/features/Product/ProductSlice";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";

const ProductForm = () => {
  const [product, setProduct] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deli, setDeli] = useState(false);

  const handleDelivery = (e) => {
    const value = e === "true" ? true : false;
    setDeli(value);
  };

  const generateSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const code = Date.now();
    const sku = letter + "-" + code;
    return sku;
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue("image", file);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required("Enter name of product"),
    sku: Yup.string().required("Enter Stock Keeping Unit Number"),
    category: Yup.string().required("Enter Category of the Product"),
    quantity: Yup.string().matches(/^[0-9]*$/, 'Only non-negative numbers are allowed').required("Add Quantity"),
    price: Yup.string().required("Add Price"),
    description: Yup.string().required("Enter Description of product"),
    image: Yup.mixed().required("File is required"),
    seller: Yup.string().required("Seller Name is Required"),
    sellerAddress: Yup.string().required("Seller Address is Required"),
    pincode: Yup.string().required("Please provide Seller's Pincode"),
    delivered: Yup.boolean().required("Please Give a Delivery Status"),
    deliveryDate: Yup.date().required("Give delivery date"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      sku: "",
      category: "",
      quantity: "",
      price: "",
      description: "",
      image: "",
      seller: "",
      sellerAddress: "",
      pincode: "",
      delivered: deli,
      deliveryDate: "",
    },
    ValidationSchema,
    onSubmit:async(values) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("sku", generateSKU(values.category));
        formData.append("category", values.category);
        formData.append("quantity", Number(values.quantity));
        formData.append("price", values.price);
        formData.append("description", values.description);
        formData.append("image", values.image);
        formData.append("seller", values.seller);
        formData.append(
          "sellerAddress",
          values.sellerAddress + "-" + values.pincode
        );
        formData.append("delivered", deli);
        formData.append("deliveryDate", values.deliveryDate);

        console.log(...formData);
        await dispatch(createProduct(formData));

        navigate("/dashboard");
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    },
  });
  return (
    <div className="row">
      <FormContainer className="col-sm-12 col-md-6 col-xl-4">
        {isLoading && <Loader />}
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
            {formik.touched.image && formik.errors.image ? (
              <label className="error text-danger">
                <small>{formik.errors.image}</small>
              </label>
            ) : null}
            {imagePreview != null ? (
              <div>
                <ImagePreview src={imagePreview} alt="product" />
              </div>
            ) : (
              <p>No Image set for this product</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Product Name
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
              <label className="error text-danger">
                <small>{formik.errors.name}</small>
              </label>
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
              <label className="error text-danger">
                <small>{formik.errors.category}</small>
              </label>
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
              <label className="error text-danger">
                <small>{formik.errors.quantity}</small>
              </label>
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
              <label className="error text-danger">
                <small>{formik.errors.price}</small>
              </label>
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
              style={{ resize: "none" }}
            />
            {formik.touched.description && formik.errors.description ? (
              <label className="error text-danger">
                <small>{formik.errors.description}</small>
              </label>
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
              Pincode
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputName4"
              name="pincode"
              placeholder="pincode"
              value={formik.values.pincode}
              onChange={formik.handleChange}
            />
            {formik.touched.pincode && formik.errors.pincode ? (
              <label className="error text-danger">
                <small>{formik.errors.pincode}</small>
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
            >
              <option value={false}>Yet to be Delivered</option>
              <option value={true}>Delivered</option>
            </select>
            {formik.touched.delivered && formik.errors.delivered ? (
              <label className="error text-danger">
                <small>{formik.errors.delivered}</small>
              </label>
            ) : null}
          </div>
          {deli && (
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
              />
              {formik.touched.deliveryDate && formik.errors.deliveryDate ? (
                <label className="error text-danger">
                  <small>{formik.errors.deliveryDate}</small>
                </label>
              ) : null}
            </div>
          )}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="btn btn-success"
          >
            Add Product
          </button>
        </form>
      </FormContainer>
    </div>
  );
};

export default ProductForm;
