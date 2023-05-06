import { IUser } from '../../utils/types'
import {
    REQUEST_FAILED,
    REQUEST,
    REQUEST_SUCCESS,
    SET_EMAIL_CORRECT_FLAG,
    SET_IS_AUTH,
    SET_USER,
    TAuthActions,
} from '../actions/auth-action'

type TInitialState = {
    isLoading: Boolean
    isChecked: Boolean
    isCorrectEmail: Boolean
    user: IUser | null
    isError: Boolean
}

const initialState: TInitialState = {
    isLoading: false,
    isChecked: false,
    isCorrectEmail: false,
    user: null,
    isError: false,
}

// eslint-disable-next-line
export const authReducer = (state = initialState, action: TAuthActions) => {
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
                user: action.user,
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
