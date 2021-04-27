import React, { useState } from "react"
import { connect } from "react-redux"
function Register () {

return (
<div className="regInputArea">
            <div className="regForm">
              <form>
                <input
                  name='name'
                  value={name}
                  autoComplete="on"
                  placeholder="*name"
                  onChange={e => setName(e.target.value)}
                  required
                ></input>
                <br />
                <input
                name='email'
                value={email}
                  autoComplete="on"
                  placeholder="*email"
                  onChange={e => setEmail(e.target.value)}
                  required
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
                name='password'
                value={password}
                  autoComplete="on"
                  type="password"
                  placeholder="*set password"
                  onChange={e => setPassword(e.target.value)}
                  required
                ></input>
                <br />
              </form>
              <button onClick={handelRegSubmit}>register</button>
              <button onClick={regForm}>cancel</button>
            </div>
          </div>
)
const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Register);