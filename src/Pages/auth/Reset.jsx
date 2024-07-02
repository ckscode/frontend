import React from 'react';
import { AuthContainer, AuthPage } from "./auth";
import { Link } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";

const Reset = () => {
    return (
        <AuthPage>
        <AuthContainer>
       
          <h2 className="mb-4 fw-bold text-center">Reset Password</h2>
          <form>
          <div className="mb-3">
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
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
               name="newPassword"
                placeholder="Confirm New Password"
                required
            />
          </div>
            <button type="submit" className="btn btn-primary mb-3 rounded-5 w-100">
              Reset Password
            </button>
            <br/>
          </form>
            <p className="text-center"><Link className='text-decoration-none' to='/login'>Login</Link></p>
            <Link className='text-decoration-none position-absolute fixed-top back' to='/'> <BsArrowLeftCircle className="back"/></Link>
        </AuthContainer>
      </AuthPage>
    );
};

export default Reset;