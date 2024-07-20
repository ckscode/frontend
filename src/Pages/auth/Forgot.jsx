import React, { useState } from "react";
import { AuthContainer, AuthPage } from "./auth";
import { Link } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";
import Loader from "../../Components/Loader/Loader.jsx";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { forgotPassword } from "../../Services/authService";
const Forgot = () => {
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Give a valid Email"
      )
      .required("Please fill the Email"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await forgotPassword(values);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error(error);
      }
    },
  });
  return (
    <AuthPage>
      <AuthContainer>
        {isLoading && <Loader />}
        <h2 className="mb-4 fw-bold text-center">Forgot Password</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email ? (
              <label className="error text-danger">
                <small>{formik.errors.email}</small>
              </label>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="btn btn-primary mb-3 rounded-5 w-100"
          >
            Get Reset Email
          </button>
          <br />
        </form>
        <p className="text-center">
          <Link className="text-decoration-none text-primary" to="/login">
            Login
          </Link>
        </p>
        <Link
          className="text-decoration-none position-absolute fixed-top back"
          to="/"
        >
          {" "}
          <BsArrowLeftCircle className="back" />
        </Link>
      </AuthContainer>
    </AuthPage>
  );
};

export default Forgot;
