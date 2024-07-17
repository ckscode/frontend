import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserProfile, logoutUser } from '../../Services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { SET_LOGIN,  SET_USER,  selectName, selectUser } from '../../redux/features/auth/authSlice';
import './Header.css';
import { PiSignOutThin } from 'react-icons/pi';

const Header = ({tab,setTab}) => {
  const navigate = useNavigate();
   const dispatch = useDispatch();
   const name = useSelector(selectName);
  const profile = useSelector(selectUser); 
  const logout = async() =>{
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate('/');
  }
  useEffect(()=>{
    async function getUserData(){
        const data = await getUserProfile();
        await dispatch(SET_USER(data.data));    
    }
    getUserData()
},[dispatch])

    return (
        <div className='header p-2 d-flex justify-content-end shadow-sm'>
          {/* <h3 >Welcome,<span style={{color:'var(--light-blue)'}}>{name}</span></h3> */}
          {/* <Link className="btn btn-primary" type="submit" onClick={logout} >Logout</Link> */}
          <img className='pic' src={profile&&profile.photo} alt='' onClick={(e)=>{e.stopPropagation();setTab(!tab)}}/>
          {tab&& <div className='compo p-3 rounded-2'>
            <h6 className='m-0 mb-2'>Profile</h6>
           <div className='bg-light rounded-2 p-2 d-flex w-100'>
                <div className='p-0 '>
                <img className='pic me-2' style={{width:'3.7rem'}} src={profile?profile.photo:''} alt=''/>
                </div>
                <div >
                  <h6 className='ms-2 mb-0'>{name}</h6>
                  <p className='ms-2 mb-0 text-muted'><small>{profile.email}</small></p>
                  <Link className="btn btn-outline-dark ms-2 mt-2"  to='/edit-profile' >Edit Profile</Link>
                </div>
            </div>
            <hr className='mb-3' style={{border:'none',height:'0.2px',backgroundColor:'grey'}}/>
            <span className='d-inline align-items-center bg-light p-2 rounded-2 cursor-pointer logout'>
            <PiSignOutThin className='me-2' color={"black"}/>
            <Link  type="submit" onClick={logout} >Sign Out</Link>
            </span>
          </div>}
        </div>
    );
};

export default Header;