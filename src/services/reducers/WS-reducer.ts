import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS,
    TWSActions,
} from '../actions/WS-action'
import { IFeed } from '../../utils/types'

type TWSState = {
    wsConnected: boolean
    orders: Array<IFeed>
    total: number
    totalToday: number
}

const initialState: TWSState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
}

export const wsReducer = (
    // eslint-disable-next-line @typescript-eslint/default-param-last
    state = initialState,
    action: TWSActions
): TWSState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
            }

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
            }

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
            }

        case WS_GET_ORDERS:
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            }
        default:
            return state
    }
}
