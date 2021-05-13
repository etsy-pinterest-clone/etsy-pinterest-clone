import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { readProduct, deleteUserProduct } from '../redux/productReducer';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import '../styles/posts.css';
import '../styles/ProductCard.css';
import '../styles/product.css';

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

    return (
        <div className='openPostContain'>

            <div>
                <div className='product_view'>
                    <div className='buttonContain'>
                        <span onClick={goBack} className='back' >&#8678;</span>
                         <Button onClick={() => deleteProduct(props.match.params.id)}> 
                            <DeleteSharpIcon className='delete' />
                        </Button> 
                    </div>
                    <h1 className='product_category'>{product.category}</h1>
                    <img src={product.media} alt='product_image' />
                    <div className='search_product_title' >{product.title}</div>
                    <span>${product.price}</span>
                    <p>{product.description}</p>
                    <h1 className='date' >{product.date}</h1>
                </div>

            </div>
            <br />
            <br />
            <div>Comments area</div>
        </div>

    )
};

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, { readProduct, deleteUserProduct })(Product);