import React from 'react';
import "./Loader.css"
const Loader = () => {
    return (
        <div className='loader'>
             <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
           </div>
        </div>
       
    );
};

export const Loader2 = () =>{
    return (
        <div className='loader2'>
             <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
           </div>
        </div>
       
    );
}

export default Loader;