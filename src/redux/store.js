import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers } from 'redux'
import userReducer from './userReducer'

const rootReducer = combineReducers({
    userReducer,
})

export default createStore(rootReducer, composeWithDevTools());