import React from 'react';
import './Main.css'
import Sidebar from '../../Components/Sidebar/Sidebar';
import Header from '../../Components/Header/Header';
import Layout from '../../Components/Layout/Layout';

const Main = () => {
    return (
      <div className="main">
          <Sidebar/>
          <Layout/>
      </div>
    );
};

export default Main;