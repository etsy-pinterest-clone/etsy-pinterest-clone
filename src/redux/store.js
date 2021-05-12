import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers } from 'redux';
import userReducer from './userReducer';
import postReducer from './postReducer';
import productReducer from './productReducer'

const rootReducer = combineReducers({
    userReducer,
    postReducer,
    productReducer
})

export default createStore(rootReducer, composeWithDevTools());