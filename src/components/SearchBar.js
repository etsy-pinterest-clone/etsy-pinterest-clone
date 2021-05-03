import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import axios from 'axios';
import '../styles/searchBar.css';

    /* all searchPost/searchCategory/searchTitle functionality has been commented out but does in fact work. A separate search bar or a different idea for searching is need because the search bar cannot search for both ( or I don't know how to accomplish that, also not sure that we want that ) */

function Header(props) {
    const [ name, setName ] = useState([]);

    const [ post, setPost ] = useState([]);

    const [ category, setCategory ] = useState([]);

    const [ title, setTitle ] = useState([]);

    const [ description, setDescription ] = useState([]);
    const [ descriptions, setDescriptions ] = useState([]);

    const [ selectedFilter, setFilter ] = useState('name');

    const [ searchParams, setSearchParams ] = useState('');

    const [ searchResults, setSearchResults ] = useState(null);

    const history = useHistory();


    const handleUserSearch = async (e) => {
        let body = { name: searchParams };
        try {
            await axios
                    .put('/explore/search', body)
                    .then(res => {
                        const mappedUsers = res.data.map(user => {
                            return (
                                <div key={user.user_id}>
                                    <div className='name'>
                                        <div>{user.first_name}</div>
                                        <div>{user.last_name}</div>
                                    </div>
                                </div>
                            );
                        })
                        setSearchResults(mappedUsers)
                        setName(res.data)
                    })
                } catch (err) {
                    console.log(err)
            }
    };

    const handlePostSearch = async (e) => {
        let body = { post: searchParams };
        try {
            await axios
                    .put('/explore/searchpost', body)
                    .then(res => {
                        const mappedPosts = res.data.map(userPost => {
                            return (
                                <div key={userPost.post_id}>
                                    <div className='post'>
                                        <div>{userPost.category}</div>
                                        <div>{userPost.title}</div>
                                        <div>{userPost.description}</div>
                                    </div>
                                </div>
                            );
                        })
                        setSearchResults(mappedPosts)
                        setPost(res.data)
                    })
        } catch (err) {
            console.log(err)
        }
    };

    const handleCategorySearch = async (e) => {
        let body = { category: searchParams };
        try {
            await axios
                    .put('/explore/searchcategory', body)
                    .then(res => {
                        const mappedCategories = res.data.map(postCat => {
                            return (
                                <div key={postCat.post_id}>
                                    <div className='category'>
                                        <div>{postCat.category}</div>
                                        <div>{postCat.title}</div>
                                        <div>{postCat.description}</div>
                                    </div>
                                </div>
                            );
                        })
                        setSearchResults(mappedCategories)
                        setCategory(res.data)
                    })
        } catch (err) {
            console.log(err)
        }
    };

    const handleTitleSearch = async (e) => {
        let body = { title: searchParams };
        try {
            await axios
                    .put('/explore/searchtitle', body)
                    .then(res => {
                        const mappedTitles = res.data.map(postTitle => {
                            return (
                                <div key={postTitle.post_id}>
                                    <div className='title'>
                                    <div>{postTitle.category}</div>
                                    <div>{postTitle.title}</div>
                                    <div>{postTitle.description}</div>
                                    </div>
                                </div>
                            );
                        })
                        setSearchResults(mappedTitles)
                        setTitle(res.data)
                    })
        } catch (err) {
            console.log(err)
        }
    };

    const handleDescriptionSearch = async (e) => {
        let body = { description: searchParams };
        try {
            await axios
                    .put('/explore/searchdescription', body)
                    .then(res => {
                        const mappedDescriptions = res.data.map(postDescription => {
                            return (
                                <div key={postDescription.post_id}>
                                    <div className='description'>
                                        <div>{postDescription.category}</div>
                                        <div>{postDescription.title}</div>
                                        <div>{postDescription.description}</div>
                                    </div>
                                </div>
                            );
                        })
                        setSearchResults(mappedDescriptions)
                        setDescription(res.data)
                    })
        } catch (err) {
            console.log(err)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(e)
        if (selectedFilter === 'name') {
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
            return null
        }
    }

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
                        required
                        placeholder='Search...'
                        type='text'
                        className='header__inputSearch'
                        value={name.first_name, name.last_name}
                        onChange={e => setSearchParams(e.target.value)}
                        />
                    <SearchSharpIcon className='header__inputButton' onClick={handleSubmit} />
                </form>
            </div>
            <div className='user_search'>{searchResults}</div>
        </div>
    );
}

export default Header;