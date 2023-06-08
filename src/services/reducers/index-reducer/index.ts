import { combineReducers } from 'redux'
import { ingredientsReducer } from '../ingredients-reducer/ingredients-reducer'
import { constructorReducer } from '../burger-constructor-reducer/burger-constructor-reducer'
import { orderReducer } from '../order-reducer/order-reducer'
import { authReducer } from '../auth-reducer/auth-reducer'
import { wsReducer } from '../WS-reducer/WS-reducer'
import { wsAuthReducer } from '../WS-auth-reducer/WS-auth-reducer'
import { orderInfoReducer } from '../order-info-reducer/order-info-reducer'

export const rootReducer = combineReducers({
    ingredientsReducer,
    constructorReducer,
    orderReducer,
    authReducer,
    wsReducer,
    wsAuthReducer,
    orderInfoReducer,
})
