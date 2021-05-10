import React, { useState, useEffect } from 'react';
import { getUserPosts, readPost } from '../redux/postReducer';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/posts.css';


const UserPosts = (props) => {
    const history = useHistory();
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
        // console.log(props)
        axios.get('/user/posts')
            .then(res => {
                setPosts(res.data)
            })
    }, [])


    useEffect(() => {
        const script = document.createElement('script');
        script.src = "../scripts/3d.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);


    const viewPost = (postId) => {
        setReadPost(postId)
        props.readPost(postId)

    }


    return (
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
    )
};

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, { getUserPosts, readPost })(UserPosts);
