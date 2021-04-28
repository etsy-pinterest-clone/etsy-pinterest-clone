import React, {useState, useEffect} from 'react';
import {useMediaQuery} from 'react-responsive';
import axios from 'axios';
import { connect } from 'react-redux';
import {readPost, deleteUserPost} from '../redux/postReducer';
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
        axios.get(`/user/post/${props.match.params.id}`)
            .then(res =>{
                setPost(res.data)
            })} else {
                axios.get(`/user/post/${props.postId}`)
                .then(res =>{
                    setPost(res.data)
                })
            }
    }, [])

    const goBack = () => {
        history.push('/user/dash')
    }
    
    return (
        <div className='background' >
       
            <div>
            <div className='postContain'>
                <span className='closepost' onClick={() => goBack} >&#8678;</span>
                {/* <img src={trash} alt='trash-icon' className='delete' onClick={() => {props.deletepost(post.post_id); closeView()}} /> */}
                <h1 className='postData' >{post.date}</h1>
                <h1 className='postData' >{post.title}</h1>
                <h1 className='postData' >{post.category}</h1>
                <h1 className='postDescription' >{post.description}</h1>
                
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