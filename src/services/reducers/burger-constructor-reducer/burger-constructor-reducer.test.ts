import { v4 as uuidv4 } from 'uuid'
import { configureStore } from '@reduxjs/toolkit'
import { IIngredient } from '../../../utils/types'
import { constructorReducer, initialState } from './burger-constructor-reducer'
import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    UPDATE_BUN_IN_CONSTRUCTOR,
    UPDATE_INGREDIENTS,
} from '../../actions/burger-constructor-action'

const uniqueId = uuidv4()

const ingredientFirst: IIngredient = {
    _id: '60d3b41abdacab0026a733c9',
    ID: uniqueId,
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    __v: 0,
}

const bun: IIngredient = {
    _id: '60d3b41abdacab0026a733c6',
    ID: uniqueId,
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
}

describe('Redux burger constructor reducer', () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    let store = configureStore({
        reducer: constructorReducer,
        preloadedState: initialState,
    })

    beforeEach(() => {
        store = configureStore({
            reducer: constructorReducer,
            preloadedState: initialState,
        })
    })

    it('Should return the initial state', () => {
        // @ts-ignore
        expect(constructorReducer(undefined, { type: '' })).toEqual(
            initialState
        )
    })

    // add ingredient to constructor
    it('should be success ADD_INGREDIENT_TO_CONSTRUCTOR action', () => {
        store.dispatch({
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            payload: { type: 'notBun', ingredient: ingredientFirst },
        })

        expect(store.getState()).toEqual({
            ...initialState,
            ingredients: [ingredientFirst],
        })
    })

    // delete ingredient from constructor
    it('should be success DELETE_INGREDIENT_FROM_CONSTRUCTOR action', () => {
        store.dispatch({
            type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
            payload: { ID: uniqueId },
        })

        expect(store.getState()).toEqual({
            ...initialState,
            ingredients: [],
        })
    })

    // update bun in constructor
    it('should be success UPDATE_BUN_IN_CONSTRUCTOR action', () => {
        store.dispatch({
            type: UPDATE_BUN_IN_CONSTRUCTOR,
            payload: bun,
            isBun: true,
        })

        expect(store.getState()).toEqual({
            ...initialState,
            bun,
        })
    })

    // update ingredients constructor
    it('should be success UPDATE_INGREDIENTS action', () => {
        store.dispatch({
            type: UPDATE_INGREDIENTS,
            payload: ingredientFirst,
        })

        expect(store.getState()).toEqual({
            ...initialState,
            ingredients: ingredientFirst,
        })
    })
})
