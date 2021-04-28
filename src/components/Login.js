import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateUser} from '../redux/userReducer' 



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        errorMsg: ''
    }
  }
  

  handleChange = (prop, val) => {
    this.setState({
        [prop]: val
    })
  }

  login = () => {
    // e.preventDefault();
    axios.post('/auth/login', this.state)
        .then(res => {
            // const history = useHistory(); // hook?
            this.props.updateUser({username: res.data.username, id: res.data.user_id, isAdmin: res.data.is_admin})

            this.props.history.push('/user/dash') 
            // console.log(this.props)
        })
        .catch(err => {
            console.log(err)
            this.setState({errorMsg: 'Incorrect username or password'})
        })
  }

  closeErrorMessage = () => {
    this.setState({
        username: '',
        password: '',
        errorMsg: false
    })
}

    render() {
      return (
        <div className="logInArea">
         <input autoComplete='on' type='username' placeholder='username' onChange={e => this.handleChange('username', e.target.value)} required></input><br/>
         <input autoComplete='on' type='password' placeholder='password' onChange={e => this.handleChange('password', e.target.value)} required></input><br/>
         <div>
         {this.state.errorMsg && <h3 className='auth-error-msg'>{this.state.errorMsg} <span onClick={this.closeErrorMessage}>X</span></h3>}
         </div>
           <button onClick={() => this.login()} >login</button><br/>
           <Link className='register' to='/signup'>Signup instead</Link>
           {/* <button onClick={() => history.push('/signup')}>Signup instead</button> */}
        </div>
      );
    }
}

const mapStateToProps = (state) => {return state}
export default connect(mapStateToProps, {updateUser})(Login);