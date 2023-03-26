import {
    INGREDIENT_DETAILS_CLOSE,
    INGREDIENT_DETAILS_OPEN,
    ORDER_DETAILS_CLOSE,
    ORDER_DETAILS_OPEN,
} from '../actions/modal-details'

const initialState = {
    infoOfIngredient: null,
    isOpenedIngredientsDetails: false,
    isOpenedOrderDetails: false,
}

export const modalDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case INGREDIENT_DETAILS_OPEN: {
            return {
                ...state,
                isOpenedIngredientsDetails: true,
                infoOfIngredient: { ...action.payload },
            }
        }
        case INGREDIENT_DETAILS_CLOSE: {
            return {
                ...state,
                isOpenedIngredientsDetails: false,
            }
        }
        case ORDER_DETAILS_OPEN: {
            return {
                ...state,
                isOpenedOrderDetails: true,
            }
        }
        case ORDER_DETAILS_CLOSE: {
            return {
                ...state,
                isOpenedOrderDetails: false,
            }
        }
        default:
            return state
    }
}
