import React from 'react'
import { Route, Switch } from 'react-router-dom'
import App from '../App'
import Login from '../components/Login'
import Register from '../components/Register'


export default (

    
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Register}/>
    </Switch>
  );