import React, { useState } from "react"
import { connect } from "react-redux"
import { useHistory } from 'react-router-dom'
import { loginUser, updateUser } from '../redux/userReducer'
import axios from 'axios';
import '../styles/register.css';



const Register = (props) => {
  const history = useHistory();
  const [data, setData] = useState({
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      birthday: null,
      profilePic: '',
      email: '',
      phone_number: ''
  })
  

  function register(e){
      e.preventDefault();
      const data1 = {username: data.username, password: data.password, first_name: data.first_name, last_name: data.last_name, birthday: data.birthday, email: data.email, phone_number: data.phone_number}

      axios.post('/auth/register', data1)
          .then (res => {
              props.updateUser({username: res.data.username, id: res.data.user_id})
              history.push('/user/dash')
          })
          .catch(err => console.log(err))
  }

  function onChange(e){
      setData({...data, [e.target.name]: e.target.value})
  }


  return (
      <div className='register-contain' >
          <div className='register-box'>
            <div className='button-contain'>
                <button className='backButton' onClick={() => history.push('/')} >&#8678;</button>
                {/* <button className='cancel' onClick={() => history.push('/')}>cancel</button> */}
            </div>
            <h2>Register</h2>
            <form >
                <div className='register-field'>
                    <input  type='text'  name='first_name' onChange={onChange} value={data.first_name}/>
                    <label>First Name</label>
                </div>
                <div className='register-field'>
                    <input type='text'  name='last_name' onChange={onChange} value={data.last_name} />
                    <label>Last Name</label>
                </div>
                <div className='register-field'>
                    <input type='date'  name='birthday' onChange={e => setData({...data, [e.target.name]: e.target.value})}value={data.birthday} />
                    <label>Birthday</label>
                </div>
                <div className='register-field'>
                    <input accept="image/png, image/jpeg" name='profilePic' value={data.profilePic}></input>
                    <label>Profile Picture</label>
                </div>
                <div className='register-field'>
                    <input type='email'  name='email' onChange={onChange} value={data.email} />
                    <label>Email</label>
                </div>
                <div className='register-field'>
                    <input type='tel'   name='phone_number' onChange={onChange} value={data.phone_number} />
                    <label>Phone Number</label>
                </div>
                <div className='register-field'>
                    <input className='button' type='text'  name='username' onChange={onChange} value={data.username} />
                    <label>Username</label>
                </div>
                <div className='register-field'>
                    <input type='password'  name='password' onChange={onChange} value={data.password} />
                    <label>Password</label>
                </div>
                <a onClick={(e) => this.register(e)}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Register
                </a>

                {/* <button className='submit' type='submit' onClick={(e) => register(e)}>Submit</button> */}
                
            </form>
          </div>
      </div>
  )
};

function mapStateToProps(state){
  return state
}
export default connect(mapStateToProps, {loginUser, updateUser})(Register); 
