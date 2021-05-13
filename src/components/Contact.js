import React, { useState } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import '../styles/contact.css';

export default function Emailer (props){

  
const [body, setBody] = useState({
    email: '',
    title: '',
    name: '',
    message: ''
})
  const history = useHistory();

  const handleSend = () => {
    axios.post('/api/email', body )
    .then(res => {
        setBody({
            name: '',
            email: '',
            title: '',
            message: ''
        })
        // console.log(res.data);
        alert('Your message has been sent!')
    })
    .catch(err => console.log(err))
  }

  const onChange = (e) => {
    setBody({...body, [e.target.name]: e.target.value})
}
    
  
  return (

    <div className='contact-contain' >
    <div className='contact-box'>
      <div className='button-contain'>
          <button className='back_Button' onClick={() => history.push('/user/dash')} >&#8678;</button>
          
      </div>
      <h2>Contact Us</h2>
      <form >
          <div className='contact-field'>
          <input  name='name' value={body.name} onChange={onChange} />
              <label>Your Name</label>
          </div>
          <div className='contact-field'>
              <input   name='email' value={body.email} onChange={onChange} />
              <label>Email</label>
          </div>
          <div className='contact-field'>
            <input  name='title' value={body.title} onChange={onChange} /> 
              <label>Subject</label>
          </div>
          <div className='contact-field'>
            <textarea  className='message-field' name='message' value={body.message} onChange={onChange} placeholder='Type your message here...'/>
              <label>Message</label>
          </div>
          <a onClick={handleSend}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    contact
                </a>

                {/* <button className='submit' type='submit' onClick={(e) => contact(e)}>Submit</button> */}
                
            </form>
          </div>
      </div>


      // <div>
      //   <h1>Contact Us</h1>
      //   <input placeholder='your name' name='name' value={body.name} onChange={onChange} />
      //   <input  placeholder='your email' name='email' value={body.email} onChange={onChange} />
      //   <input placeholder='subject' name='title' value={body.title} onChange={onChange} />
      //   <textarea  placeholder='message' name='message' value={body.message} onChange={onChange} />
      //   <button onClick={handleSend}>Send</button>
      // </div>
    )
  }