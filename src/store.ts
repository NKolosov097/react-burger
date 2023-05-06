import { legacy_createStore as createStore } from 'redux'
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
import { TAuthActions } from './services/actions/auth-action'
import { TBurgerConstructorAction } from './services/actions/burger-constructor-action'
import { TIngredientsAction } from './services/actions/ingredients-action'
import { TOrderAction } from './services/actions/order-action'

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

type RootState = ReturnType<typeof rootReducer>
type AppActions =
    | TAuthActions
    | TBurgerConstructorAction
    | TIngredientsAction
    | TOrderAction

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
