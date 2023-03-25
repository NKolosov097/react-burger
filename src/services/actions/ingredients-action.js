import { getIngredients } from '../../utils/burger-api'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'
export const UPDATE_BUN_COUNT = 'UPDATE_BUN_COUNT'
export const INCREMENT_INGREDIENT_COUNT = 'INCREMENT_INGREDIENT_COUNT'
export const DECREMENT_INGREDIENT_COUNT = 'DECREMENT_INGREDIENT_COUNT'

export const getBurgerIngredients = () => (dispatch) => {
    dispatch({
        type: GET_INGREDIENTS_REQUEST,
    })
    getIngredients()
        .then((res) => {
            if (res && res.success)
                dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: res.data })
        })
        .catch((error) =>
            dispatch({
                type: GET_INGREDIENTS_FAILED,
                payload: error.message,
            })
        )
}
