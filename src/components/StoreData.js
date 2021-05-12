import React, { useState, useEffect } from 'react'
import { Rating } from '@material-ui/lab';
import { Box, Typography} from '@material-ui/core';
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
    const [visits, setVisits] = useState(0);
    const [aveRating, setAveRating] = useState(0);
    const [popularItems, setPopularItems] = useState([]);
    const [revenue, setrevenue] = useState(0);

    const chartData = {
        labels: ['Store Data'],
        datasets:[
            {
                label:'Visitors',
                data:[visits],
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
                        yAxes:[{
                            ticks:{
                                beginAtZero:true
                            }
                        }]
                    }
                }
            },
            {
                label:'Revenue',
                data:[revenue],
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
    };


    useEffect(() => {
        axios.get('/auth/session')
            .then((res) => {
                setUserId(res.data.user_id);
                console.log(res.data.user_id);

                axios.get(`/user/userdata/${res.data.user_id}`)
                    .then((res) => {
                        console.log(res)
                        setVisits(+res.data.store_visits);
                        setPopularItems(res.data.profile_visits);
                        setrevenue(+res.data.profile_visits);
                        setAveRating(+res.data.average_rating)
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
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend">Store Rating</Typography>
                    <Rating name="read-only" value={aveRating} readOnly />
                </Box>
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