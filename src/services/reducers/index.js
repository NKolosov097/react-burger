import { combineReducers } from 'redux'
import { UPDATE_INGREDIENTS } from '../actions'
import { ingredientsReducer } from './ingredients-reducer'

const initialState = {
    bun: null,
    ingredientsOfConstructor: [],
    currentViewed: null,
    order: null,
}

// eslint-disable-next-line
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'aaa': {
            return null
        }
        default: {
            return state
        }
    }
}

export const updateAllIngredients = (data) => ({
    type: UPDATE_INGREDIENTS,
    data,
})

export const rootReducer = combineReducers({ ingredientsReducer })
