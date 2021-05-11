import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Button } from "@material-ui/core";
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import axios from 'axios';
import '../styles/searchBar.css';
import '../styles/storeSearchBar.css';

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
                                <div key={index} className='search_title'>
                                    {/* rendering all of these just to make sure it is working... */}                
                                    <div className='search_post_category'>{postTitle.category}</div>
                                    <div className='search_post_title'>{postTitle.title}</div>
                                    <div className='search_post_title'>{postTitle.description}</div>
                                    <div className='search_post_title'>${postTitle.price}</div>
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
                                <div key={index} className='search_category'>
                                    <div className='search_post_category'>{postCat.category}</div>
                                    <div className='search_post_title'>{postCat.title}</div>
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
                                <div key={index} className='search_description'>
                                    <div className='search_description_title'>{postDescription.title}</div>
                                    <div className='search_by_description'>{postDescription.description}</div>
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
                                <div key={index} className='search_item'>
                                    <div className='search_store_item'>{item.title}</div>
                                    <div className='store_item_price'>${item.price}</div>
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