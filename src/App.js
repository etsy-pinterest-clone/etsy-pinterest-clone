import React from 'react'
import Header from './components/Header'
import Landing from './components/Landing/Landing'
import routes from './routes/routes'
import {withRouter} from 'react-router-dom'

import './App.css'



function App() {
  return (
    <div className="App">
      <Header />
      <Landing />
      {routes}
    </div>
  );
}

export default withRouter(App);