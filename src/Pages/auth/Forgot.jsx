import React from 'react';
import { AuthContainer, AuthPage } from "./auth";
import { Link } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";

const Forgot = () => {
    return (
        <AuthPage>
        <AuthContainer>
       
          <h2 className="mb-4 fw-bold text-center">Forgot Password</h2>
          <form>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                name="email"
                placeholder="Email"
                required
              />
             
            </div>
            <button type="submit" className="btn btn-primary mb-3 rounded-5 w-100">
              Get Reset Email
            </button>
            <br/>
          </form>
            <p className="text-center"><Link className='text-decoration-none' to='/login'>Login</Link></p>
            <Link className='text-decoration-none position-absolute fixed-top back' to='/'> <BsArrowLeftCircle className="back"/></Link>
        </AuthContainer>
      </AuthPage>
    );
};

export default Forgot;