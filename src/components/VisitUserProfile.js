import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import {getUser, updateUser} from '../redux/userReducer';
import {connect} from 'react-redux';
import axios from 'axios';


// This component will serve as the component that dynamically
// renders other users' profiles after being linked here from 
// SearchBar.js

const VisitUserProfile = (props) => {
    // console.log(props)
    const history = useHistory();
    const [userId, setUserId] = useState(null);

    useEffect(()=> {
        // axios.post('/auth/register', data1)
        //   .then (res => {
        //       props.updateUser({username: res.data.username, id: res.data.user_id})
        //       history.push('/user/dash')
        //   })
        //   .catch(err => console.log(err))
        axios.post('')
        setUserId(props.match.perams)
    },[])

    const showUserPage = () => {
      
      return(

      <div>

      </div>)
      }

    return (
        <div>
            user profile info to be added
        </div>
    )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, {getUser, updateUser})(VisitUserProfile);