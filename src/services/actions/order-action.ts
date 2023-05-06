import { postOrder } from '../../utils/burger-api'

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST'
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS'
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED'
export const RESET_NUMBER_OF_ORDER: 'RESET_NUMBER_OF_ORDER' =
    'RESET_NUMBER_OF_ORDER'

type TOrderActionTypes =
    | typeof GET_ORDER_REQUEST
    | typeof GET_ORDER_SUCCESS
    | typeof GET_ORDER_FAILED
    | typeof RESET_NUMBER_OF_ORDER

export type TOrderAction = {
    type: TOrderActionTypes
    payload?: number
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
            .catch((error) => {
                dispatch({
                    type: GET_ORDER_FAILED,
                    payload: error.message,
                })
            })
    }
