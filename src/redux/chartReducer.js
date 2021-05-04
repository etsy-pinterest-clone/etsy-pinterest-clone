// INITIAL STATE
const initialState = {
    userData: {},
    storeData: {}
}


// ACTION TYPES
const GET_USER_DATA = 'GET_USER_DATA';
const UPDATE_USER_DATA = 'UPDATE_USER_DATA';

const GET_STORE_DATA = 'GET_USER_DATA';
const UPDATE_STORE_DATA = 'UPDATE_USER_DATA';



// ACTION CREATORS
export function getUserData(userData){
    return {
        type: GET_USER_DATA,
        payload: userData
   }
}

export function updateUserData(userData){
    return {
        type: UPDATE_USER_DATA,
        payload: userData
    }
}

export function getStoreData(storeData){
    return {
        type: GET_USER_DATA,
        payload: storeData
   }
}

export function updateStoreData(storeData){
    return {
        type: UPDATE_USER_DATA,
        payload: storeData
    }
}


// REDUCER dfault function 
export default function reducer(state = initialState, action) {
    switch(action.type){
        case GET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case GET_STORE_DATA:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_STORE_DATA:
            return {
                ...state,
                ...action.payload
            }

        default: return state;
    }
};