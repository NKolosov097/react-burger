import { configureStore } from '@reduxjs/toolkit'
import { initialState, orderInfoReducer } from './order-info-reducer'
import {
    ORDER_INFO_CLOSE,
    ORDER_INFO_OPEN,
} from '../../actions/order-info-action'

describe('Redux burger constructor reducer', () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-unused-vars
    let store = configureStore({
        reducer: orderInfoReducer,
        preloadedState: initialState,
    })

    beforeEach(() => {
        store = configureStore({
            reducer: orderInfoReducer,
            preloadedState: initialState,
        })
    })

    // initial state
    it('Should return the initial state', () => {
        expect(orderInfoReducer(undefined, { type: '' })).toEqual(initialState)
    })

    // open order info
    it('should be success ORDER_INFO_OPEN action', () => {
        store.dispatch({
            type: ORDER_INFO_OPEN,
        })

        expect(store.getState()).toEqual({
            ...initialState,
            isOrderInfoOpened: true,
        })
    })

    // close order info
    it('should be success ORDER_INFO_CLOSE action', () => {
        store.dispatch({
            type: ORDER_INFO_CLOSE,
        })

        expect(store.getState()).toEqual({
            ...initialState,
            isOrderInfoOpened: true,
        })
    })
})
