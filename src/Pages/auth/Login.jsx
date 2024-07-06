import React, { useState } from "react";
import { AuthContainer, AuthPage } from "./auth";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { SET_NAME, SET_LOGIN } from '../../redux/features/auth/authSlice.jsx';
import Loader from '../../Components/Loader/Loader.jsx';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { loginUser } from "../../Services/authService.jsx";


const Login = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
 

  const validationSchema = Yup.object().shape({
    email:Yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Give a valid Email").required('Please fill the Email'),
    password:Yup.string().required("fill the password"),
  })

   const formik = useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    validationSchema,
    onSubmit:async(values) =>{
      try{
        setIsLoading(true)
        const data = await loginUser(values);
        await dispatch(SET_LOGIN(true))
        await dispatch(SET_NAME(data.data.name))
        setIsLoading(false);
        navigate("/dashboard");
      }catch(error){
           setIsLoading(false)  
           toast.error(error)
      }
    }
   })
  return (
    <AuthPage>
      <AuthContainer>
      {isLoading && <Loader/>}
        <h1 className="mb-4 fw-bold text-center">Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
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
         <label className='error text-danger'><small>{formik.errors.email}</small></label>
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
         <label className='error text-danger'><small>{formik.errors.password}</small></label>
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
          <button type="submit" disabled={formik.isSubmitting} className="btn btn-primary mb-3 rounded-5 w-100">
            Login
          </button>
          <br/>
        </form>
        <div className="mb-3 text-center">
          <Link className='text-decoration-none text-primary' to='/forgot' >Forgot Password?</Link>
          </div>
          <p className="text-center">Don't have an account? <Link className='text-decoration-none text-primary' to='/register'>Register</Link></p>
          <Link className='text-decoration-none position-absolute fixed-top back' to='/'> <BsArrowLeftCircle className="back"/></Link>
      </AuthContainer>
    </AuthPage>
  );
};

export default Login;
