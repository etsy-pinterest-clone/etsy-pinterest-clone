import React, {useContext, useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {readPost, deleteUserPost} from '../redux/postReducer';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import {Button} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import '../styles/posts.css';

//comments
import {useParams} from 'react-router-dom'
import {DataContext} from '../GlobalState'
import {getData} from '../components/utils/FetchData'
import FormInput from '../components/utils/formInput/FormInput'
import CommentItem from '../components/utils/commentItem/CommentItem'
import Loading from '../components/utils/images/loading.gif'
import Rating from '../components/utils/rating/Rating'









const Post = (props) => {
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

    //comment implimentation
    const {id} = useParams()

    const state = useContext(DataContext)
    // const [posts] = state.posts
    const socket = state.socket
    const [rating, setRating] = useState(0)
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)

    const [page, setPage] = useState(1)
    const pageEnd = useRef()



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
        history.goBack()
    }

    useEffect(() => {
        setLoading(true)
        getData(`/api/comments/${id}?limit=${page * 5}`)
            .then(res => {
                setComments(r => r = res.data.comments)
                setLoading(false)
            })
            .catch(err => console.log(err.response.data.msg))
    },[id, page])

    // Realtime 
    // Join room
    useEffect(() => {
        if(socket){
            socket.emit('joinRoom', id)
        }
    },[socket, id])

    useEffect(() => {
        if(socket){
            socket.on('sendCommentToClient', msg => {
                setComments([msg, ...comments])
            })

            return () => socket.off('sendCommentToClient')
        } 
    },[socket, comments])

    // infiniti scroll
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                setPage(prev => prev + 1)
            }
        },{
            threshold: 0.1
        })

        observer.observe(pageEnd.current)
    },[])


    // Reply Comments
    useEffect(() => {
        if(socket){
            socket.on('sendReplyCommentToClient', msg => {
                const newArr = [...comments]
                
                newArr.forEach(cm => {
                    if(cm._id === msg._id){
                        cm.reply = msg.reply
                    }
                })

                setComments(newArr)
            })

            return () => socket.off('sendReplyCommentToClient')
        } 
    },[socket, comments])


    const deletePost = (id) => {
        axios.delete(`/user/post/${id}`)
        .then(() => {
            alert('Post has successfully been deleted')
            history.push('/user/dash')
        })
        .catch(err => console.log(err))
    }
    // console.log(post.post_id)

    return (
        <div className='openPostContain'>
            
            <div>

                <div className='buttonContain'>
                    <span  onClick={() => goBack()} className='back' >&#8678;</span>
                    <Button onClick={() => deletePost(post.post_id)}  >
                        <DeleteSharpIcon className='delete' />                             
                    </Button>
                </div>

            <div className='openCard'>


                <h2 className='openTitle' >{post.title}</h2>
                <h1 className='postDescription' >{post.category}</h1>
                <h1 className='postDescription' >{post.description}</h1>
                <iframe className='postMedia' title='user_media' src={post.media} />
                <h2 className='userName'>Author: {post.username}</h2>
                <div>
                    <h3 style={{margin: '10px 0'}}>Rating: {post.numReviews} reviews</h3>
                    <Rating props={post} />
                </div>
                <h1 className='date' >{post.date}</h1>
            </div>
            </div>

            <div>
                <div className="commentContain">
                    <div className="reviews">
                        
                        <h1>Please Rate My Post!</h1>
                        <input type="radio" name="rate" id="rd-5" onChange={() => setRating(5)} />
                        <label htmlFor="rd-5" className="fas fa-star"></label>

                        <input type="radio" name="rate" id="rd-4" onChange={() => setRating(4)} />
                        <label htmlFor="rd-4" className="fas fa-star"></label>

                        <input type="radio" name="rate" id="rd-3" onChange={() => setRating(3)} />
                        <label htmlFor="rd-3" className="fas fa-star"></label>

                        <input type="radio" name="rate" id="rd-2" onChange={() => setRating(2)} />
                        <label htmlFor="rd-2" className="fas fa-star"></label>

                        <input type="radio" name="rate" id="rd-1" onChange={() => setRating(1)} />
                        <label htmlFor="rd-1" className="fas fa-star"></label>
                    </div>

                    <FormInput id={id} socket={socket} rating={rating} />

                    <div className="comments_list">
                        {
                            comments.map(comment => (
                                <CommentItem key={comment._id} comment={comment} socket={socket} />
                            ))
                        }
                    </div>

                </div>

                {
                    loading && <div className="loading"><img src={Loading} alt=""/></div>
                }  
                <button ref={pageEnd} style={{opacity: 0}}>Load more</button>    
        </div>
            
        </div> 
    )
};

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, {readPost, deleteUserPost})(Post);