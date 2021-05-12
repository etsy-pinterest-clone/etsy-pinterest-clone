const initialState = {
    product: {}
}

const CREATE_PRODUCT = 'CREATE_PRODUCT';
const GET_USER_PRODUCTS = 'GET_USER_PRODUCTS';
const READ_PRODUCT = 'READ_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

export function createProduct(product) {
    return {
        type: CREATE_PRODUCT,
        payload: product
    }
}

export function getUserProducts(product) {
    return {
        type: GET_USER_PRODUCTS,
        payload: product
    }
}

export function readProduct(product) {
    return {
        type: READ_PRODUCT,
        payload: product
    }
}


export function deleteUserProduct(product) {
    return {
        type: DELETE_PRODUCT
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_PRODUCT:
            return {
                ...state,
                product: action.payload
            }
        case GET_USER_PRODUCTS:
            return {
                ...state,
                ...action.payload
            }
        case READ_PRODUCT:
            return {
                ...state,
                product: action.payload
            }
        case DELETE_PRODUCT:
            return {
                ...state
            }
        default: return state
    }
}