import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import {DataProvider} from './GlobalState'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <DataProvider>
          <App />
        </DataProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
