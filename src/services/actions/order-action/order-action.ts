
export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST'
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS'
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED'
export const RESET_NUMBER_OF_ORDER: 'RESET_NUMBER_OF_ORDER' =
    'RESET_NUMBER_OF_ORDER'

export type TOrderAction =
    | {
          type: typeof GET_ORDER_REQUEST
      }
    | {
          type: typeof GET_ORDER_SUCCESS
          payload: number
      }
    | {
          type: typeof GET_ORDER_FAILED
      }
    | {
          type: typeof RESET_NUMBER_OF_ORDER
      }


