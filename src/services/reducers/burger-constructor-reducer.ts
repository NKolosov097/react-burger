import { IIngredient } from '../../utils/types'
import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    TBurgerConstructorAction,
    UPDATE_BUN_IN_CONSTRUCTOR,
    UPDATE_INGREDIENTS,
} from '../actions/burger-constructor-action'

type TInitialState = {
    bun: Boolean | null
    ingredients: Array<IIngredient>
}

const initialState: TInitialState = {
    bun: null,
    ingredients: [],
}

export const constructorReducer = (
    // eslint-disable-next-line @typescript-eslint/default-param-last
    state = initialState,
    action: TBurgerConstructorAction
) => {
    switch (action.type) {
        case ADD_INGREDIENT_TO_CONSTRUCTOR: {
            return {
                ...state,
                ingredients:
                    action.payload.type !== 'bun'
                        ? [...state.ingredients, action.payload]
                        : state.ingredients,
            }
        }
        case DELETE_INGREDIENT_FROM_CONSTRUCTOR: {
            return {
                ...state,
                ingredients: [
                    ...state.ingredients.filter(
                        (ingredient) => ingredient.ID !== action.ID
                    ),
                ],
            }
        }
        case UPDATE_BUN_IN_CONSTRUCTOR: {
            return {
                ...state,
                bun: action.isBun ? action.payload : state.bun,
            }
        }
        case UPDATE_INGREDIENTS: {
            return {
                ...state,
                ingredients: action.payload,
            }
        }
        default:
            return state
    }
}
