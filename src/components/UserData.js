import React, { useState, useEffect } from 'react'
import SubHeader from '../components/SubHeader'
import { Link, useHistory } from 'react-router-dom'
import {getUser, updateUser} from '../redux/userReducer'
import {connect} from 'react-redux'
import axios from 'axios'
import {Bar, Line, Pie, Doughnut} from 'react-chartjs-2'
import '../styles/updateProfile.css'

const UserData = (props) => {
    const history = useHistory();
    const [userId, setUserId] = useState('')
    const [userData, setUserData] = userState({})


    useEffect((props) => {
        axios.get('/auth/session')
            .then((res) => {
                setUserId(res.data.user_id);
                props.getUser(res.data.user_id);
                console.log(res.data.user_id);

                axios.get('/user/userdata', userId)
                    .then((res) => {
                        setUserData({numOfPosts: res., numPostsUsersSaved: res.data, numOfVists: res.data})
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }, [])



    return(
        <div className='chartArea'>
            <Bar>
                data={}
                options={{
                    title:{
                        display:true,
                        text:'Test',
                        fontSize:25
                    },
                    legend:{
                        display:true,
                        position:'right'
                    }
                }}
            </Bar>
        </div>       
        )
    }
    
    const mapStateToProps = (state) => {
        return state
    }
    
    export default connect(mapStateToProps, {getUser, updateUser})(UserData);