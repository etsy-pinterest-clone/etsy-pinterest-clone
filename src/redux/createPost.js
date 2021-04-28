const initialState = {
    post: {}
}

const CREATE_POST = 'CREATE_POST';
const GET_USER_POSTS = 'GET_USER_POSTS';
const READ_POST = 'READ_POST';
const DELETE_POST = 'DELETE_POST';

export function createPost(post) {
    return {
        type: CREATE_POST,
        payload: post
    }
}

export function getUserPosts(post) {
    return {
        type: GET_USER_POSTS,
        payload: post
    }
}

export function readPost(post) {
    return {
        type: READ_POST,
        payload: post
    }
}


export function deleteUserPost(post) {
    return {
        type: DELETE_POST
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_POST:
            return {
                ...state,
                post: action.payload
            }
        case GET_USER_POSTS:
            return {
                ...state,
                ...action.payload
            }
        case READ_POST:
            return {
                ...state,
                ...action.payload
            }
        case DELETE_POST:
            return {
                ...state
            }
        default: return state
    }
}