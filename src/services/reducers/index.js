import { combineReducers } from 'redux'
import { ingredientsReducer } from './ingredients-reducer'
import { constructorReducer } from './burger-constructor-reducer'
import { orderReducer } from './order-reducer'
import { authReducer } from './auth-reducer'

export const rootReducer = combineReducers({
    ingredientsReducer,
    constructorReducer,
    orderReducer,
    authReducer,
})
