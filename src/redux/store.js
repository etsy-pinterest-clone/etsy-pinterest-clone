import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers } from 'redux'
import userReducer from './userReducer'
import postReducer from './postReducer'

const rootReducer = combineReducers({
    userReducer,
    postReducer
})

export default createStore(rootReducer, composeWithDevTools());