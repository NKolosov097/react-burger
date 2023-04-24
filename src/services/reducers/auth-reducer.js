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
    isChecked: false,
    isCorrectEmail: false,
    user: null,
    isError: false,
}

// eslint-disable-next-line @typescript-eslint/default-param-last
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
                isChecked: true,
                user: action.payload,
            }
        }
        case REQUEST_FAILED: {
            return {
                ...state,
                isError: true,
                isLoading: false,
            }
        }
        case SET_USER: {
            return {
                ...state,
                user: action.user,
                isChecked: true,
            }
        }
        case SET_EMAIL_CORRECT_FLAG: {
            return {
                ...state,
                isCorrectEmail: true,
            }
        }
        case SET_IS_AUTH: {
            return {
                ...state,
                isChecked: true,
            }
        }
        default:
            return state
    }
}
