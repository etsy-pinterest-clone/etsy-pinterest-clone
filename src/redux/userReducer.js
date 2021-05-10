import axios from 'axios';

// INITIAL STATE
const initialState = {
    user: {}
};

// ACTION TYPES
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const GET_USER = 'GET_USER';
const UPDATE_USER = 'UPDATE_USER';



// ACTION CREATORS

export function loginUser(user) {
    return {
        type: LOGIN_USER
    }
}

export function logoutUser() {
    axios.delete('/auth/logout')
        .then(response => response.data)
        .catch(err => console.log(err));

        return {
            type: LOGOUT_USER
        };
}




export function getUser(user){
    return {
        type: GET_USER,
        payload: user
   }
}

export function updateUser(user){
    return {
        type: UPDATE_USER,
        payload: user
    }
};

// REDUCER dfault function 


export default function reducer(state = initialState, action) {
    switch(action.type){
        case LOGIN_USER:
            return {
                ...state,
                ...action.payload
            }
        case GET_USER:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_USER:
            return {
                ...state,
                ...action.payload
            }
        case LOGOUT_USER:
                return initialState;

        default: 
            return state;
    }
};
