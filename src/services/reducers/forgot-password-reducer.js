import {
    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
} from '../actions/forgot-password-action'

const initialState = {
    isOk: false,
    isLoading: false,
    isError: false,
}

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isOk: action.isOk,
            }
        }
        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                isError: true,
                isLoading: false,
            }
        }
        default:
            return state
    }
}
