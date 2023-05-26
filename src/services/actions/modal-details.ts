import { IIngredient } from '../../utils/types'

export const INGREDIENT_DETAILS_OPEN: 'INGREDIENT_DETAILS_OPEN' =
    'INGREDIENT_DETAILS_OPEN'
export const INGREDIENT_DETAILS_CLOSE: 'INGREDIENT_DETAILS_CLOSE' =
    'INGREDIENT_DETAILS_CLOSE'
export const ORDER_DETAILS_CLOSE: 'ORDER_DETAILS_CLOSE' = 'ORDER_DETAILS_CLOSE'

export type TModalDetailsAction =
    | {
          type: typeof INGREDIENT_DETAILS_OPEN
          payload: IIngredient
      }
    | {
          type: typeof INGREDIENT_DETAILS_CLOSE
      }
    | {
          type: typeof ORDER_DETAILS_CLOSE
      }
