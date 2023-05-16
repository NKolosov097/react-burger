import { postOrder } from '../../utils/burger-api'

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

export const getNumberOfOrder =
    (orderIngredients: Array<string>) =>
    (dispatch: any): Promise<void> => {
        dispatch({
            type: GET_ORDER_REQUEST,
        })
        return postOrder(orderIngredients)
            .then((res) => {
                if (res && res.success)
                    dispatch({
                        type: GET_ORDER_SUCCESS,
                        payload: res.order.number,
                    })
            })
            .catch(() => {
                dispatch({
                    type: GET_ORDER_FAILED,
                })
            })
    }
