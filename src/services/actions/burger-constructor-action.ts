import { IIngredient } from '../../utils/types'

export const ADD_INGREDIENT_TO_CONSTRUCTOR: 'ADD_INGREDIENT_TO_CONSTRUCTOR' =
    'ADD_INGREDIENT_TO_CONSTRUCTOR'
export const DELETE_INGREDIENT_FROM_CONSTRUCTOR: 'DELETE_INGREDIENT_FROM_CONSTRUCTOR' =
    'DELETE_INGREDIENT_FROM_CONSTRUCTOR'
export const UPDATE_BUN_IN_CONSTRUCTOR: 'UPDATE_BUN_IN_CONSTRUCTOR' =
    'UPDATE_BUN_IN_CONSTRUCTOR'
export const UPDATE_INGREDIENTS: 'UPDATE_INGREDIENTS' = 'UPDATE_INGREDIENTS'

export type TBurgerConstructorAction =
    | {
          type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR
          payload: {
              type: string
              ingredient: IIngredient
          }
      }
    | {
          type: typeof DELETE_INGREDIENT_FROM_CONSTRUCTOR
          ID: string
      }
    | {
          type: typeof UPDATE_BUN_IN_CONSTRUCTOR
          isBun: boolean
          payload: IIngredient | null
      }
    | {
          type: typeof UPDATE_INGREDIENTS
          payload: Array<IIngredient>
      }
