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

type TState = {
    isLoading: boolean
    isChecked: boolean
    isCorrectEmail: Boolean
    user: IUser | null
    isError: boolean
}

const initialState: TState = {
    isLoading: false,
    isChecked: false,
    isCorrectEmail: false,
    user: null,
    isError: false,
}

export const authReducer = (
    // eslint-disable-next-line @typescript-eslint/default-param-last
    state = initialState,
    action: TAuthActions
): TState => {
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
