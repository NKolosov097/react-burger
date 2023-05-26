import { combineReducers } from 'redux'
import { ingredientsReducer } from './ingredients-reducer'
import { constructorReducer } from './burger-constructor-reducer'
import { orderReducer } from './order-reducer'
import { authReducer } from './auth-reducer'
import { wsReducer } from './WS-reducer'
import { wsAuthReducer } from './WS-auth-reducer'
import { orderInfoReducer } from './order-info-reducer'

export const rootReducer = combineReducers({
    ingredientsReducer,
    constructorReducer,
    orderReducer,
    authReducer,
    wsReducer,
    wsAuthReducer,
    orderInfoReducer,
})
