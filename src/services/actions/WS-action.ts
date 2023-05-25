import { IFeedResponse } from '../../utils/types'

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START'
export const WS_CONNECTION_CLOSE: 'WS_CONNECTION_CLOSE' = 'WS_CONNECTION_CLOSE'
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' =
    'WS_CONNECTION_SUCCESS'
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR'
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' =
    'WS_CONNECTION_CLOSED'
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS'
export const WS_SEND_ORDERS: 'WS_SEND_ORDERS' = 'WS_SEND_ORDERS'

export type TWSActions =
    | {
          type: typeof WS_CONNECTION_START
      }
    | {
          type: typeof WS_CONNECTION_CLOSE
      }
    | {
          type: typeof WS_CONNECTION_SUCCESS
      }
    | {
          type: typeof WS_CONNECTION_ERROR
      }
    | {
          type: typeof WS_CONNECTION_CLOSED
      }
    | {
          type: typeof WS_GET_ORDERS
          payload: IFeedResponse
      }
    | {
          type: typeof WS_SEND_ORDERS
          payload: IFeedResponse
      }
