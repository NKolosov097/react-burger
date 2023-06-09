import { IFeed } from '../../../utils/types'
import {
    TWSAuthActions,
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_SUCCESS,
    WS_AUTH_GET_ORDERS,
} from '../../actions/WS-auth-action'

type TWSState = {
    wsConnected: boolean
    orders: Array<IFeed>
}

const initialState: TWSState = {
    wsConnected: false,
    orders: [],
}

export const wsAuthReducer = (
    // eslint-disable-next-line @typescript-eslint/default-param-last
    state = initialState,
    action: TWSAuthActions
): TWSState => {
    switch (action.type) {
        case WS_AUTH_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
            }

        case WS_AUTH_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
            }

        case WS_AUTH_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
            }

        case WS_AUTH_GET_ORDERS:
            return {
                ...state,
                orders: action.payload.orders,
            }
        default:
            return state
    }
}
