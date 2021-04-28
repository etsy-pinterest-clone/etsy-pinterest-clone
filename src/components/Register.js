import React, { useState } from "react"
import { connect } from "react-redux"
import { useHistory } from 'react-router-dom'
import { loginUser } from '../redux/userReducer'
import axios from 'axios';



function Register (props) {
// first_name VARCHAR(255),
const [firstName, setFirstName] = useState('')
// last_name VARCHAR(255),
const [lastName, setLastName] = useState('')
// birthday DATE,
const [birthday, setBirthday] = useState('')
// phone_number INTEGER,
const [phone, setPhone] = useState('')
// email VARCHAR(200),
const [email, setEmail] = useState('')
// profile_pic TEXT,
const [profilePic, setProfilePic] = useState('')
// username VARCHAR(255),
const [username, setUsername] = useState('')
// password VARCHAR(255)
const [password, setPassword] = useState('')

const history = useHistory()


const handelRegSubmit = (e) => {
  e.preventDefault();
  const body = {
      firstName,
      lastName,
      birthday,
      phone,
      email,
      profilePic,
      username,
      password,
  }
  axios
  .post('/auth/register', body)
      .then(res => {
          props.loginUser(res.data);
          console.log(res.data)
      })
      .catch(err => console.log(err))
}


 


  return (
  <div className="regInputArea">
              <div className="regForm">
                <form>
                  <input
                    name='firstName'
                    value={firstName}
                    autoComplete="on"
                    placeholder="first name"
                    onChange={e => setFirstName(e.target.value)}
                    required
                  ></input>
                  <br />
                  <input
                    name='lastName'
                    value={lastName}
                    autoComplete="on"
                    placeholder="last name"
                    onChange={e => setLastName(e.target.value)}
                    required
                  ></input>
                  <br />
                  <input
                    name='birthday'
                    value={birthday}
                    autoComplete="on"
                    placeholder="mmddyyyy"
                    onChange={e => setBirthday(e.target.value)}
                  ></input>
                  <br />
                  <input
                  name='phone'
                  value={phone}
                    autoComplete="on"
                    placeholder="(999)999-9999"
                    onChange={e => setPhone(e.target.value)}
                  ></input>
                  <br />
                  <input
                  name='email'
                  value={email}
                    autoComplete="on"
                    placeholder="example@fake.com"
                    onChange={e => setEmail(e.target.value)}
                    required
                  ></input>
                  <br />
                  <label for='profilePic'>Select a file:</label>
                  <input
                    name='profilePic'
                    value={profilePic}
                    type='file'
                    accept="image/png, image/jpeg"
                    onChange={e => setProfilePic(e.target.value)}
                  ></input>
                  <br />
                    <input
                    name='username'
                    value={username}
                      autoComplete="on"
                      placeholder="username"
                      onChange={e => setUsername(e.target.value)}
                      required
                    ></input>
                  <br />
                  <input
                  name='password'
                  value={password}
                    autoComplete="on"
                    type="password"
                    placeholder="set password"
                    onChange={e => setPassword(e.target.value)}
                    required
                  ></input>
                  <br />
                </form>
                <button onClick={handelRegSubmit}>register</button>
                <button onClick={() => history.push('/')}>cancel</button>
              </div>
            </div>
  );
}


const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, {loginUser})(Register);