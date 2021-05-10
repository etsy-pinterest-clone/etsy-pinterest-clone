import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Button } from "@material-ui/core";
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import axios from 'axios';
import '../styles/searchBar.css';


function Header() {
    const [ name, setName ] = useState([]);

    const [ selectedFilter, setFilter ] = useState('name');

    const [ searchParams, setSearchParams ] = useState('');

    const [ searchResults, setSearchResults ] = useState(null);


    const handleUserSearch = async () => {
        let body = { name: searchParams };
        try {
            await axios
                    .put('/explore/search', body)
                    .then(res => {
                        const mappedUsers = res.data.map((user, index) => {
                            return (
                                <Link to={`/visitUserProfile/${user.user_id}`} key={index} className='search_link'>
                                    <div className='search_name'>
                                        <div>{user.username}</div>
                                    </div>
                                </Link>
                            );
                        })
                        setSearchResults(mappedUsers)
                        setName(res.data)
                    })
        } catch (err) {
            console.log(err)
        }
    };

    const handlePostSearch = async () => {
        let body = { post: searchParams };
        try {
            await axios
                    .put('/explore/searchpost', body)
                    .then(res => {
                        const mappedPosts = res.data.map((userPost, index) => {
                            return (
                                <Link to={`/visitUserProfile/${userPost.user_id}`} key={index} className='search_link'>
                                    <div className='search_post'>
                                        <div className='search_post_category'>{userPost.category}</div>
                                        <div className='search_post_title'>{userPost.title}</div>
                                    </div>
                                </Link>
                            );
                        })
                        setSearchResults(mappedPosts)
                    })
        } catch (err) {
            console.log(err)
        }
    };

    const handleCategorySearch = async () => {
        let body = { category: searchParams };
        try {
            await axios
                    .put('/explore/searchcategory', body)
                    .then(res => {
                        const mappedCategories = res.data.map((postCat, index) => {
                            return (
                                <Link to={`/visitUserProfile/${postCat.user_id}`} key={index} className='search_link'>
                                    <div className='search_category'>
                                        <div className='search_post_category'>{postCat.category}</div>
                                        <div className='search_post_title'>{postCat.title}</div>
                                    </div>
                                </Link>
                            );
                        })
                        setSearchResults(mappedCategories)
                    })
        } catch (err) {
            console.log(err)
        }
    };

    const handleTitleSearch = async () => {
        let body = { title: searchParams };
        try {
            await axios
                    .put('/explore/searchtitle', body)
                    .then(res => {
                        const mappedTitles = res.data.map((postTitle, index) => {
                            return (
                                <Link to={`/visitUserProfile/${postTitle.user_id}`} key={index} className='search_link'>
                                    <div className='search_title'>
                                        <div className='search_post_category'>{postTitle.category}</div>
                                        <div className='search_post_title'>{postTitle.title}</div>
                                    </div>
                                </Link>
                            );
                        })
                        setSearchResults(mappedTitles)
                    })
        } catch (err) {
            console.log(err)
        }
    };

    const handleDescriptionSearch = async () => {
        let body = { description: searchParams };
        try {
            await axios
                    .put('/explore/searchdescription', body)
                    .then(res => {
                        const mappedDescriptions = res.data.map((postDescription, index) => {
                            return (
                                <Link to={`/visitUserProfile/${postDescription.user_id}`} key={index} className='search_link'>
                                    <div className='search_description'>
                                        <div className='search_description_title'>{postDescription.title}</div>
                                        <div className='search_by_description'>{postDescription.description}</div>
                                    </div>
                                </Link>
                            );
                        })
                        setSearchResults(mappedDescriptions)
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
        } else if (selectedFilter === 'name') {
            handleUserSearch()       
        } else if (selectedFilter === 'post') {
            handlePostSearch()
        } else if (selectedFilter === 'category') {
            handleCategorySearch()
        } else if (selectedFilter === 'title') {
            handleTitleSearch()
        } else if (selectedFilter === 'description') {
            handleDescriptionSearch()
        } else {
            return null;
        }
    };

    return (
        <div className='search_container'>
            <div className='search_select_form'>
                <form className='header__input' onSubmit={handleSubmit}>
                    <select className='search_by' name='search-parameter' onChange={(e) => setFilter(e.target.value)}>
                        <option value='name'>Name</option>
                        <option value='post'>Posts</option>
                        <option value='category'>Category</option>
                        <option value='title'>Title</option>
                        <option value='description'>Description</option>
                    </select>
                    <input
                        placeholder='Search...'
                        type='text'
                        className='header__inputSearch'
                        value={name.first_name, name.last_name}
                        onChange={e => setSearchParams(e.target.value)}
                        />
                    <Button className='header__inputButton' onClick={handleSubmit}>
                        <SearchSharpIcon />
                    </Button>
                </form>
            </div>
            <div className='user_search' onMouseLeave={() => setSearchResults('')}>{searchResults}</div>
        </div>
    );
}

export default Header;