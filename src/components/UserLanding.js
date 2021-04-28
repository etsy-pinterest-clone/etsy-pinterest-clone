import React, { useState, useEffect } from 'react';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import { Button, CircularProgress } from "@material-ui/core";
import UserPosts from './UserPosts';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserLanding = () => {
    const [user, setUser] = useState();

    useEffect((props) => {
        axios.get('/auth/session')
            .then((res) => {
                setUser(res.data)
                props.updateUser(res.data.user_id)
                console.log(res.data.user_id)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <Button>
                <Link to='/user/createpost'>
                    <AddCircleSharpIcon />
                </Link>
            </Button>
            <UserPosts />
        </div>
    )
}

export default UserLanding;