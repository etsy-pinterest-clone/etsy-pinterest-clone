import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { readProduct, deleteUserProduct } from '../redux/productReducer';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import '../styles/posts.css';

const Product = (props) => {
    // console.log(props)
    const [product, setProduct] = useState({
        product_id: null,
        username: null,
        date: null,
        category: '',
        title: '',
        description: '',
        price: '',
        media: ''
    })

    const history = useHistory();

    useEffect(() => {
        // console.log(props.match.params.id)
        axios
            .get(`/user/store/item/${props.match.params.id}`)
            .then(res => {
                setProduct(res.data)
                props.readProduct(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const goBack = (e) => {
        e.preventDefault();
        history.goBack();
    }

    const deleteProduct = (id) => {
        axios
            .delete(`/user/store/item/${id}`)
            .then(() => {
                alert('Post has successfully been deleted')
                history.replace('/user/store')
            })
            .catch(err => console.log(err))
    }
    console.log(product.product_id)
    // console.log(props.postReducer.post.user_id)
    // console.log(props.userReducer.id)

    return (
        <div className='openPostContain'>

            <div>
                <div className='openCard'>
                    <div className='buttonContain'>
                        <span onClick={goBack} className='back' >&#8678;</span>
                        {/* <Button onClick={props.productReducer.product.user_id === props.userReducer.id ? () => deleteProduct(product.product_id) : () => alert('You cannot delete this post')}>
                            <DeleteSharpIcon className='delete' />
                        </Button> */}
                    </div>
                    <h1 className='openTitle' >{product.title}</h1>
                    <h1 className='postData' >{product.category}</h1>
                    <h1 className='postDescription' >{product.description}</h1>
                    <iframe className='postMedia' title='user_media' src={product.media} />
                    <h1 className='date' >{product.date}</h1>
                </div>

                <h2 className='openTitle' >{product.title}</h2>
                <h1 className='postData' >{product.category}</h1>
                <h1 className='postDescription' >{product.description}</h1>
                <iframe className='postMedia' title='user_media' src={product.media} />
                <h2 className='userName'>Author: {product.username}</h2>
                <h2>${product.price}</h2>
                <h1 className='date' >{product.date}</h1>
            </div>
            <div>Comments area</div>
        </div>

    )
};

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, { readProduct, deleteUserProduct })(Product);