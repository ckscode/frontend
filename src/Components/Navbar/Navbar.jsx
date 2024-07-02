import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse  navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav ms-auto ">
        <Link className="btn me-2 btn-outline-primary" to='/register'>Register</Link>
        <Link className="btn btn-primary me-2" to='/login'>Login</Link>
        <Link className="btn btn-primary" to='/dashboard'>Dashboard</Link>
      </div>
    </div>
  </div>
</nav>


    );
};

export default Navbar;