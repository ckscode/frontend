import React, { useEffect } from "react";
import "./ProductDetail.css";
import useRedirectLoggedOutUser from "../../../CustomHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getProduct,
  selectProduct,
} from "../../../redux/features/Product/ProductSlice";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import Loader from "../../Loader/Loader";
import { FormContainer } from "../ProductForm/Form.styled";

const ProductDetail = () => {
  useRedirectLoggedOutUser("/");
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
    }

    if (isError) {
      console.log(message)
      toast.error(message);
    }
  }, [isLoggedIn, isError, message, dispatch, id]);

  const getDate = (e) => {
    const arr = e.split("-");
    const revArr = arr.reverse();
    const result = revArr.join("-");
    return result;
  };
  return (
    <div >
      {isLoading && <Loader />}
      <h1 className="mt-3 row">Product detail </h1>
     
      <div className="card col-sm-12 col-md-9 col-lg-7 col-xl-5 shadow-sm">
        {product !== null && product.data.image ? (
          <img src={product.data.image.filePath} alt="image" />
        ) : (
          <p>No image for this product</p>
        )}
        <h4 className="mt-3">
          {product && product.data.quantity == 0 ? (
            <span style={{ color: "var(--color-danger)" }}>Out of Stock</span>
          ) : product && product.data.delivered ? (
            <span style={{ color: "var(--color-success)" }}>In Stock</span>
          ) : (
            <span style={{ color: "var(--color-primary)" }}>
              Yet To Be Delivered
            </span>
          )}
        </h4>
        <h3>{product ? product.data.name : ""}</h3>
        <p>
          <span className="fw-bold">Category -</span>{" "}
          <span>{product && product.data.category}</span>
        </p>
        <p>
          <span className="fw-bold">Price -</span>{" "}
          <span>{product && product.data.price}</span>
        </p>
        <p>
          <span className="fw-bold">Quantity in Stock :</span>{" "}
          <span>{product && product.data.quantity}</span>
        </p>
        <p>
          <span className="fw-bold">Description -</span> <br />
          <span>{product && product.data.description}</span>
        </p>
        <p>
          <span className="fw-bold">Seller :</span>{" "}
          <span>{product && product.data.seller}</span>
        </p>
        <p>
          <span className="fw-bold">Seller Address -</span> <br />
          <span>{product && product.data.sellerAddress}</span>
        </p>
        <p>
          <span className="fw-bold">Date of Delivery :</span>{" "}
          <span>{product && getDate(product.data.deliveryDate)}</span>
        </p>
        <Link
          className="btn btn-dark mt-3 edit "
          to={`/edit-product/${product && product.data._id}`}
        >
          Edit Product
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
