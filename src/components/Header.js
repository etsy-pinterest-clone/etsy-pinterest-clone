import React, {useState} from "react";
import ReactTooltip from "react-tooltip";
import {useMediaQuery} from 'react-responsive';
import { Link, useHistory } from 'react-router-dom';
import { Button } from "@material-ui/core";
import { routes } from '../routes/routes';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EmailIcon from '@material-ui/icons/Email';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import ContactsSharpIcon from '@material-ui/icons/ContactsSharp';
import InfoSharpIcon from '@material-ui/icons/InfoSharp';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import { connect } from "react-redux";
import { updateUser, logoutUser } from '../redux/userReducer';
import userReducer from '../redux/userReducer';
import Login from './Login';
import SearchBar from './SearchBar';
import axios from 'axios';
import logo2 from './Landing/images/logo2.png'
import '../styles/Header.css';


function Header(props) {

    const history = useHistory();
    const desktop = useMediaQuery({minWidth: 450});
    const  [view, setView] = useState(false);
            
    const logout = () => {
        try {
            axios
                .delete('/auth/logout')
                .then(() => {
                    props.logoutUser()
                    history.replace('/')
                })
        } catch (err) {
            console.log(err)
        }
    };

    const searchClick = () => {
        setView(!view)
    }

    return (
        <div>
            { desktop ?
            <div className='header'>
                <div className='header__left'>
                    <div className='homeBtn'>
                    <Button data-tip data-for="homeTip" onClick={() => history.push('/')}><img className='logo2' src={logo2} alt='logo' /></Button>
                    <ReactTooltip id='homeTip' place='bottom' effect='solid' className='tooltiptext'>Home Page</ReactTooltip>   
                    </div>
                    <Button data-tip data-for="authTip" className='authBtn' onClick={() => history.push("/login")}><AccountBoxIcon/></Button>
                    <ReactTooltip id='authTip' place='bottom' effect='solid'>Login/ Register</ReactTooltip>
                    <Button data-tip data-for="contactTip" onClick={() => history.push('/contact')}><EmailIcon/></Button>
                    <ReactTooltip id='contactTip' place='bottom' effect='solid'>Send us a message</ReactTooltip>
                    <Link to='/explore' className="exploreLink">Explore</Link>
                </div>            
                    <SearchBar />
                <div className='header__right'>
                    <Button data-tip data-for="logoutTip" onClick={logout}>
                        <ExitToAppSharpIcon />
                    </Button>
                    <ReactTooltip id='logoutTip' place='bottom' effect='solid'>Logout</ReactTooltip>
                </div>
            </div>
            :
            <div className='header'>
            <div className='header__left'>
                <div className='homeBtn'>
                <Button data-tip data-for="homeTip" onClick={() => history.push('/')}><img className='logo2' src={logo2} alt='logo' /></Button>
                <ReactTooltip id='homeTip' place='bottom' effect='solid' className='tooltiptext'>Home Page</ReactTooltip>   
                </div>
            </div>            
            <div className='header__right'>
                <Button data-tip data-for="authTip" className='authBtn' onClick={() => history.push("/login")}><AccountBoxIcon/></Button>
                <ReactTooltip id='authTip' place='bottom' effect='solid'>Login/ Register</ReactTooltip>
                <Button data-tip data-for="contactTip" onClick={() => history.push('/contact')}><EmailIcon/></Button>
                <ReactTooltip id='contactTip' place='bottom' effect='solid'>Send us a message</ReactTooltip>
                <Link to='/explore' className="exploreLink">Explore</Link>
                <Button onClick={searchClick}>
                    <SearchSharpIcon className='search'></SearchSharpIcon>
                </Button>
                { view ? 
                <div className='searchbar' >
                    <SearchBar />
                </div>
                : null
                }
                {/* <Button data-tip data-for="logoutTip" onClick={logout}>
                    <ExitToAppSharpIcon />
                </Button>
                <ReactTooltip id='logoutTip' place='bottom' effect='solid'>Logout</ReactTooltip> */}
            </div>
        </div>

            }
        </div>

    )
}

const mapStateToProps = (state) => { return state };
export default connect(mapStateToProps, { updateUser, logoutUser })(Header);
