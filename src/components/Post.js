import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {readPost, deleteUserPost} from '../redux/postReducer';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import {Button} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import '../styles/posts.css';

const Post = (props) => {
    // console.log(props)
    const [post, setPost] = useState({
        post_id: null,
        username: null,
        date: null,
        category: '',
        title: '',
        description: '',
        media: ''
    })

    const history = useHistory();

    useEffect(() => {
        // console.log(props.match.params.id)
        axios
            .get(`/user/post/${props.match.params.id}`)
            .then(res =>{
                setPost(res.data)
                props.readPost(res.data)
            })
            .catch(err => console.log(err))    
    }, [])

    const goBack = (e) => {
        e.preventDefault();
        history.goBack();
    }

    const deletePost = (id) => {
        axios
            .delete(`/user/post/${id}`)
            .then(() => {
                alert('Post has successfully been deleted')
                history.replace('/user/dash')
            })
            .catch(err => console.log(err))
    }
    // console.log(post.post_id)
    // console.log(props.postReducer.post.user_id)
    // console.log(props.userReducer.id)
    
    return (
        <div className='openPostContain'>
            
            <div>
                <div className='openCard'>
                    <div className='buttonContain'>
                        <span onClick={goBack} className='back' >&#8678;</span>
                        <Button onClick={props.postReducer.post.user_id === props.userReducer.id ? () => deletePost(post.post_id) : () => alert('You cannot delete this post')}>
                            <DeleteSharpIcon className='delete' />                             
                        </Button>
                    </div>
                    <h1 className='openTitle' >{post.title}</h1>
                    <h1 className='postData' >{post.category}</h1>
                    <h1 className='postDescription' >{post.description}</h1>
                    <iframe className='postMedia' title='user_media' src={post.media} />
                    <h1 className='date' >{post.date}</h1>
                </div>

                <h2 className='openTitle' >{post.title}</h2>
                <h1 className='postData' >{post.category}</h1>
                <h1 className='postDescription' >{post.description}</h1>
                <iframe className='postMedia' title='user_media' src={post.media} />
                <h2 className='userName'>Author: {post.username}</h2>
                <h1 className='date' >{post.date}</h1>
            </div>

            <div>Comments area</div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, {readPost, deleteUserPost})(Post);