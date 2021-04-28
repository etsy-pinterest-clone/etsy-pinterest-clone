import React, { useState } from "react"
import { Link, useHistory } from 'react-router-dom'
import { Button, CircularProgress } from "@material-ui/core"
import { routes } from '../routes/routes'
import SearchSharpIcon from '@material-ui/icons/SearchSharp'
import ContactsSharpIcon from '@material-ui/icons/ContactsSharp'
import InfoSharpIcon from '@material-ui/icons/InfoSharp'
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp'
import { connect } from "react-redux"
import Login from './Login'
import '../styles/Header.css'

function Header(props) {
const history = useHistory()


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
                <Button onClick={() => history.push('/login')} >
                        <ContactsSharpIcon />
                </Button>
            </div>
            <div className='header__input' >
                <input placeholder='search' type='text' className='header__inputSearch'/>  
                <SearchSharpIcon className='header__inputButton'/>
                         
            </div>
            <div className='header__right'>
                <Button>
                    <ExitToAppSharpIcon />
                </Button>
            </div>

        </div>
        
    )
}

export default Header
