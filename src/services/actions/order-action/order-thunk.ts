import { AppDispatch } from '../../../store'
import { postOrder } from '../../../utils/burger-api'
import {
    GET_ORDER_FAILED,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
} from './order-action'

export const getNumberOfOrder =
    (orderIngredients: Array<string>) =>
    (dispatch: AppDispatch): Promise<void> => {
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
