import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { getUserProducts, readProduct } from '../redux/productReducer';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp'
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Post from './Post';
import axios from 'axios';
import ProductSubHeader from './ProductSubHeader';
import StoreSearchBar from './StoreSearchBar';
import '../styles/ProductCard.css';
import '../styles/storeSearchBar.css';
import '../styles/userProducts.css';


const UserProducts = (props) => {
    // console.log(props)
    const history = useHistory();
    const [products, setProducts] = useState([{
        productId: null,
        date: null,
        category: '',
        title: '',
        description: '',
        price: null,
        media: null
    }]);
    const [readProduct, setReadProduct] = useState(null)

    useEffect(() => {
        // console.log(props)
        axios.get('/user/store/items')
            .then(res => {
                setProducts(res.data)
            })
            .catch(err => console.log(err))
    }, [])



    const viewProduct = (productId) => {
        setReadProduct(productId)
        props.readProduct(productId)

    }


    return (

        

        <div className=''>

            <ProductSubHeader/>
            <StoreSearchBar />
            {/* <br /> */}
            <div className='my_products'>
                <h2>My Products</h2>
            </div>
            <div className='product_container'>
            {
                products.map((t, index) => {
                    // console.log(t)
                    return (
                        <div key={index} className='container'>
                            <div>
                                <Link to={`/user/store/item/${t.post_id}`} className='product_link'>
                                    <div className='product_card' onClick={() => viewProduct(t.post_id)}>
                                        <div className='search_post_category'>{t.category}</div>
                                        <img src={t.media} alt='product_image'/>
                                        <div className='search_product_title'>{t.title}</div>
                                        <span className='price'>${t.price}</span>
                                        <p>{t.description}</p>
                                        <FavoriteIcon className='save' />
                                        <h2 className='date'>{t.date}</h2>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, { getUserProducts, readProduct })(UserProducts);
