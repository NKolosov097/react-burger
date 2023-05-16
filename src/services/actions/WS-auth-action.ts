import { IFeedResponse } from '../../utils/types'

export const WS_AUTH_CONNECTION_START: 'WS_AUTH_CONNECTION_START' =
    'WS_AUTH_CONNECTION_START'
export const WS_AUTH_CONNECTION_SUCCESS: 'WS_AUTH_CONNECTION_SUCCESS' =
    'WS_AUTH_CONNECTION_SUCCESS'
export const WS_AUTH_CONNECTION_ERROR: 'WS_AUTH_CONNECTION_ERROR' =
    'WS_AUTH_CONNECTION_ERROR'
export const WS_AUTH_CONNECTION_CLOSED: 'WS_AUTH_CONNECTION_CLOSED' =
    'WS_AUTH_CONNECTION_CLOSED'
export const WS_AUTH_GET_ORDERS: 'WS_AUTH_GET_ORDERS' = 'WS_AUTH_GET_ORDERS'
export const WS_AUTH_SEND_ORDERS: 'WS_AUTH_SEND_ORDERS' = 'WS_AUTH_SEND_ORDERS'

export type TWSAuthActions =
    | {
          type: typeof WS_AUTH_CONNECTION_START
      }
    | {
          type: typeof WS_AUTH_CONNECTION_SUCCESS
      }
    | {
          type: typeof WS_AUTH_CONNECTION_ERROR
      }
    | {
          type: typeof WS_AUTH_CONNECTION_CLOSED
      }
    | {
          type: typeof WS_AUTH_GET_ORDERS
          payload: IFeedResponse
      }
    | {
          type: typeof WS_AUTH_SEND_ORDERS
          payload: IFeedResponse
      }
