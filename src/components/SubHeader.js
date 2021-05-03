import React, {useState, useEffect} from 'react';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import PersonIcon from '@material-ui/icons/Person';
import { Button, CircularProgress } from "@material-ui/core";
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../styles/subHeader.css';
import '../styles/userDropdown.css';


export default function SubHeader() {
    const [viewOptions, setViewOptions] = useState(false);
    const [user, setUser] = useState();

    useEffect((props) => {
        axios.get('/auth/session')
            .then((res) => {
                setUser(res.data)
                props.getUser(res.data.user_id)
                console.log(res.data.user_id)
            })
            .catch(err => console.log(err))
    }, [])

    const logout = () => {
        axios.get('/auth/logout')
            .then(res => this.props.logout())
    };

    return (
        <div className='subContain' >

            <Button onClick={() => setViewOptions(!viewOptions)}>
                 <PersonIcon className='userIcon'/>
            </Button>
            { viewOptions ?
                <div className='optionContain'>                        
                    <Link to ='/user/userprofile' className='optionButton'>Update Profile </Link>
                    {/* <Link to ='/user/updateprofile' className='optionButton'>View Your Stats </Link> */}
                    <Link to='/' onClick={() => logout} className='optionButton' >Logout</Link>
                </div>
                
                : null 
                }
            <Button>
                <Link to='/user/cart'>
                    <ShoppingCartSharpIcon className='shoppingCart' />
                </Link>
            </Button>

            <Button>
                <Link to='/user/createpost'>
                    <AddCircleSharpIcon className='createTicket'/>
                </Link>
            </Button>

        </div>
    )
}
