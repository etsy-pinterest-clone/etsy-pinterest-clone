import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { HashRouter, BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import {DataProvider} from './GlobalState';
const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <DataProvider>
          <App />
        </DataProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
