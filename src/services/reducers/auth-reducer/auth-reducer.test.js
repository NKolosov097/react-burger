import { configureStore } from '@reduxjs/toolkit'
import { authReducer, initialState } from './auth-reducer'
import { REQUEST } from '../../actions/auth-action/auth-action'
import {
    getUserData,
    loginAction,
    logoutRequest,
    passwordForgot,
    passwordReset,
    patchUserInfo,
    registerAction,
} from '../../actions/auth-action/auth-thunk'

describe('Redux auth reducer', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let store = configureStore({
        reducer: authReducer,
        preloadedState: initialState,
    })

    const testFullObj = {
        email: 'test@gmail.com',
        password: 'password',
        name: 'user',
    }

    const testNameEmailObj = { email: 'test@gmail.com', name: 'user' }

    beforeEach(() => {
        store = configureStore({
            reducer: authReducer,
            preloadedState: initialState,
        })
    })

    afterEach(() => {
        jest.spyOn(global, 'fetch').mockClear()
    })

    // initial state
    it('Should return the initial state', () => {
        expect(authReducer(undefined, { type: '' })).toEqual(initialState)
    })

    it('Should set loading status', () => {
        expect(authReducer(undefined, { type: REQUEST })).toEqual({
            ...initialState,
            isLoading: true,
        })
    })

    // get user data action
    it('Should be success getUserData action', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(() =>
                Promise.resolve({
                    json: () => ({
                        user: testNameEmailObj,
                        success: true,
                    }),
                    ok: true,
                })
            )
        )

        await store.dispatch(getUserData())

        expect(fetch).toBeCalledTimes(1)

        expect(store.getState()).toEqual({
            ...initialState,
            user: testNameEmailObj,
            isLoading: false,
            isChecked: true,
        })
    })

    it('Should be fail getUserData action', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(() => Promise.reject())
        )

        await store.dispatch(getUserData())

        expect(fetch).toBeCalledTimes(1)

        expect(store.getState()).toEqual({
            ...initialState,
            isError: true,
            isLoading: false,
        })
    })

    // register action
    it('Should be success register action', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(() =>
                Promise.resolve({
                    json: () => ({
                        user: { email: 'test@gmail.com', name: 'test' },
                        accessToken: 'accessToken',
                        refreshToken: 'refreshToken',
                        success: true,
                    }),
                    ok: true,
                })
            )
        )

        await store.dispatch(registerAction(testFullObj))

        expect(fetch).toBeCalledTimes(1)

        expect(store.getState()).toEqual({
            ...initialState,
            user: { email: 'test@gmail.com', name: 'test' },
            isChecked: true,
        })
    })

    it('Should fail register action', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(() => Promise.reject())
        )

        await store.dispatch(registerAction(testFullObj))

        expect(fetch).toBeCalledTimes(1)

        expect(store.getState()).toEqual({
            ...initialState,
            isError: true,
            isLoading: false,
        })
    })

    // login action
    it('Should be success login action', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(() =>
                Promise.resolve({
                    json: () => ({
                        user: testNameEmailObj,
                        accessToken: 'accessToken',
                        refreshToken: 'refreshToken',
                        success: true,
                    }),
                    ok: true,
                })
            )
        )

        await store.dispatch(
            loginAction({
                email: 'test@gmail.com',
                password: 'password',
            })
        )

        expect(fetch).toBeCalledTimes(1)

        expect(store.getState()).toEqual({
            ...initialState,
            user: testNameEmailObj,
            isChecked: true,
        })
    })

    it('Should be fail login action', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(() => Promise.reject())
        )

        await store.dispatch(
            loginAction({
                email: 'test@gmail.com',
                password: 'password',
            })
        )

        expect(fetch).toBeCalledTimes(1)

        expect(store.getState()).toEqual({
            ...initialState,
            isError: true,
            isLoading: false,
        })
    })

    // logout action
    it('Should be success logout action', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(() =>
                Promise.resolve({
                    json: () => ({
                        message: 'logout success',
                        success: true,
                    }),
                    ok: true,
                })
            )
        )

        await store.dispatch(logoutRequest())

        expect(fetch).toBeCalledTimes(1)

        expect(store.getState()).toEqual({
            ...initialState,
            user: null,
            isLoading: false,
            isChecked: true,
        })
    })

    it('Should be fail logout action', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(() => Promise.reject())
        )

        await store.dispatch(logoutRequest())

        expect(fetch).toBeCalledTimes(1)

        expect(store.getState()).toEqual({
            ...initialState,
            isError: true,
            isLoading: false,
        })
    })

    // patch user data
    it('Should be success patchUserInfo action', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(() =>
                Promise.resolve({
                    json: () => ({
                        user: testNameEmailObj,
                        success: true,
                    }),
                    ok: true,
                })
            )
        )

        await store.dispatch(patchUserInfo(testFullObj))

        expect(fetch).toBeCalledTimes(1)

        expect(store.getState()).toEqual({
            ...initialState,
            user: testNameEmailObj,
            isLoading: false,
            isChecked: true,
        })
    })

    it('Should be fail patchUserInfo action', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(() => Promise.reject())
        )

        await store.dispatch(patchUserInfo(testFullObj))

        expect(fetch).toBeCalledTimes(1)

        expect(store.getState()).toEqual({
            ...initialState,
            isError: true,
            isLoading: false,
        })
    })

    // password forgot
    it('Should be success passwordForgot action', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(() =>
                Promise.resolve({
                    json: () => ({
                        message: 'success',
                        success: true,
                    }),
                    ok: true,
                })
            )
        )

        await store.dispatch(passwordForgot('test@gmail.com'))

        expect(fetch).toBeCalledTimes(1)

        expect(store.getState()).toEqual({
            ...initialState,
            isCorrectEmail: true,
            isLoading: false,
        })
    })

    it('Should be fail passwordForgot action', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(() => Promise.reject())
        )

        await store.dispatch(passwordForgot('test@gmail.com'))

        expect(fetch).toBeCalledTimes(1)

        expect(store.getState()).toEqual({
            ...initialState,
            isError: true,
            isLoading: false,
        })
    })

    // password reset
    it('Should be success passwordReset action', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(() =>
                Promise.resolve({
                    json: () => ({
                        user: testFullObj,
                        message: 'success',
                        success: true,
                    }),
                    ok: true,
                })
            )
        )

        await store.dispatch(
            passwordReset({
                password: 'password',
                token: 'accessToken',
            })
        )

        expect(fetch).toBeCalledTimes(1)

        expect(store.getState()).toEqual({
            ...initialState,
            user: testFullObj,
            isChecked: true,
            isCorrectEmail: true,
            isLoading: false,
        })
    })

    it('Should be fail passwordReset action', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(() => Promise.reject())
        )

        await store.dispatch(
            passwordReset({
                password: 'password',
                token: 'accessToken',
            })
        )

        expect(fetch).toBeCalledTimes(1)

        expect(store.getState()).toEqual({
            ...initialState,
            isError: true,
            isLoading: false,
        })
    })
})
