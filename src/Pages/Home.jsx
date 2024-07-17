import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import logo from '../assets/saka-02.png'
const Home = () => {
    return (
        <div className='home'>
            <Navbar/>
            {/* <img style={{width:'200px'}} src={logo} alt='...'/> */}
            <h1 >Inventory<span className='fw-light'>App</span></h1>
        </div>
    );
};

export default Home;