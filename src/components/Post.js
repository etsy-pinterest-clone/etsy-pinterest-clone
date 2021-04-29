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
        post_id: null,
        date: null,
        category: '',
        title: '',
        description: '',
        media: null
    })

    const history = useHistory();
    
    useEffect(() => {
        console.log(props.match.params.id)
        axios.get(`/user/post/${props.match.params.id}`)
            .then(res =>{
                setPost(res.data)
                props.readPost(res.data)
            })
            .catch(err => console.log(err))    
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
    console.log(post.post_id)
    return (
        <div className='background'>
            
            <div className='postContain'>


                <span className='closepost' onClick={() => goBack()} >&#8678;</span>
                <Button onClick={() => deletePost(post.post_id)} >
                    <DeleteSharpIcon />                             
                </Button>
                <h1 className='postData' >{post.date}</h1>
                <h1 className='postData' >{post.title}</h1>
                <h1 className='postData' >{post.category}</h1>
                <h1 className='postDescription' >{post.description}</h1>
                <div>Comments area</div>
            
            </div>
            
        </div>
    )
};

const mapStateToProps = (state) => {
    return state;
}

// export default post;s, readPot
export default connect(mapStateToProps, {readPost, deleteUserPost})(Post);