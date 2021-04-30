import React, { useState, useEffect } from 'react';
import SubHeader from '../components/SubHeader';
import { Link, useHistory } from 'react-router-dom';
import {getUser, updateUser} from '../redux/userReducer';
import {connect} from 'react-redux';
import axios from 'axios';
import '../styles/updateProfile.css';

const UserProfile = (props) => {
    const history = useHistory();

    const [data, setData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        birthday: null,
        profilePic: '',
        email: '',
        phone_number: ''
    })
    

    useEffect((props) => {
        axios.get('/auth/session')
            .then((res) => {
                setData(res.data)
                props.getUser(res.data.user_id)
                console.log(res.data.user_id)
            })
            .catch(err => console.log(err))
    }, [])


    function update(e){
        e.preventDefault();
        const data1 = {username: data.username, first_name: data.first_name, last_name: data.last_name, birthday: data.birthday, email: data.email, phone_number: data.phone_number}
  
        axios.put('/user/updateprofile', data1)
            .then (res => {
                props.updateUser({username: res.data.username, id: res.data.user_id})
                alert('Profile successfully updated')
                history.push('/user/dash')
            })
            .catch(err => console.log(err))
    }

    function onChange(e){
        setData({...data, [e.target.name]: e.target.value})
    }

    return(
        <div>
            <div className='update-box'>
                <h2>Update Your Profile</h2>
                <form >
                    <div className='update-field'>
                        <input  type='text'  name='first_name' onChange={onChange} value={data.first_name}/>
                        <label>First Name</label>
                    </div>
                    <div className='update-field'>
                        <input type='text'  name='last_name' onChange={onChange} value={data.last_name} />
                        <label>Last Name</label>
                    </div>
                    <div className='update-field'>
                        <input type='date'  name='birthday' onChange={e => setData({...data, [e.target.name]: e.target.value})}value={data.birthday} />
                        <label>Birthday</label>
                    </div>
                    <div className='update-field'>
                        <input accept="image/png, image/jpeg" name='profilePic' value={data.profilePic}></input>
                        <label>Profile Picture</label>
                    </div>
                    <div className='update-field'>
                        <input type='email'  name='email' onChange={onChange} value={data.email} />
                        <label>Email</label>
                    </div>
                    <div className='update-field'>
                        <input type='tel'   name='phone_number' onChange={onChange} value={data.phone_number} />
                        <label>Phone Number</label>
                    </div>
                    <div className='update-field'>
                        <input className='button' type='text'  name='username' onChange={onChange} value={data.username} />
                        <label>Username</label>
                    </div>
                    <h3>Contact us to reset your password</h3>
                    <a onClick={(e) => update(e)}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Update
                    </a>
                </form>
            </div>
          </div>

    )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, {getUser, updateUser})(UserProfile);