import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import logo from "../assets/saka-02.png";
import { AuthContainer, AuthPage } from "./auth/auth";
import Loader from "../Components/Loader/Loader";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SET_LOGIN, SET_NAME } from "../redux/features/auth/authSlice";
import { getLoginStatus, loginUser } from "../Services/authService";
import Footer from "../Components/Footer/Footer";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getStatus = async () => {
      const status = await getLoginStatus();
      if (status) {
        navigate("/dashboard");
      }
    };
    getStatus();
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Give a valid Email"
      )
      .required("Please fill the Email"),
    password: Yup.string().required("fill the password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const data = await loginUser(values);
        await dispatch(SET_LOGIN(true));
        await dispatch(SET_NAME(data.data.name));
        setIsLoading(false);
        navigate("/dashboard");
      } catch (error) {
        setIsLoading(false);
        toast.error(error);
      }
    },
  });
  return (
    <div className="home">
      {/* <Navbar /> */}
      {/* <img style={{width:'200px'}} src={logo} alt='...'/> */}
      <div className="w-100 cont d-flex justify-content-center align-items-center">
        <div className="w-100 row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5 col-xl-3 py-5">
            <h1 className="text-center">
              Inventory<span className="fw-light">App</span>
            </h1>
            <p className="text-center">
              "It is a basic inventory app that can be used to store and track
              the details of inventory.."
            </p>
          </div>
          <div className="col-12 col-md-6 col-lg-5 col-xl-4">
            <AuthContainer className="w-75 shadow-none home-login">
              {isLoading && <Loader />}

              <div className="text-secondary">
                <h3 className="fw-bold text-dark mb-0">Login </h3>
                <p className="mb-4">
                  <small>Fill the required details</small>
                </p>
              </div>
              <form className="home-form" onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    name="email"
                    placeholder="email address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <label className="error text-danger">
                      <small>{formik.errors.email}</small>
                    </label>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <label className="error text-danger">
                      <small>{formik.errors.password}</small>
                    </label>
                  ) : null}
                </div>
                {/* <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div> */}
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="btn btn-primary mb-3 rounded-5 w-100"
                >
                  Login
                </button>
                <br />
              </form>
              <div className="home-ques">
                <div className="mb-3 text-center">
                  <Link
                    className="text-decoration-none text-primary"
                    to="/forgot"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <p className="text-center">
                  Don't have an account?{" "}
                  <Link
                    className="text-decoration-none text-primary"
                    to="/register"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </AuthContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
