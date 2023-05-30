import { legacy_createStore as createStore, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, ThunkAction } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook,
} from 'react-redux'
import type {} from 'redux-thunk/extend-redux'
import { rootReducer } from './services/reducers'
import { TAuthActions } from './services/actions/auth-action/auth-action'
import { TBurgerConstructorAction } from './services/actions/burger-constructor-action'
import { TIngredientsAction } from './services/actions/ingredients-action/ingredients-action'
import { TOrderAction } from './services/actions/order-action/order-action'
import { WS_API, wsActions, wsAuthActions } from './utils/ws_api'
import { socketMiddleware } from './services/middlewares'
import { TWSActions } from './services/actions/WS-action'
import { TWSAuthActions } from './services/actions/WS-auth-action'
import { TModalDetailsAction } from './services/actions/modal-details'
import { TOrderInfoAction } from './services/actions/order-info-action'

const enhancer = compose(
    composeWithDevTools(
        applyMiddleware(
            thunk,
            socketMiddleware(`${WS_API}/all`, wsActions, false),
            socketMiddleware(WS_API, wsAuthActions, true)
        )
    )
)
export const store = createStore(rootReducer, enhancer)

type RootState = ReturnType<typeof rootReducer>
type AppActions =
    | TAuthActions
    | TBurgerConstructorAction
    | TIngredientsAction
    | TOrderAction
    | TOrderInfoAction
    | TModalDetailsAction
    | TWSActions
    | TWSAuthActions

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AppActions
>
export type AppDispatch<TReturnType = void> = (
    action: AppActions | AppThunk<TReturnType>
) => TReturnType

export const useDispatch: () => AppDispatch = dispatchHook
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook
