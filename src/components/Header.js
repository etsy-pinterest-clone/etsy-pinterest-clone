import React from 'react'
import SearchSharpIcon from '@material-ui/icons/SearchSharp'
import ContactsSharpIcon from '@material-ui/icons/ContactsSharp'
import InfoSharpIcon from '@material-ui/icons/InfoSharp'
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import '../styles/Header.css'

function Header() {
    return (
        <div className='header'>
            <div className='header__left'>
                <img
                className='header__logo'
                src='https://seeklogo.com/images/P/pinterest-logo-8561DDA2E1-seeklogo.com.png'
                alt='Pinterest Logo'
                />
                <ContactsSharpIcon />
            </div>
            <div className='header__input' >
                <input placeholder='search' type='text' className='header__inputSearch'/>  
                <SearchSharpIcon className='header__inputButton'/>
                         
            </div>
            <div className='header__right'>
                <ExitToAppSharpIcon />
            </div>

        </div>
    )
}

export default Header

// const mapStateToProps = (reduxState) => reduxState;

// export default connect(mapStateToProps)(Header);