import React from 'react';
import './InfoBox.css';

const InfoBox = ({bgColor,title,count,icon}) => {
    return (
        <div className={`info-box ${bgColor}`}>
           <span className='info-icon '>{icon}</span>
           <span>
            <p className={`mb-1`}>{title}</p>
            <h4 >{count}</h4>
           </span>
        </div>
    );
};

export default InfoBox;