import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    UPDATE_BUN_IN_CONSTRUCTOR,
    UPDATE_INGREDIENTS,
} from '../actions/burger-constructor-action'

const initialState = {
    bun: null,
    ingredients: [],
}

export const constructorReducer = (state = initialState, action) => {
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
