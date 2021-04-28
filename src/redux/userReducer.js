// INITIAL STATE
const initialState = {
    user: {},
}

// ACTION TYPES
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const UPDATE_USER = 'UPDATE_USER';



// ACTION CREATORS

export function loginUser(user) {
    return {
        type: LOGIN_USER,
        payload:{
             user,
        }
        
    }
}
export function logoutUser() {
    return {
        type: LOGOUT_USER,
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
    switch(action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload.user,
            }
        case UPDATE_USER:
            return {
                ...state,
                ...action.payload
            }
        case LOGOUT_USER:
            return initialState;
        default: return state;
    }
}