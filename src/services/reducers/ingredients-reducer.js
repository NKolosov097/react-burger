import {
    INCREMENT_INGREDIENT_COUNT,
    DECREMENT_INGREDIENT_COUNT,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    UPDATE_BUN_COUNT,
} from '../actions/ingredients-action'

const initialState = {
    ingredients: [],
    isLoading: false,
    isError: false,
}

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                ingredients: action.payload,
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                isError: true,
                isLoading: false,
            }
        }
        case UPDATE_BUN_COUNT: {
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    // eslint-disable-next-line no-return-assign
                    state.ingredients.map((ingredient) =>
                        // eslint-disable-next-line no-nested-ternary
                        ingredient._id === action.payload._id
                            ? // eslint-disable-next-line no-param-reassign, no-undef
                              (ingredient.count = 2)
                            : // eslint-disable-next-line no-param-reassign
                            ingredient.type === 'bun'
                            ? // eslint-disable-next-line no-param-reassign
                              (ingredient.count = 0)
                            : ingredient.count
                    ),
                ],
            }
        }
        case INCREMENT_INGREDIENT_COUNT: {
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    // eslint-disable-next-line no-return-assign
                    state.ingredients.map((ingredient) =>
                        // eslint-disable-next-line no-nested-ternary
                        ingredient._id === action.payload._id
                            ? // eslint-disable-next-line no-param-reassign
                              !ingredient.count
                                ? // eslint-disable-next-line no-param-reassign
                                  (ingredient.count = 1)
                                : // eslint-disable-next-line no-param-reassign
                                  (ingredient.count += 1)
                            : ingredient.count
                    ),
                ],
            }
        }
        case DECREMENT_INGREDIENT_COUNT: {
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    // eslint-disable-next-line no-return-assign
                    state.ingredients.map((ingredient) =>
                        // eslint-disable-next-line no-nested-ternary
                        ingredient._id === action.payload._id
                            ? // eslint-disable-next-line no-param-reassign
                              !ingredient.count
                                ? // eslint-disable-next-line no-param-reassign
                                  (ingredient.count = 1)
                                : // eslint-disable-next-line no-param-reassign
                                  (ingredient.count -= 1)
                            : ingredient.count
                    ),
                ],
            }
        }
        default:
            return state
    }
}
