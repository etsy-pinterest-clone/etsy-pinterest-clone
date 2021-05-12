import React, { useContext, useState } from 'react';
import { DataContext } from '../../../GlobalState';
import ProductCard from '../../utils/productCard/ProductCard';
import StoreSearchBar from '../../StoreSearchBar';
import { useHistory } from 'react-router-dom';
import './Products.css';

function Products() {
    const state = useContext(DataContext);
    console.log(state)
    const [products] = state.products;

    const history = useHistory();

    function back(e) {
        e.preventDefault();
        history.goBack();
    }

    return (
        <div>
            <div>
                <button className='goBack' onClick={back}>&#8678;</button>
                <h2 className="app_title">
                        Realtime website ( chat, comments ... ) with MERN Stack and Socket.io
                </h2>
                <h2>not MERN anymore....</h2>
            </div>
            <br />
            <h1>Styling for search results is being used from ProductCard.css. Feel free to edit the styling for the search bar and the results.</h1>
            <StoreSearchBar/>
        
            <div className="products_page">
                {
                    products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default Products
