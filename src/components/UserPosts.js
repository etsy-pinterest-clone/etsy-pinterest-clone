import React, {useState, useEffect} from 'react';
import {useMediaQuery} from 'react-responsive';
import {getUserPosts} from '../redux/postReducer';
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
        axios.get('/user/posts')
            .then(res => {
                setPosts(res.data)
            })
    }, [])


    const viewPost = (postId) => {   
        setReadPost(postId)
    }

    // const deletePost = (id) => {
    //      axios.delete(`/user/post/${id}`)
    //      .then(() => {
    //          alert('post has successfully been deleted')
    //          history.push('/user/dash')
    //      })
    //      .catch(err => console.log('error'))
    //  }


    
    return (
        <div className='sideBarTix'>
            {
                posts.map((t, index) => { 
                        return ( 
                            // <Link to={`/user/posts/${t.post_id}`} />
                            <div key={index} >
                                <div>
                                <div className='postList'> 
                                {/* <Button onClick={() => deletePost()} >
                                    <DeleteSharpIcon />                             
                                </Button> */}
                                   <h2 onClick={() => viewPost(t.post_id)} className='postItems'>{t.date}</h2>                                                            
                                   <h2 onClick={() => viewPost(t.post_id)} className='postItems'>{t.category}</h2>                                                            
                                   <h2 onClick={() => viewPost(t.post_id)} className='postItems'>{t.title}</h2>                                                            
                                   <h2 onClick={() => viewPost(t.post_id)} className='postItems'>{t.description}</h2>                                                            
                                   <h2 onClick={() => viewPost(t.post_id)} className='postItems'>{t.media}</h2>                                                            
                                </div>
                                <div className='openpost'>
                                </div>
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

export default connect(mapStateToProps, {getUserPosts})(UserPosts);
