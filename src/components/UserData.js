import React, { useState, useEffect } from 'react'
import SubHeader from '../components/SubHeader'
import { Link, useHistory } from 'react-router-dom'
import {getUser, updateUser} from '../redux/userReducer'
import {connect} from 'react-redux'
import axios from 'axios'
import {Bar, Line, Pie, Doughnut} from 'react-chartjs-2'
import { defaults } from 'react-chartjs-2';
import '../styles/userData.css'

const UserData = (props) => {
    const history = useHistory();
    const [userId, setUserId] = useState('');
    const [posts, setPosts] = useState(0);
    const [savedPosts, setSavedPosts] = useState(0);
    const [visits, setVisits] = useState(0);

    const [chartData, setChartData] = useState({
        labels: ['', '', ''],
        datasets:[
            {
                label:'Posts',
                data:[posts],
                backgroundColor:[
                    'rgb(241, 72, 52, 0.7)'
                ],
                borderWidth:1,
                borderColor:'rgb(241, 72, 52)',
                hoverBorderWidth:1,
                hoverBorderColor:'rgb(121, 38, 163)',
                hoverBackgroundColor:['rgb(121, 38, 163, 0.7)'],
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
                    'rgb(249, 137, 72, 0.7)'
                ],
                borderWidth:1,
                borderColor:'rgb(249, 137, 72)',
                hoverBorderWidth:1,
                hoverBorderColor:'rgb(174, 59, 167)',
                hoverBackgroundColor:['rgb(174, 59, 167, 0.7)'],
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
                    'rgb(254, 186, 85, 0.7)',
                ],
                borderWidth:1,
                borderColor:'rgb(254, 186, 85)',
                hoverBorderWidth:1,
                hoverBorderColor:'rgb(216, 76, 172)',
                hoverBackgroundColor:['rgb(216, 76, 172, 0.7)'],
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
    });


    useEffect(() => {
        axios.get('/auth/session')
            .then((res) => {
                setUserId(res.data.user_id);
                console.log(res.data.user_id);

                axios.get('/user/userdata', userId)
                    .then((res) => {
                        setPosts(res.data.numOfPosts); 
                        setSavedPosts(res.data.numPostsUsersSaved); 
                        setVisits(res.data.numOfVists)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }, [])



    return(
        <div className='chartPage'>
            <SubHeader/>
            <h1 className='chartHeader'>My Profile Data</h1>
            <div className='barChart'>
                <Bar
                    data={chartData}
                    height={200}
                    options={{
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