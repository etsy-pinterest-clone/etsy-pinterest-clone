
// INITIAL STATE
const initialState = {
    user: {},
}

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
    return {
     }
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
                return {
                    state,
                }

        default: return state;
    }
};
// Reducer(state = initialState, action) {
//     switch(action.type) {
//         case LOGIN_USER:
//             return {
//                 ...state,
//                 user: action.payload.user
//             }                
//         case LOGOUT_USER:
//          return {
//              ...state
//          }
//         ca
//         case UPDATE_USER:
//             return {
//                 ...state,
//                 ...action.payload
//             }
            // se GET_USER:
//                 return {
//                     ...state,
//                     ...action.payload,
//                 }                  default: return state;
// 
//      
// }           
//         case LOGIN_USER:
//             return {
//                 ...state,
//                 user: action.payload.user,
//             }
//         case UPDATE_USER:
//             return {
//                 ...state,
//                 ...action.payload
//             }
//         case LOGOUT_USER:
//             return initialState;
//         default: return state;
//     }
// }