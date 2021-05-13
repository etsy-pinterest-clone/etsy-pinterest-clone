import React, { useState, useEffect } from 'react';
import SubHeader from '../components/SubHeader';
import UserPosts from './UserPosts';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/userLanding.css';

const UserLanding = () => {
    const [user, setUser] = useState();

    useEffect((props) => {
        axios.get('/auth/session')
            .then((res) => {
                setUser(res.data)
                props.updateUser(res.data.user_id)
                // console.log(res.data.user_id)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='userBackground'>
            <SubHeader />
            <UserPosts />
        </div>
    )
}

export default UserLanding;