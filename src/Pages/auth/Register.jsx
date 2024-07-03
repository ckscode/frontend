import React, { useState } from 'react';
import { AuthContainer, AuthPage } from './auth';
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowLeftCircle } from "react-icons/bs";
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { registerUser } from '../../Services/authService.jsx';
import { useDispatch } from 'react-redux';
import { SET_USER,SET_NAME, SET_LOGIN } from '../../redux/features/auth/authSlice.jsx';
import Loader from '../../Components/Loader/Loader.jsx';


const Register = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const passwordCriteria = {
    lowercase: { regex: /(?=.*[a-z])/, message: 'at least one lowercase letter' },
    uppercase: { regex: /(?=.*[A-Z])/, message: 'at least one uppercase letter' },
    digit: { regex: /(?=.*\d)/, message: 'at least one digit' },
    specialChar: { regex: /(?=.*[@$!%*?&])/, message: 'at least one special character (@$!%*?&)' },
    minLength: { regex: /.{8,}/, message: 'a minimum length of 8 characters' },
  };
  
  const passwordValidation = Yup.string()
    .test('password-strength', 'Password does not meet criteria', function (value) {
      const missingCriteria = [];
      Object.values(passwordCriteria).forEach(({ regex, message }) => {
        if (!regex.test(value || '')) {
          missingCriteria.push(message);
        }
      });
      if (missingCriteria.length) {
        return this.createError({
          message: `Password is weak. Missing criteria: ${missingCriteria.join(', ')}`,
        });
      }
      return true;
    });

  const validationSchema = Yup.object().shape({
    name:Yup.string().required('Name is required'),
    email:Yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Give a valid Email").required('Please fill the Email'),
    password:passwordValidation,
    confirmPassword:Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  })

   const formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      confirmPassword:""
    },
    validationSchema,
    onSubmit:async(values) =>{
      try{
        setIsLoading(true)
        const data = await registerUser(values);
        console.log(data);
        await dispatch(SET_LOGIN(true))
        await dispatch(SET_NAME(data.name))
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
        <h1 className="mb-4 fw-bold text-center">Register</h1>
        <form onSubmit={formik.handleSubmit}>
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
          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
               name="confirmPassword"
                placeholder="Confirm Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                
            />             {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <label className='error text-danger'><small>{formik.errors.confirmPassword}</small></label>
             ) : null}
          </div>
          <button type="submit" disabled={formik.isSubmitting} className="btn btn-primary mb-3 rounded-5 w-100">
            Register
          </button>
          <br/>
        </form>
          <p className="text-center">Already have an account? <Link className='text-decoration-none text-primary' to='/login'>Login</Link></p>
          <Link className='text-decoration-none position-absolute fixed-top back' to='/'> <BsArrowLeftCircle className="back"/></Link>
      
      </AuthContainer>
   
    </AuthPage>
    );
};

export default Register;