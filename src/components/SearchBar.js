import React, { useState } from "react";
import { Link } from 'react-router-dom';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import axios from 'axios';
import '../styles/searchBar.css';


function Header(props) {
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
                        const mappedUsers = res.data.map(user => {
                            return (
                                <Link to={`/visitUserProfile/${user.user_id}`} key={user.user_id} className='link'>
                                    <div className='search_name'>
                                        <div>{user.first_name}</div>
                                        <div>{user.last_name}</div>
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
                        const mappedPosts = res.data.map(userPost => {
                            return (
                                <div key={userPost.post_id}>
                                    <div className='search_post'>
                                        <div className='search_post_category'>{userPost.category}</div>
                                        <div className='search_post_title'>{userPost.title}</div>
                                    </div>
                                </div>
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
                        const mappedCategories = res.data.map(postCat => {
                            return (
                                <div key={postCat.post_id}>
                                    <div className='search_category'>
                                        <div className='search_post_category'>{postCat.category}</div>
                                        <div className='search_post_title'>{postCat.title}</div>
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

    const handleTitleSearch = async () => {
        let body = { title: searchParams };
        try {
            await axios
                    .put('/explore/searchtitle', body)
                    .then(res => {
                        const mappedTitles = res.data.map(postTitle => {
                            return (
                                <div key={postTitle.post_id}>
                                    <div className='search_title'>
                                        <div className='search_post_category'>{postTitle.category}</div>
                                        <div className='search_post_title'>{postTitle.title}</div>
                                    </div>
                                </div>
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
                        const mappedDescriptions = res.data.map(postDescription => {
                            return (
                                <div key={postDescription.post_id}>
                                    <div className='search_description'>
                                        <div className='search_description_title'>{postDescription.title}</div>
                                        <div className='search_by_description'>{postDescription.description}</div>
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
                    <SearchSharpIcon className='header__inputButton' onClick={handleSubmit} />
                </form>
            </div>
            <div className='user_search' onMouseLeave={() => setSearchResults('')}>{searchResults}</div>
        </div>
    );
}

export default Header;