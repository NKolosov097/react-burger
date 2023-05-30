import { AppDispatch } from '../../../store'
import { getIngredients } from '../../../utils/burger-api'
import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
} from './ingredients-action'

export const getBurgerIngredients = () => (dispatch: AppDispatch) => {
    dispatch({
        type: GET_INGREDIENTS_REQUEST,
    })
    getIngredients()
        .then((res) => {
            if (res && res.success)
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    payload: res.data,
                })
        })
        .catch(() =>
            dispatch({
                type: GET_INGREDIENTS_FAILED,
            })
        )
}
