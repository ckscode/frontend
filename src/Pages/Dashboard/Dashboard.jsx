import React from 'react';
import useRedirectLoggedOutUser from '../../CustomHook/useRedirectLoggedOutUser';
import AddProduct from '../AddProduct/AddProduct';

const Dashboard = () => {
    useRedirectLoggedOutUser('/login')
    return (
        <div>
            Dashboard
        </div>
    );
};

export default Dashboard;