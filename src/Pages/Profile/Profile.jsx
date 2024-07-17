import React, { useEffect, useState } from 'react';
import useRedirectLoggedOutUser from '../../CustomHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../Services/authService';
import { selectUser, SET_NAME, SET_USER } from '../../redux/features/auth/authSlice';
import Loader from '../../Components/Loader/Loader';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
    useRedirectLoggedOutUser('/login');
   
    const [isLoading,setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const profile = useSelector(selectUser); 
    const navigate = useNavigate(); 

    useEffect(()=>{
        setIsLoading(true)
        async function getUserData(){
            const data = await getUserProfile();
            console.log(data)
           
            await dispatch(SET_USER(data.data));
            await dispatch(SET_NAME(data.data.name))
            setIsLoading(false)
            
        }
        getUserData()
    },[dispatch])
   console.log(profile)
    return (
        <div className='row'>
            {isLoading && <Loader/>}
                 
            <div className="card bg-white shadow border-0 rounded-2 col-sm-12 col-md-8 ">
                <div className='row'>
                <div className="col-sm-12 col-xl-6">
                <img className="w-100" src={profile.photo} alt="profile picture"/>
                </div>
                <div className="col-sm-12 col-xl-6 py-2 h-100">
                <hr className='my-2 me-2'/>
                <h5 ><span className='fw-bold'>Name</span> : <span className='fw-light'>{profile.name}</span></h5>
                <hr className='my-2 me-2'/>
                <h5 ><span className='fw-bold'>Email</span> : <span className='fw-light'>{profile.email}</span></h5>
                <hr className='my-2 me-2'/>
                <h5><span className='fw-bold'>Phone</span> : <span className='fw-light'>{profile.contact?profile.contact:'--'}</span></h5>
                <hr className='my-2 me-2'/>
                <h5><span className='fw-bold'>Bio</span> : <span className='fw-light'>{profile.bio?profile.bio:'--'}</span></h5>
                <button className='btn btn-primary mt-2' onClick={()=>navigate('/edit-profile')}>Edit Profile</button>
                  </div>
                  </div>
          </div>
 
        </div>
    );
};

export default Profile;