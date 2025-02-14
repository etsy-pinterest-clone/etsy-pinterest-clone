import React, { useState, useEffect } from 'react';
import { getUserPosts, readPost } from '../redux/postReducer';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/explore.css';


const UserPosts = (props) => {
    const [posts, setPosts] = useState([{
        postId: null,
        username: '',
        date: null,
        category: '',
        title: '',
        description: '',
        media: null
    }]);
    const [readPost, setReadPost] = useState(null)

    useEffect(() => {
        axios.get('/explore')
        .then(res => {
                // console.log(res.data)
                setPosts(res.data)
            })
    }, [])




    const viewPost = (postId) => {
        setReadPost(postId)
        props.readPost(postId)

    }


    return (
        <div className='parentContain'>
            <div className='mainContain'>
                {
                    posts.map((t, index) => {
                        // console.log(t)
                        return (
                            <div key={index} className='container'>
                                <div>
                                    <Link to={`/user/posts/${t.post_id}`} className='link'>
                                        <div className='card' onClick={() => viewPost(t.post_id)}>
                                            <h1 className='title'>{t.title}</h1>
                                            <h2 className='category'>{t.category}</h2>
                                            <h2 className='description'>{t.description}</h2>
                                            <iframe className='media' src={t.media} />
                                            <FavoriteIcon className='save' />
                                            <h2 className='date'>{t.date}</h2>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, { getUserPosts, readPost })(UserPosts);
