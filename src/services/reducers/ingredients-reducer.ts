import { IIngredient } from '../../utils/types'
import {
    INCREMENT_INGREDIENT_COUNT,
    DECREMENT_INGREDIENT_COUNT,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    UPDATE_BUN_COUNT,
    RESET_COUNTS_OF_INGREDIENTS,
    TIngredientsAction,
} from '../actions/ingredients-action/ingredients-action'

type TState = {
    ingredients: Array<IIngredient>
    isLoading: boolean
    isError: boolean
}

const initialState: TState = {
    ingredients: [],
    isLoading: false,
    isError: false,
}

export const ingredientsReducer = (
    // eslint-disable-next-line @typescript-eslint/default-param-last
    state = initialState,
    action: TIngredientsAction
): TState => {
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
                    // @ts-ignore
                    ...state.ingredients,
                    // @ts-ignore
                    state.ingredients.map((item) => {
                        const ingredient = item
                        if (ingredient._id === action.idForCount._id) {
                            ingredient.count = 2
                            return ingredient
                        }
                        if (ingredient.type === 'bun') {
                            ingredient.count = 0
                            return ingredient
                        }
                        return ingredient
                    }),
                ],
            }
        }
        // сделать доп объект где ключ будет равен  _id, а значение количество count. Можно сделать с помощью new Map.
        case INCREMENT_INGREDIENT_COUNT: {
            return {
                ...state,
                ingredients: [
                    // @ts-ignore
                    ...state.ingredients,
                    // @ts-ignore
                    state.ingredients.map((item) => {
                        const ingredient = item
                        if (ingredient._id === action.idForCount._id) {
                            if (!ingredient.count) {
                                ingredient.count = 1
                                return ingredient
                            }

                            ingredient.count += 1
                            return ingredient
                        }
                        return ingredient
                    }),
                ],
            }
        }
        case DECREMENT_INGREDIENT_COUNT: {
            return {
                ...state,
                ingredients: [
                    // @ts-ignore
                    ...state.ingredients,
                    // @ts-ignore
                    state.ingredients.map((item) => {
                        const ingredient = item
                        if (ingredient._id === action.idForCount._id) {
                            if (!ingredient.count) {
                                ingredient.count = 1
                                return ingredient
                            }

                            ingredient.count -= 1
                            return ingredient
                        }
                        return ingredient
                    }),
                ],
            }
        }
        case RESET_COUNTS_OF_INGREDIENTS: {
            return {
                ...state,
                ingredients: [
                    // @ts-ignore
                    ...state.ingredients,
                    // @ts-ignore
                    state.ingredients.map((item) => {
                        const ingredient = item
                        ingredient.count = 0
                        return ingredient
                    }),
                ],
            }
        }
        default:
            return state
    }
}
