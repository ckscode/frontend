import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../Services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { SET_LOGIN,  selectName } from '../../redux/features/auth/authSlice';

const Header = () => {
  const navigate = useNavigate();
   const dispatch = useDispatch();
   const name = useSelector(selectName);
  const logout = async() =>{
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate('/');
  }
 
    return (
        <div className='p-2 d-flex justify-content-end shadow-sm'>
          <h3 className='me-4'>{name}</h3>
          <Link className="btn btn-primary" type="submit" onClick={logout} >Logout</Link>
        </div>
    );
};

export default Header;