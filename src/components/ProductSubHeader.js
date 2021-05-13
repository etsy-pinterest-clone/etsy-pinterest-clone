import React, {useState, useEffect} from 'react';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import PersonIcon from '@material-ui/icons/Person';
import { Button, CircularProgress } from "@material-ui/core";
import StorefrontSharpIcon from '@material-ui/icons/StorefrontSharp';
import DashboardSharpIcon from '@material-ui/icons/DashboardSharp';
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import '../styles/subHeader.css';
import '../styles/userDropdown.css';


const ProductSubHeader = (props) => {
    const [viewOptions, setViewOptions] = useState(false);
    const [user, setUser] = useState();

    const history = useHistory();

    useEffect((props) => {
        axios.get('/auth/session')
            .then((res) => {
                setUser(res.data)
                props.getUser(res.data.user_id)
                // console.log(res.data.user_id)
            })
            .catch(err => console.log(err))
    }, [])

    const logout = () => {
        axios.get('/auth/logout')
            .then(() => {
                props.logout();
                history.replace('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='subContain' >

            <Button onClick={() => setViewOptions(!viewOptions)}>
                 <PersonIcon className='userIcon'/>
            </Button>
            { viewOptions ?
                <div className='optionContain'>                        
                    <Link to ='/user/userprofile' className='optionButton'>Update Profile </Link>
                    <Link to ='/user/userdata' className='optionButton'>My Profile Data </Link>
                    <Link to ='/user/storedata' className='optionButton'>My Store Data </Link>
                    {/* <Link to ='/user/updateprofile' className='optionButton'>View Your Stats </Link> */}
                    <div onClick={logout} className='optionButton' >Logout</div>
                </div>
                
                : null 
                }
            <div className='cart_ticket'>
                <Button>
                    <Link to='/user/cart'>
                        <ShoppingCartSharpIcon className='shoppingCart' />
                    </Link>
                </Button>

            <Button>
                <Link to='/user/dash'>
                    <DashboardSharpIcon className='shoppingCart' />
                </Link>
            </Button>

            <Button>
                <Link to='/user/store/createitem'>
                    <AddCircleSharpIcon className='createTicket'/>
                </Link>
            </Button>

            </div>
        </div>
    )
}

export default ProductSubHeader;
