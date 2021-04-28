import React from 'react'
import { useHistory } from 'react-router-dom'
import Register from './Register'


function Login() {
  
  const history = useHistory()
       
    return (
        <div className="logInArea">
         <input autoComplete='on' type='username' placeholder='username' required></input><br/>
         <input autoComplete='on' type='password' placeholder='password' required></input><br/>
           <button >login</button><br/>
           <button onClick={() => history.push('/signup')}>Signup instead</button>

        </div>

       );
}
          
export default Login;