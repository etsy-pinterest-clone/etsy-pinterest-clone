import React from 'react'
import Header from './components/Header'
import Login from './components/Login'
import routes from './routes/routes'
import {withRouter} from 'react-router-dom'

import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Login /> */}
      {routes}
    </div>
  );
}

export default withRouter(App);