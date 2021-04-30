import React, { useState } from 'react';
import axios from 'axios';

export default function Emailer (props){

  
const [body, setBody] = useState({
    email: '',
    title: '',
    name: '',
    message: ''
})


  const handleSend = () => {
    axios.post('/api/email', body )
    .then(res => {
        setBody({
            name: '',
            email: '',
            title: '',
            message: ''
        })
        console.log(res.data);
        alert('Your message has been sent!')
    })
    .catch(err => console.log(err))
  }

  const onChange = (e) => {
    setBody({...body, [e.target.name]: e.target.value})
}
    
  
  return (
      <div>
        <h1>Contact Us</h1>
        <input placeholder='your name' name='name' value={body.name} onChange={onChange} />
        <input  placeholder='your email' name='email' value={body.email} onChange={onChange} />
        <input placeholder='subject' name='title' value={body.title} onChange={onChange} />
        <textarea  placeholder='message' name='message' value={body.message} onChange={onChange} />
        <button onClick={handleSend}>Send</button>
      </div>
    )
  }