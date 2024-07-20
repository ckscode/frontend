import React from "react";
import ProductForm from "../../Components/Product/ProductForm/ProductForm";
import useRedirectLoggedOutUser from "../../CustomHook/useRedirectLoggedOutUser";

const AddProduct = () => {
  useRedirectLoggedOutUser("/");
  return (
    <div>
      <h1>Add New Product</h1>
      <ProductForm />
    </div>
  );
};

export default AddProduct;
