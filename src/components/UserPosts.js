import React, {useState, useEffect} from 'react';
import {useMediaQuery} from 'react-responsive';
import {getUserPosts, readPost} from '../redux/postReducer';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import {Button} from '@material-ui/core';
import {connect}  from 'react-redux';
import {useHistory, Link} from 'react-router-dom';
import Post from './Post';
import axios from 'axios';


const UserPosts = (props) => {
    const history = useHistory();
    const [posts, setPosts] = useState([{
        postId: null,
        date: null,
        category: '',
        title: '',
        description: '',
        media: null
    }]);
    const [readPost, setReadPost] = useState(null)

    useEffect(() => {
        console.log(props)
        axios.get('/user/posts')
            .then(res => {
                setPosts(res.data)
            })
    }, [])


    const viewPost = (postId) => {   
        setReadPost(postId)
        props.readPost(postId)
        
    }


    return (
        <div className='sideBarTix'>
            {
                posts.map((t, index) => { 
                    console.log(t)
                        return ( 
                            <div key={index} >
                                <div>
                                    <Link to={`/user/posts/${t.post_id}`} >
                                <div className='postList' onClick={() => viewPost(t.post_id)}> 
                                
                                   <h2 className='postItems'>{t.date}</h2>                                                            
                                   <h2 className='postItems'>{t.category}</h2>                                                            
                                   <h2 className='postItems'>{t.title}</h2>                                                            
                                   <h2 className='postItems'>{t.description}</h2>                                                            
                                   <h2 className='postItems'>{t.media}</h2>                                                            
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

export default connect(mapStateToProps, {getUserPosts, readPost})(UserPosts);
