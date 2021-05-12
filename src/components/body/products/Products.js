import React, { useContext, useState, useHistory } from 'react';
import { DataContext } from '../../../GlobalState';
import ProductCard from '../../utils/productCard/ProductCard';
import StoreSearchBar from '../../StoreSearchBar';

function Products() {
    const state = useContext(DataContext);
    console.log(state)
    const [products] = state.products;

    // const history = useHistory();

    
    return (
        <div>
            <h2 className="app_title">
                    Realtime website ( chat, comments ... ) with MERN Stack and Socket.io
            </h2>
            <br />
            <h1>Styling for searchbar and search results is being borrowed from the other search bar and is only being used to help me see the results at the moment</h1>
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
