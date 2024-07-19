import React, { useState } from 'react';
import './Contact.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import useRedirectLoggedOutUser from '../../CustomHook/useRedirectLoggedOutUser';

const BACKEND_URL = process.env.REACT_APP_API_URL;
const Contact = () => {
    useRedirectLoggedOutUser('/')
    const [subject,setSubject] = useState("");
    const [message,setMessage] = useState("");
    const data = {
        subject,message
    }

    const sendEmail = async(e) =>{
        e.preventDefault();
        try{
           const response = await axios.post(`${BACKEND_URL}/api/contact`,data).then((res)=>console.log(res.data));
           setSubject("");
           setMessage("");
           toast.success('Message sent')
        }catch(error){
            toast.error(error.message)
        }
    }

    return (
        <div className='contact'>
           <h3 >Contact Us</h3>
           <div className="section row">
                <form onSubmit={sendEmail}>
                    <div className='card-1 col-sm-12 col-lg-6'>
                       <label className="form-label" htmlFor="subject">Subject</label>
                       <input
                       className='form-control mb-3'
                       id='subject'
                        type='text'
                        name="subject"
                        placeholder='subject' 
                        value={subject}
                        onChange={(e)=>setSubject(e.target.value)} 
                        required/>
                         <label
                         className="form-label" 
                         htmlFor="message">Message</label>
                       <textarea
                       cols="30"
                        rows="10"
                        id="message"
                        className='form-control mb-3'
                        type='text'
                        name="message"
                        placeholder='message' 
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)} 
                        style={{resize:"none"}}
                        required>
                        </textarea>
                        <button className='btn btn-primary'>Send Message</button>
                    </div>
                </form>
           </div>
        </div>
    );
};

export default Contact;