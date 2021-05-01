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
import SearchBar from './SearchBar';
import axios from 'axios';
import '../styles/Header.css';


function Header(props) {

    const history = useHistory();
            
    const logout = () => {
        axios.get('/auth/logout')
            .then(history.push('/'))
            .catch(err => console.log(err))
    };

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
                <Button onClick={() => history.push('/contact')}>Contact</Button>
                <Button onClick={() => history.push('/about')}>About</Button>
            </div>

            <SearchBar />

            <div className='header__right'>
                <Button onClick={() => logout()}>
                    <ExitToAppSharpIcon />
                </Button>
            </div>

        </div>

    )
}

const mapStateToProps = (state) => { return state };
export default connect(mapStateToProps, { updateUser })(Header);
