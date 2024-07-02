import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='p-2 d-flex justify-content-end shadow-sm'>
          <h3 className='me-4'>Siddhaarthan</h3>
          <Link className="btn btn-primary" type="submit" to="/">Logout</Link>
        </div>
    );
};

export default Header;