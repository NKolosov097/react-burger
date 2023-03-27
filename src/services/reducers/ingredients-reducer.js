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
                    state.ingredients.map((item) => {
                        const ingredient = item
                        if (ingredient._id === action.payload._id) {
                            ingredient.count = 2
                            return ingredient.count
                        }
                        if (ingredient.type === 'bun') {
                            ingredient.count = 0
                            return ingredient.count
                        }
                        return ingredient.count
                    }),
                ],
            }
        }
        // сделать доп объект где ключ будет равен  _id, а значение количество count. Можно сделать с помощью new Map.
        case INCREMENT_INGREDIENT_COUNT: {
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    state.ingredients.map((item) => {
                        const ingredient = item
                        if (ingredient._id === action.payload._id) {
                            if (!ingredient.count) {
                                ingredient.count = 1
                                return ingredient.count
                            }

                            ingredient.count += 1
                            return ingredient.count
                        }
                        return ingredient.count
                    }),
                ],
            }
        }
        case DECREMENT_INGREDIENT_COUNT: {
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    state.ingredients.map((item) => {
                        const ingredient = item
                        if (ingredient._id === action.payload._id) {
                            if (!ingredient.count) {
                                ingredient.count = 1
                                return ingredient.count
                            }

                            ingredient.count -= 1
                            return ingredient.count
                        }
                        return ingredient.count
                    }),
                ],
            }
        }
        default:
            return state
    }
}
