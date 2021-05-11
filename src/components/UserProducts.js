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


const UserProducts = (props) => {
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
        console.log(props)
        axios.get('/user/store/items')
            .then(res => {
                setProducts(res.data)
            })
            .catch(err => console.log(err))
    }, [])


    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = "../scripts/3d.js";
    //     script.async = true;
    //     document.body.appendChild(script);
    //     return () => {
    //         document.body.removeChild(script);
    //     }
    // }, []);


    const viewProduct = (productId) => {
        setReadProduct(productId)
        props.readProduct(productId)

    }


    return (

        <div className=''>
            <Button>
                <Link to='/user/store/createitem'>
                    <AddCircleSharpIcon className='createTicket' />
                </Link>
            </Button>
            {
                products.map((t, index) => {
                    console.log(t)
                    return (
                        <div key={index} className='container'>
                            <div>
                                <Link to={`/user/store/item/${t.product_id}`} className='link'>
                                    <div className='card' onClick={() => viewProduct(t.product_id)}>

                                        <h1 className='title'>{t.title}</h1>
                                        <h2 className='category'>{t.category}</h2>
                                        <h2 className='description'>{t.description}</h2>
                                        <iframe className='media' src={t.media} />
                                        <h2 className='price'>${t.price}</h2>
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
    )
};

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, { getUserProducts, readProduct })(UserProducts);
