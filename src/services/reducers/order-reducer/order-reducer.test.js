import { configureStore } from '@reduxjs/toolkit'
import { initialState, orderReducer } from './order-reducer'
import { getNumberOfOrder } from '../../actions/order-action/order-thunk'
import { RESET_NUMBER_OF_ORDER } from '../../actions/order-action/order-action'

const ingredients = [
    {
        _id: '60d3b41abdacab0026a733c6',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0,
    },
    {
        _id: '60d3b41abdacab0026a733ce',
        name: 'Соус традиционный галактический',
        type: 'sauce',
        proteins: 42,
        fat: 24,
        carbohydrates: 42,
        calories: 99,
        price: 15,
        image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
        image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
        __v: 0,
    },
    {
        _id: '60d3b41abdacab0026a733ce',
        name: 'Соус традиционный галактический',
        type: 'sauce',
        proteins: 42,
        fat: 24,
        carbohydrates: 42,
        calories: 99,
        price: 15,
        image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
        image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
        __v: 0,
    },
    {
        _id: '60d3b41abdacab0026a733c6',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0,
    },
]

describe('Redux burger constructor reducer', () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-unused-vars
    let store = configureStore({
        reducer: orderReducer,
        preloadedState: initialState,
    })

    beforeEach(() => {
        store = configureStore({
            reducer: orderReducer,
            preloadedState: initialState,
        })
    })

    // initial state
    it('Should return the initial state', () => {
        expect(orderReducer(undefined, { type: '' })).toEqual(initialState)
    })

    // get number of order
    it('should be success getNumberOfOrder action', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(() =>
                Promise.resolve({
                    json: () => ({ order: { number: 12345 }, success: true }),
                    ok: true,
                })
            )
        )
        await store.dispatch(getNumberOfOrder(ingredients))

        expect(store.getState()).toEqual({
            ...initialState,
            numberOfOrder: 12345,
            isLoading: false,
        })
    })

    test('Should be fail to get order number', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(() => Promise.reject())
        )

        await store.dispatch(getNumberOfOrder(ingredients))

        expect(fetch).toBeCalledTimes(1)

        expect(store.getState()).toEqual({
            numberOfOrder: null,
            isError: true,
            isLoading: false,
        })
    })

    // reset number of order
    it('should be success RESET_NUMBER_OF_ORDER action', () => {
        store.dispatch({
            type: RESET_NUMBER_OF_ORDER,
        })

        expect(store.getState()).toEqual({
            ...initialState,
            numberOfOrder: null,
        })
    })
})
