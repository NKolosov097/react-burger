import {
    GET_ORDER_FAILED,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    RESET_NUMBER_OF_ORDER,
    TOrderAction,
} from '../actions/order-action'

type TState = {
    numberOfOrder: number | null
    isLoading: Boolean
    isError: Boolean
}

const initialState: TState = {
    numberOfOrder: null,
    isLoading: false,
    isError: false,
}

export const orderReducer = (
    // eslint-disable-next-line @typescript-eslint/default-param-last
    state = initialState,
    action: TOrderAction
): TState => {
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
