import React from "react";
import { AuthContainer, AuthPage } from "./auth";
import { Link } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";

const Login = () => {
  return (
    <AuthPage>
      <AuthContainer>
     
        <h1 className="mb-4 fw-bold text-center">Login</h1>
        <form>
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
          <button type="submit" className="btn btn-primary mb-3 rounded-5 w-100">
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
