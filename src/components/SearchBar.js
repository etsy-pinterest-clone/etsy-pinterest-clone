import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import axios from 'axios';
import '../styles/searchBar.css';

    /* all searchPost/searchCategory/searchTitle functionality has been commented out but does in fact work. A separate search bar or a different idea for searching is need because the search bar cannot search for both ( or I don't know how to accomplish that, also not sure that we want that ) */

function Header(props) {
    const [ name, setName ] = useState([]);
    const [ users, setUsers ] = useState([]);

    const [ post, setPost ] = useState([]);
    const [ posts, setPosts] = useState([]);

    const [ category, setCategory ] = useState([]);
    const [ categories, setCategories ] = useState([]);

    const [ title, setTitle ] = useState([]);
    const [ titles, setTitles ] = useState([]);

    const [ description, setDescription ] = useState([]);
    const [ descriptions, setDescriptions ] = useState([]);

    const history = useHistory();

    const handleUserSearch = async (e) => {
        e.preventDefault();
        let body = { name };
        try {
            await axios
                    .put('/explore/search', body)
                    .then(res => {
                        setName(res.data)
                        setUsers(res.data)
                    })
                } catch (err) {
                    console.log(err)
            }
    };

    const handlePostSearch = async (e) => {
        e.preventDefault();
        let body = { post };
        try {
            await axios
                    .put('/explore/searchpost', body)
                    .then(res => {
                        setPost(res.data)
                        setPosts(res.data)
                    })
        } catch (err) {
            console.log(err)
        }
    };

    const handleCategorySearch = async (e) => {
        e.preventDefault();
        let body = { category };
        try {
            await axios
                    .put('/explore/searchcategory', body)
                    .then(res => {
                        setCategory(res.data)
                        setCategories(res.data)
                    })
        } catch (err) {
            console.log(err)
        }
    };

    const handleTitleSearch = async (e) => {
        e.preventDefault();
        let body = { title };
        try {
            await axios
                    .put('/explore/searchtitle', body)
                    .then(res => {
                        setTitle(res.data)
                        setTitles(res.data)
                    })
        } catch (err) {
            console.log(err)
        }
    };

    const handleDescriptionSearch = async (e) => {
        e.preventDefault();
        let body = { description };
        try {
            await axios
                    .put('/explore/searchdescription', body)
                    .then(res => {
                        setDescription(res.data)
                        setDescriptions(res.data)
                    })
        } catch (err) {
            console.log(err)
        }
    };

    const mappedUsers = users.map(user => {
        return (
            <div key={user.user_id}>
                <div className='name'>
                    <div>{user.first_name}</div>
                    <div>{user.last_name}</div>
                </div>
            </div>
        );
    })
    // console.log(mappedUsers)

    const mappedPosts = posts.map(userPost => {
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

    const mappedCategories = categories.map(postCat => {
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

    const mappedTitles = titles.map(postTitle => {
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

    const mappedDescriptions = descriptions.map(postDescription => {
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

    


    return (


        <div className='search_container'>
            <div className='search_select_form'>
                <form className='header__input' onSubmit={handleUserSearch} /* {handlePostSearch} {handleCategorySearch} {handleTitleSearch} {handleDescriptionSearch} */>

                    <select className='search_by' name='search-parameter' placeholder='Search By...'>
                        <option value={name}>Name</option>
                        <option value={post}>Posts</option>
                        <option value={category}>Category</option>
                        <option value={title}>Title</option>
                        <option value={description}>Description</option>
                    </select>
                    
                    <input
                        placeholder='Search...'
                        type='text'
                        className='header__inputSearch'
                        value={name.first_name, name.last_name, post.title} // {post.title} {category.title} {title.title} {description.title}
                        onChange={e => setName(e.target.value)}
                        // onChange={e => setPost(e.target.value)}
                        // onChange={e => setCategory(e.target.value)}
                        // onChange={e => setTitle(e.target.value)}
                        // onChange={e => setDescription(e.target.value)}
                        />
                    <SearchSharpIcon className='header__inputButton' onClick={handleUserSearch} />
                </form>
            </div>
            <div className='user_search'>{mappedUsers}</div>
            {/* <div className='user-search'>{mappedPosts}</div> */}
            {/* <div className='user-search'>{mappedCategories}</div> */}
            {/* <div className='user-search'>{mappedTitles}</div> */}
            {/* <div className='user-search'>{mappedDescriptions}</div> */}
        </div>

    )
}

export default Header;