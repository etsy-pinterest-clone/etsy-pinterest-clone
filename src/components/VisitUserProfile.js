<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import {getUser, updateUser} from '../redux/userReducer';
import {connect} from 'react-redux';
import axios from 'axios';
=======
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserPosts, readPost } from '../redux/postReducer';
import FavoriteIcon from '@material-ui/icons/Favorite';
import '../styles/visitUserProfile.css';
import '../styles/posts.css';
>>>>>>> c210361774922094a55e188ce4832d254ac5d330


const VisitUserProfile = (props) => {

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

    const [ result, setResult ] = useState([]);
    
    let { id } = useParams();

    useEffect(() => {
        axios
            .get(`/user/posts/${id}`)
            .then(res => {
                setResult(res.data)
            })
            .catch(err => console.log(err));
    }, [id]);

    const viewPost = (postId) => {
        props.readPost(postId)
    };

    const back = (e) => {
        e.preventDefault();
        history.goBack();
    }

    return (
        <div className='mainContain'>
            <button className='back_btn' onClick={back}>&#8678;</button>
            {
                result.map((post, index) => {
                    return (
                        <div key={index} className='container'>
                            <div>
                                <Link to={`/user/posts/${post.post_id}`} className='link'>
                                    <div>{post.username}</div>
                                    <div className='card' onClick={() => viewPost(post.post_id)}>
                                        <h1 className='title'>{post.title}</h1>
                                        <h2 className='category'>{post.category}</h2>
                                        <h2 className='description'>{post.description}</h2>
                                        <iframe className='media' title='user_media' src={post.media} />
                                        <FavoriteIcon className='save' />
                                        <h2 className='date'>{post.date}</h2>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return state
}

<<<<<<< HEAD
const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, {getUser, updateUser})(VisitUserProfile);
=======
export default connect(mapStateToProps, { getUserPosts, readPost })(VisitUserProfile);
>>>>>>> c210361774922094a55e188ce4832d254ac5d330
