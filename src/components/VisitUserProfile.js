import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import '../styles/visitUserProfile.css'


// This component will serve as the component that dynamically
// renders other users' profiles after being linked here from 
// SearchBar.js

const VisitUserProfile = (props) => {
    // console.log(props)
    const history = useHistory();

    const [ result, setResult ] = useState([]);
    
    let { id } = useParams();
    console.log(id)

    useEffect(() => {
        axios
            .get(`/user/posts/${id}`)
            .then(res => {
                const userPosts = res.data.map(post => {
                    return (
                        <div>
                            <div>{post.title}</div>
                            <div>{post.description}</div>
                        </div>
                    );
                })
                setResult(userPosts)
                // console.log(res.data)
            })
            .catch(err => console.log(err));
    })

    return (
        <div className='visit_profile'>
            <button className='back_btn' onClick={() => history.goBack()}>&#8678;</button>
            user profile info to be added
            {result}
        </div>
    );
}

export default VisitUserProfile