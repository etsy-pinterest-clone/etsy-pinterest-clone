import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createProduct } from '../redux/productReducer';
import axios from 'axios';
import { app } from '../firebase/firebase'
import '../styles/createPost.css';

const CreateProduct = (props) => {
    const [data, setData] = useState({
        id: null,
        date: null,
        category: '',
        title: '',
        description: '',
        price: null,
        media: ''
    });

    const [count, setCount] = useState(0);

    const [titleCount, setTitleCount] = useState(0);

    const history = useHistory();

    const submitPost = (e) => {
        e.preventDefault();
        console.log(props)
        const { id } = props;
        const data1 = { id: id, date: data.date, category: data.category, title: data.title, description: data.description, price: data.price, media: data.media };

        axios.post('/user/store/createitem', data1)
            .then(res => {
                console.log(data1)
                
                props.createProduct({date: res.data.date, category: res.data.category, title: res.data.title, description: res.data.description, price: res.data.price, media: res.data.media })
                alert('Product successfully submitted')
                history.push('/user/store/')
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
        history.push('/user/store/')
    }

    return (
        <div className='createPostContain'>
            <div className='backContain'>
                <button type='button' className='backBt' onClick={() => goBack()} >&#8678;</button>
            </div>
            <form className='createPost'>
                <h1 className='newHeader'>Create New Product</h1>
                <input className='newTitle' type='text' placeholder='Title' onChange={onChange} name='title' value={data.title} maxLength='45' onKeyUp={e => setTitleCount(e.target.value.length)} />
                <p>{titleCount}/45 Characters Remaining</p>
                <select className='select' name='category' onChange={onChange} selected>
                    <option value='' disabled selected>Please select an option </option>
                    <option name='general' value='Arts and Crafts' >Arts and Crafts</option>
                    <option name='internet' value='Fashion'>Fashion</option>
                    <option name='website' value='Technology'>Technology</option>
                    <option name='suggestion' value='Tutorial'>Tutorial</option>
                    <option name='other' value='other'>Other</option>
                </select>
                <textarea className='textInput' type='text' placeholder='description' onChange={onChange} name='description' value={data.description} maxLength='150' onKeyUp={e => setCount(e.target.value.length)} />
                <p>{count}/150 Characters Remaining</p>
                <input type='number' placeholder='enter price' onChange={onChange} name='price' value={data.price} />
                <input type='file' placeholder='upload media' accept='image/*, video/*' onChange={onFileChange} name='media' />
                <button className='submitTicket' type='submit' onClick={(e) => submitPost(e)} >Submit Request</button>
            </form>

        </div>
    )
}
const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps, { createProduct })(CreateProduct);