import { getIngredients } from '../../utils/burger-api'
import { IIngredient } from '../../utils/types'

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' =
    'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' =
    'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' =
    'GET_INGREDIENTS_FAILED'
export const UPDATE_BUN_COUNT: 'UPDATE_BUN_COUNT' = 'UPDATE_BUN_COUNT'
export const INCREMENT_INGREDIENT_COUNT: 'INCREMENT_INGREDIENT_COUNT' =
    'INCREMENT_INGREDIENT_COUNT'
export const DECREMENT_INGREDIENT_COUNT: 'DECREMENT_INGREDIENT_COUNT' =
    'DECREMENT_INGREDIENT_COUNT'
export const RESET_COUNTS_OF_INGREDIENTS: 'RESET_COUNTS_OF_INGREDIENTS' =
    'RESET_COUNTS_OF_INGREDIENTS'

type TIngredientsActionTypes =
    | typeof GET_INGREDIENTS_REQUEST
    | typeof GET_INGREDIENTS_SUCCESS
    | typeof GET_INGREDIENTS_FAILED
    | typeof UPDATE_BUN_COUNT
    | typeof INCREMENT_INGREDIENT_COUNT
    | typeof DECREMENT_INGREDIENT_COUNT
    | typeof RESET_COUNTS_OF_INGREDIENTS

export type TIngredientsAction = {
    type: TIngredientsActionTypes
    payload?: Array<IIngredient>
    idForCount: { _id: string }
}

export const getBurgerIngredients = () => (dispatch: any) => {
    dispatch({
        type: GET_INGREDIENTS_REQUEST,
        idForCount: { _id: '' },
    })
    getIngredients()
        .then((res) => {
            if (res && res.success)
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    payload: res.data,
                    idForCount: { _id: '' },
                })
        })
        .catch((error) =>
            dispatch({
                type: GET_INGREDIENTS_FAILED,
                payload: error.message,
                idForCount: { _id: '' },
            })
        )
}
