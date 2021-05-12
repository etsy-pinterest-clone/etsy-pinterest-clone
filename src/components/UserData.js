import React, { useState, useEffect } from 'react'
import SubHeader from '../components/SubHeader'
import { Link, useHistory } from 'react-router-dom'
import {getUser, updateUser} from '../redux/userReducer'
import {connect} from 'react-redux'
import axios from 'axios'
import {Bar, Line, Pie, Doughnut} from 'react-chartjs-2'
import { defaults } from 'react-chartjs-2';
import '../styles/data.css'

const UserData = (props) => {
    const history = useHistory();
    const [userId, setUserId] = useState('');
    const [aveRating, setAveRating] = useState(0);
    const [posts, setPosts] = useState();
    const [savedPosts, setSavedPosts] = useState(0);
    const [visits, setVisits] = useState(0);

    const chartData = {
        labels: ['Profile Data'],
        datasets:[
            {
                label:'Posts',
                data:[posts],
                backgroundColor:[
                    'rgba(182, 182, 182, 0.459)'
                ],
                borderWidth:1,
                borderColor:'rgb(241, 72, 52)',
                hoverBorderWidth:1,
                hoverBorderColor:'rgb(121, 38, 163)',
                hoverBackgroundColor:['rgb(121, 38, 163, 0.4)'],
                options:{
                    scales:{
                        yAxesL:[{
                            ticks:{
                                beginAtZero:true
                            }
                        }]
                    }
                }
            },
            {
                label:'Posts Saved by Others',
                data:[savedPosts],
                backgroundColor:[
                    'rgba(182, 182, 182, 0.459)'
                ],
                borderWidth:1,
                borderColor:'rgb(249, 137, 72)',
                hoverBorderWidth:1,
                hoverBorderColor:'rgb(174, 59, 167)',
                hoverBackgroundColor:['rgb(174, 59, 167, 0.4)'],
                options:{
                    scales:{
                        yAxesL:[{
                            ticks:{
                                beginAtZero:true
                            }
                        }]
                    }
                }
            },
            {
                label:'Profile Visits',
                data:[visits],
                backgroundColor:[
                    'rgba(182, 182, 182, 0.459)',
                ],
                borderWidth:1,
                borderColor:'rgb(254, 186, 85)',
                hoverBorderWidth:1,
                hoverBorderColor:'rgb(216, 76, 172)',
                hoverBackgroundColor:['rgb(216, 76, 172, 0.4)'],
                options:{
                    scales:{
                        yAxesL:[{
                            ticks:{
                                beginAtZero:true
                            }
                        }]
                    }
                }
            }
        ]
    };


    useEffect(() => {
        axios.get('/auth/session')
            .then((res) => {
                setUserId(res.data.user_id);
                console.log(res.data.user_id);

                axios.get(`/user/userdata/${res.data.user_id}`)
                    .then((res) => {
                        console.log(res)
                        setPosts(+res.data.number_of_posts); 
                        setSavedPosts(+res.data.number_posts_others_saved); 
                        setVisits(+res.data.profile_visits)
                    })
                    .catch(err => console.log(err))
                    console.log(visits)
            })
            .catch(err => console.log(err))
    })



    return(
        <div className='chartPage'>
            <SubHeader/>
            <div className='barChart'>
                <Bar
                    data={chartData}
                    height={200}
                    options={{
                        indexAxis:'y',
                        title:{
                            display:true,
                            text:'My Data',
                            fontSize:25
                        },
                        legend:{
                            display:true,
                            position:'right'
                        },
                        layout:{
                            padding:{
                                left:300,
                                right:300,
                                bottom:300,
                                top:100
                            }
                        },
                        tooltips:{
                            enabled:true
                        },
                    }}
                />
            </div>
        </div>       
        )
    }
    
    const mapStateToProps = (state) => {
        return state
    }
    
    export default connect(mapStateToProps, {getUser, updateUser})(UserData);