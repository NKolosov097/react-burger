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

export type TIngredientsAction =
    | {
          type: typeof GET_INGREDIENTS_REQUEST
      }
    | {
          type: typeof GET_INGREDIENTS_SUCCESS
          payload: Array<IIngredient>
      }
    | {
          type: typeof GET_INGREDIENTS_FAILED
      }
    | {
          type: typeof UPDATE_BUN_COUNT
          idForCount: { _id: string }
      }
    | {
          type: typeof INCREMENT_INGREDIENT_COUNT
          idForCount: { _id: string }
      }
    | {
          type: typeof DECREMENT_INGREDIENT_COUNT
          idForCount: { _id: string }
      }
    | {
          type: typeof RESET_COUNTS_OF_INGREDIENTS
      }

export const getBurgerIngredients = () => (dispatch: any) => {
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
