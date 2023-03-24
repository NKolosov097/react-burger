import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    UPDATE_BUN_IN_CONSTRUCTOR,
} from '../actions/burger-constructor-action'

const initialState = {
    bun: null,
    ingredients: [],
}

// eslint-disable-next-line
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
        default:
            return state
    }
}
