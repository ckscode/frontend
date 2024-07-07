import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
// import "./Layout.css"
import Dashboard from '../../Pages/Dashboard/Dashboard';

const Layout = ({children}) => {
    return (
       <div className="layout1">
       <Header/>
          <div className="content">
           {children}
          </div>
       <Footer/>
       </div>
    );
};

export default Layout;