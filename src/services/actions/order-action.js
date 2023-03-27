import { postOrder } from '../../utils/burger-api'

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST'
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED'
export const RESET_NUMBER_OF_ORDER = 'RESET_NUMBER_OF_ORDER'

export const getNumberOfOrder = (orderIngredients) => (dispatch) => {
    dispatch({
        type: GET_ORDER_REQUEST,
    })
    postOrder(orderIngredients)
        .then((res) => {
            if (res && res.success)
                dispatch({ type: GET_ORDER_SUCCESS, payload: res.order.number })
        })
        .catch((error) => {
            dispatch({
                type: GET_ORDER_FAILED,
                payload: error.message,
            })
        })
}
