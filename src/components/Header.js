import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Button, CircularProgress } from "@material-ui/core";
import { routes } from '../routes/routes';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import ContactsSharpIcon from '@material-ui/icons/ContactsSharp';
import InfoSharpIcon from '@material-ui/icons/InfoSharp';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import { connect } from "react-redux";
import { updateUser } from '../redux/userReducer';
import userReducer from '../redux/userReducer';
import Login from './Login';
import axios from 'axios';
import '../styles/Header.css';


function Header(props) {
    const [ name, setName ] = useState([]);
    const [ users, setUsers ] = useState([]);
    const history = useHistory();

    const handleUserSearch = async (e) => {
        e.preventDefault();
        let body = { name }
        try {
            await axios
                    .put('/explore/search', body)
                    .then(res => {
                        console.log(res.data)
                        setName(res.data)
                        setUsers(res.data)
                    })
                } catch (err) {
                    console.log(err)
            }
        };
            
    const logout = () => {
        axios.get('/auth/logout')
            .then(history.push('/'))
            .catch(err => console.log(err))
    };

    const mappedUsers = users.map(user => {
        return (
            <div key={user.user_id}>
                <div>{user.first_name}</div>
                <div>{user.last_name}</div>
            </div>
        )
    })
    
    console.log(mappedUsers)

    return (


        <div className='header'>
            <div className='header__left'>
                <Button >
                    <img
                        className='header__logo'
                        src='https://seeklogo.com/images/P/pinterest-logo-8561DDA2E1-seeklogo.com.png'
                        alt='Pinterest Logo'
                    />

                </Button>
                <Button className='authBtn' onClick={() => history.push('/login')} >
                    <ContactsSharpIcon />
                </Button>
                <Button><Link to="/contact">Contact</Link></Button>
            </div>
            <form className='header__input' onSubmit={handleUserSearch} >
                <input
                    placeholder='Search...'
                    type='text'
                    className='header__inputSearch'
                    value={name.first_name, name.last_name}
                    onChange={e => setName(e.target.value)}
                    />
                <SearchSharpIcon className='header__inputButton' />
            </form>
            <div className='header__right'>
                <Button onClick={() => logout()}>
                    <ExitToAppSharpIcon />
                </Button>
            </div>

            <div className='user-search'>{mappedUsers}</div>
        </div>

    )
}

const mapStateToProps = (state) => { return state };
export default connect(mapStateToProps, { updateUser })(Header);
