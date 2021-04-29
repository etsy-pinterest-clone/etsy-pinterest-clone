import React, {useState, useEffect} from 'react';
import {useMediaQuery} from 'react-responsive';
import axios from 'axios';
import { connect } from 'react-redux';
import {readPost, deleteUserPost} from '../redux/postReducer';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import {Button} from '@material-ui/core';
import {useHistory} from 'react-router-dom';





const Post = (props) => {
    const [post, setPost] = useState({
        postId: null,
        date: null,
        category: '',
        title: '',
        description: '',
        media: null
    })

    const history = useHistory();


    useEffect(() => {
        if (props.match){
            console.log(props.match)
        axios.get(`/user/post/${props.match.params.id}`)
            .then(res =>{
                setPost(res.data)
            })} else {
                axios.get(`/user/post/${props.postId}`)
                .then(res =>{
                    setPost(res.data)
                })
                .catch(err => console.log(err))
            }
    }, [])

    const goBack = () => {
        history.push('/user/dash')
    }

    const deletePost = (id) => {
        axios.delete(`/user/post/${id}`)
        .then(() => {
            alert('post has successfully been deleted')
            history.push('/user/dash')
        })
        .catch(err => console.log('error'))
    }
    console.log(post)
    return (
        <div className='background' >
       
            <div>
            <div className='postContain'>
            <Button onClick={() => deletePost()} >
                <DeleteSharpIcon />                             
            </Button>

                <span className='closepost' onClick={() => goBack()} >&#8678;</span>
                <h1 className='postData' >{post.date}</h1>
                <h1 className='postData' >{post.title}</h1>
                <h1 className='postData' >{post.category}</h1>
                <h1 className='postDescription' >{post.description}</h1>
                <div>Comments area</div>
            </div>
            </div>
            
        </div>
    )
};

const mapStateToProps = (state) => {
    return state;
}

// export default post;
export default connect(mapStateToProps, {readPost, deleteUserPost})(Post);