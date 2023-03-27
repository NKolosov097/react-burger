import {
    GET_ORDER_FAILED,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    RESET_NUMBER_OF_ORDER,
} from '../actions/order-action'

const initialState = {
    numberOfOrder: null,
    isLoading: false,
    isError: false,
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                numberOfOrder: action.payload,
            }
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                isError: true,
                isLoading: false,
            }
        }
        case RESET_NUMBER_OF_ORDER: {
            return {
                ...state,
                numberOfOrder: null,
            }
        }
        default:
            return state
    }
}
