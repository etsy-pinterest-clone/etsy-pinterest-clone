import React, {useState, useEffect} from 'react';
import {useMediaQuery} from 'react-responsive';
import axios from 'axios';
import { connect } from 'react-redux';
import {readPost, deleteUserPost} from '../redux/postReducer';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import {Button} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import '../styles/posts.css';





const Post = (props) => {
    const [post, setPost] = useState({
        post_id: null,
        date: null,
        category: '',
        title: '',
        description: '',
        media: ''
    })

    const history = useHistory();

    useEffect(() => {
        // console.log(props.match.params.id)
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
        .catch(err => console.log(err))
    }
    console.log(post.post_id)
    return (
        <div className='openPostContain'>
            
            <div>

            <div className='openCard'>
                <div className='buttonContain'>
                    <span  onClick={() => goBack()} className='back' >&#8678;</span>
                    <Button onClick={() => deletePost(post.post_id)}  >
                        <DeleteSharpIcon className='delete' />                             
                    </Button>
                </div>
                <h1 className='openTitle' >{post.title}</h1>
                <h1 className='postData' >{post.category}</h1>
                <h1 className='postDescription' >{post.description}</h1>
                <img className='postMedia' src={post.media} />
                <h1 className='date' >{post.date}</h1>
            </div>
            </div>
            <div>Comments area</div>
            
        </div>
    )
};

const mapStateToProps = (state) => {
    return state;
}

// export default post;s, readPot
export default connect(mapStateToProps, {readPost, deleteUserPost})(Post);