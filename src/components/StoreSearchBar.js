import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Button } from "@material-ui/core";
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import axios from 'axios';
// import '../styles/searchBar.css';
import '../styles/storeSearchBar.css';
import '../components/utils/productCard/ProductCard.css'

/* The styling for this is temporary and is being taken from the other search bar styling. Feel free to change className's and add styling :) */


function Header() {
    const [ item, setItem ] = useState([]);

    const [ selectedFilter, setFilter ] = useState('title');

    const [ searchParams, setSearchParams ] = useState('');

    const [ searchResults, setSearchResults ] = useState(null);


    const handleTitleSearch = async () => {
        let body = { title: searchParams };
        try {
            await axios
                    .put('/user/store/searchtitle', body)
                    .then(res => {
                        const mappedTitles = res.data.map((postTitle, index) => {
                            return (         
                                <div key={index} className='product_card'>
                                    <div className='search_post_category'>{postTitle.category}</div>
                                    <img src={postTitle.media} alt='product_photo'/>
                                    <div className='search_product_title'>{postTitle.title}</div>
                                    <span>${postTitle.price}</span>
                                    <p>{postTitle.description}</p>
                                    <div className='product_card_row'>
                                        <Link>View</Link>
                                        <button>Buy</button>
                                    </div>
                                </div>
                            );
                        })
                        setSearchResults(mappedTitles)
                        setItem(res.data)
                    })
        } catch (err) {
            console.log(err)
        }
    };

    const handleCategorySearch = async () => {
        let body = { category: searchParams };
        try {
            await axios
                    .put('/user/store/searchcategory', body)
                    .then(res => {
                        const mappedCategories = res.data.map((postCat, index) => {
                            return (
                                <div key={index} className='product_card'>
                                    <div className='search_post_category'>{postCat.category}</div>
                                    <img src={postCat.media} alt='product_photo'/>
                                    <div className='search_product_title'>{postCat.title}</div>
                                    <span>${postCat.price}</span>
                                    <p>{postCat.description}</p>
                                    <div className='product_card_row'>
                                        <Link>View</Link>
                                        <button>Buy</button>
                                    </div>
                                </div>
                            );
                        })
                        setSearchResults(mappedCategories)
                    })
        } catch (err) {
            console.log(err)
        }
    };


    const handleDescriptionSearch = async () => {
        let body = { description: searchParams };
        try {
            await axios
                    .put('/user/store/searchdescription', body)
                    .then(res => {
                        const mappedDescriptions = res.data.map((postDescription, index) => {
                            return (
                                <div key={index} className='product_card'>
                                    <div className='search_post_category'>{postDescription.category}</div>
                                    <img src={postDescription.media} alt='product_photo'/>
                                    <div className='search_product_title'>{postDescription.title}</div>
                                    <span>${postDescription.price}</span>
                                    <p>{postDescription.description}</p>
                                    <div className='product_card_row'>
                                        <Link>View</Link>
                                        <button>Buy</button>
                                    </div>
                                </div>
                            );
                        })
                        setSearchResults(mappedDescriptions)
                    })
        } catch (err) {
            console.log(err)
        }
    };

    const handleStoreSearch = async () => {
        let body = { store: searchParams };
        try {
            await axios
                    .put('/user/store/searchitem', body)
                    .then(res => {
                        const mappedStoreItem = res.data.map((item, index) => {
                            return (
                                <div key={index} className='product_card'>
                                    <div className='search_post_category'>{item.category}</div>
                                    <img src={item.media} alt='product_photo'/>
                                    <div className='search_product_title'>{item.title}</div>
                                    <span>${item.price}</span>
                                    <p>{item.description}</p>
                                    <div className='product_card_row'>
                                        <Link>View</Link>
                                        <button>Buy</button>
                                    </div>
                                </div>
                            );
                        })
                        setSearchResults(mappedStoreItem)
                    })
        } catch (err) {
            console.log(err)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(e)
        if (searchParams === '') {
            setSearchResults('')
            return searchResults
        } else if (selectedFilter === 'title') {
            handleTitleSearch()
        } else if (selectedFilter === 'category') {
            handleCategorySearch()
        } else if (selectedFilter === 'description') {
            handleDescriptionSearch()
        } else if (selectedFilter === 'store') {
            handleStoreSearch()
        } else {
            return null;
        }
    };

    return (
        <div className='search_container'>
            <div className='entire_form'>
                <form className='search__input' onSubmit={handleSubmit}>
                    <select className='select_search' name='search-parameter' onChange={(e) => setFilter(e.target.value)}>
                        <option value='title'>Title</option>
                        <option value='category'>Category</option>
                        <option value='description'>Description</option>
                        <option value='store'>All</option>
                    </select>
                    <input
                        placeholder='Search products...'
                        type='text'
                        className='inputSearch'
                        value={item.title}
                        onChange={e => setSearchParams(e.target.value)}
                        />
                    <Button className='header__inputButton' onClick={handleSubmit}>
                        <SearchSharpIcon />
                    </Button>
                </form>
            </div>
            <div className='store_search'>{searchResults}</div>
        </div>
    );
}

export default Header;