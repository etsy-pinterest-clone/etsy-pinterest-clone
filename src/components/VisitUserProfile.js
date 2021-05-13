import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router';
import { getUser, updateUser } from '../redux/userReducer';
import { readPost } from '../redux/postReducer';
import {connect} from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';
import axios from 'axios';


const VisitUserProfile = (props) => {

    const history = useHistory();

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

export default connect(mapStateToProps, {getUser, updateUser, readPost})(VisitUserProfile);
