import React from 'react';
import { AuthContainer, AuthPage } from './auth';
import { Link } from 'react-router-dom';
import { BsArrowLeftCircle } from "react-icons/bs";

const Register = () => {
    return (
      <AuthPage>
      <AuthContainer>
     
        <h1 className="mb-4 fw-bold text-center">Register</h1>
        <form>
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
              required
            />
           
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
              required
            />
           
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
                required
            />
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
                required
            />
          </div>
          <button type="submit" className="btn btn-primary mb-3 rounded-5 w-100">
            Register
          </button>
          <br/>
        </form>
          <p className="text-center">Already have an account? <Link className='text-decoration-none' to='/login'>Login</Link></p>
          <Link className='text-decoration-none position-absolute fixed-top back' to='/'> <BsArrowLeftCircle className="back"/></Link>
      </AuthContainer>
    </AuthPage>
    );
};

export default Register;