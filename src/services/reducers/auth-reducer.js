import {
    REQUEST_FAILED,
    REQUEST,
    REQUEST_SUCCESS,
    SET_EMAIL_CORRECT_FLAG,
    SET_IS_AUTH,
    SET_USER,
} from '../actions/auth-action'

const initialState = {
    isLoading: false,
    isAuth: false,
    isCorrectEmail: false,
    user: null,
    isError: false,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case REQUEST_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                isAuth: true,
                user: action.payload,
            }
        }
        case REQUEST_FAILED: {
            return {
                ...state,
                isError: true,
                isLoading: false,
                payload: action.payload,
            }
        }
        case SET_USER: {
            return {
                ...state,
                user: action.user,
                isAuth: true,
            }
        }
        case SET_EMAIL_CORRECT_FLAG: {
            return {
                ...state,
                isCorrectEmail: action.emailFlag,
            }
        }
        case SET_IS_AUTH: {
            return {
                ...state,
                isAuth: true,
            }
        }
        default:
            return state
    }
}
