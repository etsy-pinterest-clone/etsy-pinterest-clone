import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPost } from '../redux/postReducer';
import axios from 'axios';
import { app } from '../firebase/firebase'
import '../styles/createPost.css';

const CreatePost = (props) => {
    const [data, setData] = useState({
        id: null,
        date: null,
        category: '',
        title: '',
        description: '',
        media: ''
    });

    const [ count, setCount ] = useState(0);

    const [ titleCount, setTitleCount ] = useState(0);

    const history = useHistory();

    const submitPost = (e) => {
        e.preventDefault();
        console.log(props)
        const { id } = props;
        const data1 = { id: id, date: data.date, category: data.category, title: data.title, description: data.description, media: data.media };

        axios.post('/user/post/createpost', data1)
            .then(res => {

                props.createPost({ date: res.data.date, category: res.data.category, title: res.data.title, description: res.data.description, media: res.data.media })
                alert('Post successfully submitted')
                history.push('/user/dash')
            })
            .catch(err => console.log(err))
    }

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const [fileUrl, setFileUrl] = useState(null)

    const onFileChange = async (e) => {
        const file = e.target.files[0]
        const storageRef = app.storage().ref(data.title)
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        data.media = await fileRef.getDownloadURL()

    }

    const goBack = () => {
        history.push('/user/dash')
    }
    
    return (
        <div className='createPostContain'>
                <div className='backContain'>
                    <button type='button' className='backBt' onClick={() => goBack()} >&#8678;</button>
                </div>
            <form className='createPost'>
                <h1 className='newHeader'>Create New Post</h1>
                <input className='newTitle' type='text' placeholder='Title' onChange={onChange} name='title' value={data.title} maxLength='45' onKeyUp={e => setTitleCount(e.target.value.length)} />
                <p>{titleCount}/45 Characters Remaining</p>
                <select className='select' name='category' onChange={onChange} selected>
                    <option value='' disabled selected>Please select a category </option>
                    <option name='general' value='Arts and Crafts' >Arts and Crafts</option>
                    <option name='internet' value='Fashion'>Fashion</option>
                    <option name='website' value='Technology'>Technology</option>
                    <option name='suggestion' value='Tutorial'>Tutorial</option>
                    <option name='other' value='other'>Other</option>
                </select>
                <textarea className='textInput' type='text' placeholder='Description' onChange={onChange} name='description' value={data.description} maxLength='150' onKeyUp={e => setCount(e.target.value.length)}/>
                <p>{count}/150 Characters Remaining</p>
                <input className='choose_file' type='file' placeholder='upload media' onChange={onFileChange} name='media' value={data.media} />
                <button className='submitTicket' type='submit' onClick={(e) => submitPost(e)} >Submit Request</button>
            </form>

        </div>
    )
}
const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps, {createPost})(CreatePost);