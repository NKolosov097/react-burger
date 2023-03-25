import { combineReducers } from 'redux'
import { ingredientsReducer } from './ingredients-reducer'
import { modalDetailsReducer } from './modal-details-reducer'
import { constructorReducer } from './burger-constructor-reducer'
import { orderReducer } from './order-reducer'

export const rootReducer = combineReducers({
    ingredientsReducer,
    modalDetailsReducer,
    constructorReducer,
    orderReducer,
})
